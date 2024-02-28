import { cloneDeep } from 'lodash-es';
import { isInPolygon, isInCircle, inClipPath, isInX6ImageNode, getBoundingBox, get2PointsDistance, getOCoords, isSameDirection, getPolygonCenterPoint } from './utils'

/**
 * 绘图类
 * @param {object} option
 * @param {function} imgFirstOnload 所有图片加载完成（首次）
 */
export function CanvasDraw(option, imgFirstOnload) {
  if (!option.ele) {
    console.error('canvas对象不存在')
    return
  }
  const { ele } = option

  /** 外部可访问属性 */
  this.canvasNode = ele.node // wx的canvas节点
  this.canvasNode.width = ele?.width || 300 // 设置canvas节点宽度
  this.canvasNode.height = ele?.height || 400 // 设置canvas节点高度
  // #ifdef H5 || APP-PLUS
  this.ctx = ele.ctx
  // #endif
  // #ifdef MP-WEIXIN
  this.ctx = this.canvasNode.getContext('2d')
  // #endif
  this.zoomCenter = { x: ele.width / 2, y: ele.height / 2 } // 缩放中心点
  this.children = [] // 子对象
  this.canDragCanvas = true // 能拖动画布
  this.isClip = option.isClip ?? true

  /** 内部使用变量 */
  let startDistance = 0 // 拖动开始时距离（二指缩放）
  let preScale = 1 // 上次缩放
  let touchMoveTimer = null // 触摸移动计时器，用于节流
  let touchEndTimer = null // 触摸结束计时器，用于节流
  let touchStartTimeStamp = 0 // 触摸开始计时，时间戳，单位ms
  let fingers = 1 // 手指触摸个数
  const events = { 'selection:updated': [], 'selection:cleared': [], 'selection:longTap': [], touchstart: [], touchmove: [], touchend: [], tap: [], 'deleteControl:tap': [] } // 事件集合
  let curControlKey = null // 当前选中控件key
  let preTouches = [] // 上次触摸点
  let imgCache = {} // 图片缓存，防止拖动的时候反复加载图片造成闪烁
  let imgCount = 0 // 当前加载成功的第几个图片点-小程序
  let clipPath = [] // 背景图的[x, y, width, heigth]

  /** 初始化 */
  const init = () => {
    const optionCopy = cloneDeep(option)
    this.scale = optionCopy.scale ?? 1 // 当前缩放倍数
    this.scaleStep = optionCopy.scaleStep ?? 0.1 // 缩放步长（按钮)
    this.touchScaleStep = optionCopy.touchScaleStep ?? 0.005 // 缩放步长（手势）
    this.maxScale = optionCopy.maxScale ?? 2 // 缩放最大倍数（缩放比率倍数）
    this.minScale = optionCopy.minScale ?? 0.5 // 缩放最小倍数（缩放比率倍数）
    this.translate = optionCopy.translate ?? { x: 0, y: 0 } // 默认画布偏移
    this.isThrottleDraw = optionCopy.isThrottleDraw ?? true // 是否开启节流绘图（建议开启，否则安卓调用频繁导致卡顿）
    this.throttleInterval = optionCopy.throttleInterval ?? 20 // 节流绘图间隔，单位ms
    this.longTapInterval = optionCopy.longTapInterval ?? 500 // 是否为长按临界点时间, 单位ms
    this.pixelRatio = optionCopy.pixelRatio ?? 1 // 像素比（高像素比解决高清屏幕模糊问题）
    // 全局控制器设置，目前只有delete，属性为radius: 半径, fill: 默认绘制颜色，customDraw: 自定义绘制函数，若存在则覆盖默认绘制
    // 由于optionCopy不能复制customDraw函数，所以这里只能用option
    this.controls = option.controls ?? {
      delete: { radius: 10, fill: '#f00', customDraw: null },
    }
    // this.controls.delete.customDraw = option.controls.delete.customDraw
    // 全局控制器可见性，目前只做了delete；元素本身也可以单独设置
    this.controlsVis = optionCopy.controlsVis ?? {
      delete: false,
    }

    this.isEnablePanScale = optionCopy.isEnablePanScale ?? true // 是否允许缩放和拖动

    startDistance = 0 // 拖动开始时距离（二指缩放）
    preScale = this.scale // 上次缩放
    touchMoveTimer = null
    touchEndTimer = null
    fingers = 1 // 手指触摸个数
  }

  init()

  /** 绘图（会进行缩放和位移）
   * 获取的json不会改变,每次执行fromJSON的时候才执行drawCallBack,以后每一次更新不执行,以防修改节点失效
   * addPoint: 回调，绘制什么就调相应的方法，
   * 为了保证先执行drawChildren()，再执行addPoint()回调，最后统一执行this.ctx.draw()
   * 否则会产生多余的节点
   */
  this.draw = (isInit, addPointFn) => {
    clear()
    drawChildren()
    if(isInit) option?.drawCallBack?.()
    // #ifdef H5 || APP-PLUS
    if (addPointFn) addPointFn()
    this.ctx.draw()
    // #endif
  }

  this.setTranslate = (translate) => {
    option.translate = translate ?? { x: 0, y: 0 }
    this.translate = { ...option.translate } // 深拷贝，否则会有修改引用问题，影响重置功能
  }

  this.setOptionTranslate = (translate) => {
    option.translate = translate ?? { x: 0, y: 0 }
  }

  this.setOptions = (opt) => {
    option = {...option, ...opt}
    init()
  }

  /** 私有清除画布（重设canvas尺寸会清空地图并重置canvas内置的scale/translate等） */
  const clear = () => {
    this.canvasNode.width = ele.width * this.pixelRatio
    this.canvasNode.height = ele.height * this.pixelRatio
    this.ctx.translate(this.translate.x * this.pixelRatio, this.translate.y * this.pixelRatio)
    this.ctx.scale(this.scale * this.pixelRatio, this.scale * this.pixelRatio)
    // console.log('当前位移', this.translate.x, this.translate.y, '当前缩放倍率', this.scale)
  }

  /** 清除画布，并清空子对象 */
  this.clear = () => {
    clear()
    this.children = []
    // #ifdef H5 || APP-PLUS
    this.ctx.draw()
    // #endif
  }

  /**
   * 绘制多边形
   * @param {boolean} isAddChild 是否添加到canvas子对象
   * @param {object} opt 参数{ points:array, style:{strokeWidth:number, stroke:string, fill:string, lineDash:array} }
   */
  this.drawShape = (opt, isAddChild = true) => {
    if (opt.points.length < 3) return
    const tempObj = { type: 'Shape', angle: opt.angle, points: opt.points }
    this.rotateDraw(tempObj, () => {
      this.ctx.beginPath()
      this.ctx.lineWidth = opt.style.strokeWidth ?? 1
      this.ctx.fillStyle = opt.style.fill
      this.ctx.strokeStyle = opt.style.stroke ?? '#000'

      // 设置虚线
      if (opt.style.stroke && opt.style.lineDash && opt.style.lineDash.length > 0) {
        this.ctx.setLineDash(opt.style.lineDash)
      }

      for (let i = 0; i < opt.points.length; i++) {
        const p = opt.points[i]
        if (i === 0) {
          this.ctx.moveTo(p.x, p.y)
        } else {
          this.ctx.lineTo(p.x, p.y)
        }
      }
      this.ctx.closePath()
      if (opt.style.stroke) {
        this.ctx.stroke()
        this.ctx.setLineDash([])
      }
      if (opt.style.fill) {
        this.ctx.fill()
      }
    })

    if (isAddChild) {
      return this.addChild('Shape', opt)
    }
  }

  /** 绘制多条线段 */
  this.drawLines = (opt, isAddChild = true) => {
    if (opt.points.length < 2) return
    const tempObj = { type: 'Lines', angle: opt.angle, points: opt.points }
    this.rotateDraw(tempObj, () => {
      this.ctx.beginPath()
      this.ctx.lineWidth = opt.style.strokeWidth ?? 1
      this.ctx.strokeStyle = opt.style.stroke ?? '#000'

      // 设置虚线
      if (opt.style.stroke && opt.style.lineDash && opt.style.lineDash.length > 0) {
        this.ctx.setLineDash(opt.style.lineDash)
      }

      for (let i = 0; i < opt.points.length; i++) {
        const p = opt.points[i]
        if (i === 0) {
          this.ctx.moveTo(p.x, p.y)
        } else {
          this.ctx.lineTo(p.x, p.y)
        }
      }
      if (opt.style.stroke) {
        this.ctx.stroke()
        this.ctx.setLineDash([])
      }
    })
    if (isAddChild) {
      return this.addChild('Lines', opt)
    }
  }

  /** 绘制文字 */
  this.drawText = (opt, isAddChild = true) => {
    const p = opt.points[0]
    if (!p) return
    const tempObj = { type: 'Text', angle: opt.angle, points: opt.points }
    this.rotateDraw(tempObj, () => {
      this.ctx.fillStyle = opt.style.fill
      this.ctx.textAlign = opt.style.textAlign ?? 'center'
      this.ctx.textBaseline = opt.style.textBaseline ?? 'middle'
      this.ctx.fillText(opt.text, p.x, p.y)
    })
    if (isAddChild) {
      return this.addChild('Text', opt)
    }
  }

  /** 绘制点图片 */
  const drawPointImg = (img, p, opt) => {
    this.ctx.drawImage(img, p.x, p.y, opt.style?.width, opt.style?.height)
  }

  /** 绘制点填充 */
  const drawPointFill = (p, opt) => {
    this.ctx.beginPath()
    this.ctx.lineWidth = opt.style.strokeWidth ?? 1
    this.ctx.fillStyle = opt.style.fill
    this.ctx.strokeStyle = opt.style.stroke ?? '#000'

    // 设置虚线
    if (opt.style.stroke && opt.style.lineDash && opt.style.lineDash.length > 0) {
      this.ctx.setLineDash(opt.style.lineDash)
    }

    this.ctx.arc(p.x, p.y, opt.style.radius, 0, 2 * Math.PI)

    this.ctx.closePath()
    if (opt.style.stroke) {
      this.ctx.stroke()
      this.ctx.setLineDash([])
    }
    if (opt.style.fill) {
      this.ctx.fill()
    }
  }

  /** 绘制点 */
  this.drawPoint = (opt, isAddChild = true) => {
    const p = opt.points[0]
    if (!p) return
    const tempObj = { type: 'Point', angle: opt.angle, points: opt.points }

    // 图片点
    if (opt.style.img) {
      let img = imgCache[opt.style.img]
      if (!img) {
        // #ifdef H5 || APP-PLUS
        imgCache[opt.style.img] = opt
        this.rotateDraw(tempObj, drawPointImg.bind(this, opt.style.img, p, opt))
        // #endif

        // #ifdef MP-WEIXIN
        img = this.canvasNode.createImage()
        img.src = opt.style.img
        img.onload = () => {
          imgCache[opt.style.img] = img
          this.rotateDraw(tempObj, drawPointImg.bind(this, img, p, opt))
          imgCount++
          if (this.imageNodeTotalCount == imgCount) {
            imgCount = 0
            imgFirstOnload()
          }
        }
        // #endif
      } else {
        // #ifdef H5 || APP-PLUS
        this.rotateDraw(tempObj, drawPointImg.bind(this, opt.style.img, p, opt))
        // #endif

        // #ifdef MP-WEIXIN
        this.rotateDraw(tempObj, drawPointImg.bind(this, img, p, opt))
        // #endif
      }
    }
    // 绘画点
    else {
      this.rotateDraw(tempObj, drawPointFill.bind(this, p, opt))
    }

    if (isAddChild) {
      return this.addChild('Point', opt)
    }
  }
  /** 绘制背景图 */
  this.drawBackground = (opt, isAddChild = true) => {
    return new Promise((resolve, _reject) => {
      const p = opt.points[0]
      if (!p) return
      const tempObj = { type: 'Point', angle: opt.angle, points: opt.points }
      // 设置剪裁区域
      clipPath = [p.x, p.y, opt.style?.width, opt.style?.height]
  
      // 图片点
      if (opt.style.img) {
        let img = imgCache[opt.style.img]
        if (!img) {
          // #ifdef H5 || APP-PLUS
          imgCache[opt.style.img] = opt
          this.rotateDraw(tempObj, drawPointImg.bind(this, opt.style.img, p, opt))
          resolve(opt.style.img)
          // #endif

          // #ifdef MP-WEIXIN
          img = this.canvasNode.createImage()
          img.src = opt.style.img
          img.onload = () => {
            imgCache[opt.style.img] = img
            this.rotateDraw(tempObj, drawPointImg.bind(this, img, p, opt))
            resolve(opt.style.img)
          }
          // #endif
        } else {
          // #ifdef H5 || APP-PLUS
          this.rotateDraw(tempObj, drawPointImg.bind(this, opt.style.img, p, opt))
          // #endif

          // #ifdef MP-WEIXIN
          this.rotateDraw(tempObj, drawPointImg.bind(this, img, p, opt))
          // #endif

          resolve(opt.style.img)
        }
      }
  
      if (isAddChild) {
        return this.addChild('Point', opt)
      }
    })
  }

  const drawRoundedRect = (ctx, x, y, width, height, radius = 0, type = 'stroke') => {
    ctx.moveTo(x, y + radius);
    ctx.beginPath();
    ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI);
    ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);
    ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI);
    ctx.closePath();
    const method = type || 'stroke';  // 默认描边，传入fill即可填充矩形
    ctx.strokeStyle = 'rgba(255, 255, 0, 0)' // 边框透明
    ctx[method]();
  }

  /** 旋转绘制对象  */
  this.rotateDraw = (object, callBack) => {
    if (this.isClip) drawRoundedRect(this.ctx, ...clipPath)
    const angle = object.angle ?? 0
    const centerPoint = this.getObjectCenterPoint(object)
    this.ctx.save()
    if (this.isClip) this.ctx.clip()
    this.ctx.translate(centerPoint.x, centerPoint.y)
    this.ctx.rotate((angle * Math.PI) / -180)
    this.ctx.translate(-centerPoint.x, -centerPoint.y)
    callBack()
    this.ctx.restore()
  }

  /** 获取子对象中心点 */
  this.getObjectCenterPoint = (object) => {
    switch (object.type) {
      case 'Point':
        return object.points[0]
      default:
        return getPolygonCenterPoint(object.points)
    }
  }

  /** 获取点击事件的画布坐标 */
  this.getPoint = (e) => {
    const t = getTouchPont(e, 0)
    return {
      x: (t.x - this.translate.x) / this.scale,
      y: (t.y - this.translate.y) / this.scale,
    }
  }

  /** 获取点击事件的屏幕坐标 */
  this.getScreenPoint = (e) => {
    const t = getTouchPont(e, 0)
    return {
      x: t.x,
      y: t.y,
    }
  }

  /** 获取当前选中的元素 */
  this.getSelect = () => {
    return this.children.find((item) => item.isSelect)
  }

  /** 清除选中 */
  this.clearSelect = () => {
    this.children.forEach((item) => {
      item.isSelect = false
    })
  }

  /** 添加子对象 */
  this.addChild = (type, opt) => {
    const aCoords = getBoundingBox(opt.points)
    const cv = opt.controlsVis ?? this.controlsVis
    const obj = {
      id: opt.id ?? `c_${new Date().getTime()}`,
      zIndex: opt.zIndex ?? 0,
      angle: opt.angle ?? 0,
      isSelect: opt.isSelect ?? false,
      points: JSON.parse(JSON.stringify(opt.points)),
      style: opt.style ?? {},
      text: opt.text,
      type,
      controlsVis: cv,
      aCoords, // 多边形的包围盒
      oCoords: getOCoords(aCoords, cv, this.controls), // 控制器
      data: opt?.data ?? {}, // 业务数据
      node: opt?.node ?? {},// 业务数据
    }
    // 如果已存在，则更新，否则添加
    const oldOjb = this.getChild(obj.id)
    if (oldOjb) {
      oldOjb.zIndex = obj.zIndex
      oldOjb.angle = obj.angle
      oldOjb.isSelect = obj.isSelect
      oldOjb.points = obj.points
      oldOjb.style = obj.style
      oldOjb.text = obj.text
      oldOjb.type = obj.type
      oldOjb.controlsVis = obj.controlsVis
      oldOjb.aCoords = obj.aCoords
      oldOjb.oCoords = obj.oCoords
      oldOjb.data = obj.data
      oldOjb.node = obj.node
    } else {
      this.children.push(obj)
    }
    addControls(obj)
    return obj
  }

  /** 移除子对象 */
  this.removeChild = (id) => {
    const index = this.children.findIndex((item) => item.id === id)
    if (index !== -1) {
      this.children.splice(index, 1)
    }
  }

  /** 获取子对象 */
  this.getChild = (id) => {
    return this.children.find((item) => item.id === id)
  }

  /** 重置画布（恢复到第一次绘制的状态） */
  this.reset = () => {
    init()
    this.draw()
  }

  /** 中心放大 */
  this.zoomIn = () => {
    this.zoomTo(this.scale + this.scaleStep)
  }

  /** 中心缩小 */
  this.zoomOut = () => {
    this.zoomTo(this.scale - this.scaleStep)
  }

  /**
   * 缩放到指定倍数
   * @param {number} scale 缩放大小
   * @param {object} zoomCenter 缩放中心点（可选
   */
  this.zoomTo = (scale, zoomCenter0) => {
    this.scale = scale
    this.scale = this.scale > this.maxScale ? this.maxScale : this.scale
    this.scale = this.scale < this.minScale ? this.minScale : this.scale

    const zoomCenter = zoomCenter0 || this.zoomCenter
    this.translate.x = zoomCenter.x - ((zoomCenter.x - this.translate.x) * this.scale) / preScale
    this.translate.y = zoomCenter.y - ((zoomCenter.y - this.translate.y) * this.scale) / preScale
    this.draw()
    preScale = this.scale
  }

  /** tap事件 */
  this.tap = (e) => {
    // console.log('进入了tap事件',e);
    if (fingers !== 1) return
    const ep = e.changedTouches[0]
    const sp = preTouches[0]
    if (!isSaveTouchPoint(sp, ep)) return
    if (curControlKey) {
      triggerControl(curControlKey)
      return
    }
    const p = this.getPoint(e)
    triggerEvent('tap', { point: p, event: e })
    for (let i = this.children.length - 1; i >= 0; i--) {
      const item = this.children[i]
      // 这里只做了点击时否在多边形或圆形、x6图片的判断，后期可以扩展
      if (inClipPath(p, clipPath) && (isInPolygon(p, item.points, item.angle) || isInCircle(p, item.points[0], item.style.radius) || isInX6ImageNode(p, item.points, item.angle, item.style, item.data))) {
        if (e.timeStamp - touchStartTimeStamp >= this.longTapInterval) {
          triggerEvent('selection:longTap', item)
          return
        }
        item.isSelect = true
        triggerEvent('selection:updated', item)
        return item  
      }
    }
  }

  /** 触摸开始 */
  this.touchstart = (e) => {
    // console.log('touchstart', e)

    // #ifdef H5 || APP-PLUS
    fingers = Object.keys(e.touches).length // app为对象 小程序为数组
    // #endif

    // #ifdef MP-WEIXIN
    fingers = e.touches.length
    // #endif

    if (fingers > 2) return
    preTouches = Object.values(e.touches).map((item) => ({...item}))

    // 单指
    if (fingers === 1) {
      // 记录开始触摸的时间戳
      touchStartTimeStamp = e.timeStamp
      // 如果是触摸了控制器
      curControlKey = getControlByPoint(this.getPoint(e))
      if (curControlKey) {
        return
      }
      triggerEvent('selection:cleared', this.getSelect())
      this.clearSelect()
      triggerEvent('touchstart', { point: this.getPoint(e), event: e })
    } else if (fingers === 2) {
      startDistance = get2PointsDistance(e)
    }
  }

  /** 触摸移动 */
  this.touchmove = (e) => {
    // console.log('touchmove', e)
    if (fingers > 2 || isSaveTouchPoint(preTouches[0], e.changedTouches[0])) return
    if (this.isThrottleDraw) {
      if (touchMoveTimer) return
      // this.touchMoveEvent = e
      touchMoveTimer = setTimeout(this.touchmoveSelf.bind(this, e), this.throttleInterval)
    } else {
      // this.touchMoveEvent = e
      this.touchmoveSelf(e)
    }
  }

  /** 触摸移动实际执行 */
  this.touchmoveSelf = (e) => {
    // const e = this.touchMoveEvent

    let touchesNum = 1
    // #ifdef H5 || APP-PLUS
    touchesNum = Object.keys(e.touches).length
    // #endif

    // #ifdef MP-WEIXIN
    touchesNum = e.touches.length
    // #endif

    // 单指移动
    if (fingers === 1) {
      if (!curControlKey) {
        if (this.isEnablePanScale) {
          triggerEvent('touchmove', { point: this.getPoint(e), event: e })
          drag(e)
        }
      }
    } else if (fingers === 2 && touchesNum === 2 && preTouches.length === 2) {
      // 如果移动方向一致则拖动画布否则缩放
      if (isSameDirection(preTouches[0], getTouchPont(e, 0), preTouches[1], getTouchPont(e, 1))) {
        if (this.isEnablePanScale) {
          drag(e)
        }
      } else {
        if (!this.isEnablePanScale) {
          return
        }
        // 双指缩放
        const endDistance = get2PointsDistance(e)
        const distanceDiff = endDistance - startDistance
        startDistance = endDistance
        const zoomCenter = {
          x: (getTouchPont(e, 0).x + getTouchPont(e, 1).x) / 2,
          y: (getTouchPont(e, 0).y + getTouchPont(e, 1).y) / 2,
        }
        this.zoomTo(preScale + this.touchScaleStep * distanceDiff, zoomCenter)
      }
    }
    preTouches = Object.values(e.touches).map((item) => ({...item}))
    touchMoveTimer = null
  }

  /** 触摸结束 */
  this.touchend = (e) => {
    // console.log('touchend', e)
    if (this.isThrottleDraw) {
      touchEndTimer = setTimeout(this.touchendSelf.bind(this, e), this.throttleInterval)
    } else {
      this.touchendSelf(e)
    }
  }

  /** 触摸结束实际执行 */
  this.touchendSelf = (e) => {
    // console.log('touchend', e)
    this.tap(e)
    curControlKey = null
    triggerEvent('touchend', { point: this.getPoint(e), event: e })
    touchEndTimer = null
  }

  /** canvas传递进来的长按事件 */
  this.longtap =(e)=>{
    // console.log('间隔时长:', e.timeStamp - touchStartTimeStamp)
    if (fingers !== 1) return
    const ep = e.changedTouches[0]
    const sp = preTouches[0]
    if (!isSaveTouchPoint(sp, ep)) return
    if (curControlKey) {
      triggerControl(curControlKey)
      return
    }
    const p = this.getPoint(e)
    // triggerEvent('tap', { point: p, event: e })
    for (let i = this.children.length - 1; i >= 0; i--) {
      const item = this.children[i]
      // 这里只做了点击时否在多边形或圆形的判断，后期可以扩展
      if (inClipPath(p, clipPath) && (isInPolygon(p, item.points, item.angle) || isInCircle(p, item.points[0], item.style.radius))) {
        item.isSelect = true
        triggerEvent('selection:longTap', item)
        return item
      }
    }
  }

  /** 绑定事件 */
  this.on = (type, callBack) => {
    if (!events[type]) return
    events[type].push(callBack)
  }

  /** 解绑事件 */
  this.off = (type, callBack) => {
    if (!events[type]) return
    const index = events[type].indexOf(callBack)
    if (index !== -1) {
      events[type].splice(index, 1)
    }
  }

  /** 销毁 */
  this.destroy = () => {
    resetEvents()
    clearTimeout(touchMoveTimer)
    clearTimeout(touchEndTimer)
    touchMoveTimer = null
    touchEndTimer = null
    imgCache = null
    this.canvasNode = null
    this.children = null
    this.ctx = null
    // this.touchMoveEvent = null
    option.drawCallBack = null
  }

  /** 绘制所有子对象 */
  const drawChildren = () => {
    if (this.children.length === 0) return
    this.children.sort((a, b) => a.zIndex - b.zIndex)
    this.children.forEach((item) => {
      const opt = {
        id: item.id,
        zIndex: item.zIndex,
        angle: item.angle,
        isSelect: item.isSelect,
        points: item.points,
        style: item.style,
        text: item.text,
        type: item.type,
        controlsVis: item.controlsVis,
        data: item.data,
        node: item.node,
      }
      const visible = item?.node?.visible ?? true
      if (visible) this[`draw${item.type}`](opt)
    })
  }

  /**
   * 拖动画布
   * @param {event} e 鼠标事件
   */
  const drag = (e) => {
    if (!this.canDragCanvas) return
    this.translate.x += getTouchPont(e, 0).x - preTouches[0].x
    this.translate.y += getTouchPont(e, 0).y - preTouches[0].y
    this.draw()
  }

  /**
   * 获取点击的控制器
   * @param {Point} p 点坐标
   * @param {object} obj 画布元素
   * @return {string} 控制器名称
   */
  const getControlByPoint = (p) => {
    const obj = this.getSelect()
    if (!obj) return
    const controls = obj.oCoords
    const keys = Object.keys(controls)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (controls[key].vis) {
        const control = controls[key]
        if (isInCircle(p, control.point, control.radius)) {
          return key
        }
      }
    }
  }

  /** 添加控制器 */
  const addControls = (obj) => {
    Object.keys(obj.oCoords).forEach((key) => {
      const item = obj.oCoords[key]
      if (!item.vis) return
      if (item.customDraw) {
        item.customDraw({ points: [obj.oCoords[key].point] })
        return
      }
      this.drawPoint(
        {
          id: key,
          points: [obj.oCoords[key].point],
          style: {
            fill: this.controls[key].fill,
            radius: this.controls[key].radius,
          },
        },
        false
      )
    })
  }

  /** 触发控制器 */
  const triggerControl = (key) => {
    switch (key) {
      case 'delete':
        triggerEvent('deleteControl:tap', this.getSelect())
        break

      default:
        break
    }
  }

  /** 触发某类事件 */
  const triggerEvent = (type, param) => {
    events[type].forEach((callBack) => {
      callBack(param)
    })
  }

  /** 重置事件 */
  const resetEvents = () => {
    Object.keys(events).forEach((key) => {
      events[key] = []
    })
  }

  /** 是否相同点击坐标 */
  const isSaveTouchPoint = (sp, ep) => {
    return Math.round(ep.x) === Math.round(sp.x) && Math.round(ep.y) === Math.round(sp.y)
  }

  /** 获取触摸点 */
  const getTouchPont = (e, index) => {
    if (e.touches && e.touches[index]) return e.touches[index]
    return e.changedTouches && e.changedTouches[index]
  }
}

export default CanvasDraw


