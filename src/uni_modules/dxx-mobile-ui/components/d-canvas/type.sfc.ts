export type Options = {
  /**画布上线的宽度 默认1, 不影响addEdge()宽度 */
  strokeWidth?: number
  /**当前缩放倍数, 默认1 */
  scale?: number
  /**缩放步长（按钮), 默认0.1 */
  scaleStep?: number
  /**缩放步长（手势）, 默认0.02 */
  touchScaleStep?: number
  /**缩放最大倍数（缩放比率倍数）, 默认10 */
  maxScale?: number
  /**缩放最小倍数（缩放比率倍数）, 默认0.25 */
  minScale?: number
  /**默认画布偏移, 默认{ x: 0, y: 0 } */
  translate?: any
  /**是否开启节流绘图（建议开启，否则安卓调用频繁导致卡顿）, 默认true */
  isThrottleDraw?: boolean
  /**节流绘图间隔，单位ms, 默认20 */
  throttleInterval?: number
  /**超出底图的是否裁剪掉, 默认为true */
  isClip?: boolean
}

type StyleType = {
  radius?: number // 画圆时的半径
  width?: number
  height?: number
  strokeWidth?: number
  stroke?: string // stroke颜色
  fill?: string // 填充颜色
  lineDash?: [] // lineDash为小程序ctx.setLineDash(lineDash)的参数,具体用法请查询小程序文档
  img?: string
}
export type ItemType = {
  /**多边形的包围盒 */
  aCoords: any
  /**旋转角度 */
  angle: number
  /**节点的json中的data业务数据-x6生成 */
  data: any
  /**节点id, 唯一标识 */
  id: string
  /**是否选中, 每次点击选中当前节点, 点击别处自动取消 */
  isSelect: boolean
  /**控制器坐标 */
  oCoords: any
  /**坐标点 */
  points: any
  /**样式 */
  style: StyleType
  /**文本 */
  text: string | undefined
  /**绘制点/绘制多边形 */
  type: 'Point' | 'Shape'
  /**层级 */
  zIndex: number
}

type CoordsType = {
  x: number
  y: number
}
export type CanvasObjectType = Options & {
  canvasNode: any // wx的canvas节点
  ctx: any // wx的canvas节点的2d上下文
  zoomCenter: any // 缩放中心点
  children: any[] // 子对象
  canDragCanvas: boolean // 能拖动画布
  coefficient: number // 初始化画布时,画布自适应缩放比例
  /**app端为同步绘制，无需再做异步处理 */
  fromJSON: (json: any) => void // load json 节点按zIndex先后绘制，zIndex数值越大的后绘制
  drawRoute: (route: CoordsType[], color?: string) => void // 绘制路线
  clearRoutes: () => void // 删除所有路线
  clear: () => void // 清除画布，并清空子对象
  getSelect: () => void // 获取当前选中的元素
  clearSelect: () => void // 清除选中
  zoomIn: () => void // 中心放大
  zoomOut: () => void // 中心缩小
  zoomTo: (scale: number, zoomCenter0?: any) => void // 缩放到指定倍数 scale缩放大小 zoomCenter缩放中心点（可选
  destroy: () => void // 销毁
  zoomToFit: () => void // 重置画布（恢复到第一次绘制的状态）
  draw: (isInit?: boolean, drawFn?: (opt: any) => void) => void // 用于添加新节点，isInit:是否是初次加载(新增节点填false就行), drawFn:绘制节点的方法(下面封装好的除外)
  removeNode: (id: any) => void // 移除节点
  // 绘制多边形- isAddChild是否添加到canvas子对象,默认为true
  addPolyline: (opt: PolylineOpt, isAddChild?: boolean) => void
  // 绘制多条线段
  addEdge: (opt: LineOpt, isAddChild?: boolean) => void
  // 绘制文字
  addText: (opt: TextOpt, isAddChild?: boolean) => void
  // 绘制圆点/图片点
  addPoint: (opt: PointOpt | ImageOpt, isAddChild?: boolean) => void
  // canvas转图片, 返回转换后的临时图片地址（生成的图片为png格式，且背景色为透明色）
  // app端生成的临时地址不知道怎么使用-暂不推荐使用此方法，且app端不存在canvas层级过高的问题
  renderImage: () => Promise<string>
  // 清除临时图片地址, 返回临时图片地址
  cancelRenderImage: () => string
  /**获取临时图片地址 */
  getTempFilePath: () => string
  /**隐藏节点-ids：节点id数组 */
  hide: (ids: any[]) => void
  /**显示节点-ids：节点id数组 */
  show: (ids: any[]) => void
  /**小程序中canvas尺寸变化时会变形，因此需要重绘，isCustomDrawing: 是否自定义绘制默认false，cb：绘制前的回调 */
  redraw: (isCustomDrawing?: boolean, cb?: () => void) => Promise<any>
}

type CommonOptType = {
  id?: string // 默认当前时间戳
  zIndex?: number // 默认0
  angle?: number // 旋转角度 默认0
  data?: any // 业务数据-自主绘制的时候自己定
}

type TextOpt = CommonOptType & {
  text: string // 文本
  textAlign?: string // 默认center
  textBaseline?: string // 默认middle
}

type PointOpt = CommonOptType & {
  points: CoordsType[] // 圆为一个圆心坐标
  style: {
    radius: number // 画圆时的半径
    strokeWidth?: number
    stroke?: string // stroke颜色 默认#000
    fill?: string // 填充颜色
    lineDash?: [] // lineDash为小程序ctx.setLineDash(lineDash)的参数,具体用法请查询小程序文档
  }
}

type ImageOpt = CommonOptType & {
  points: CoordsType[] // 图片的左上角坐标
  style: {
    width: number
    height: number
    img: string
  }
}

type PolylineOpt = CommonOptType & {
  points: CoordsType[] // 顶点坐标
  style: {
    fill: string
    stroke: string // 默认#000
    strokeWidth?: number
    lineDash?: [] // lineDash为小程序ctx.setLineDash(lineDash)的参数,具体用法请查询小程序文档
  }
}

type LineOpt = CommonOptType & {
  points: CoordsType[] // 每个拐点的坐标
  style: {
    strokeWidth?: number
    stroke?: string // stroke颜色 默认#000
    lineDash?: [] // lineDash为小程序ctx.setLineDash(lineDash)的参数,具体用法请查询小程序文档
  }
}

export interface Emits {
  /**点击事件，仅支持点击自定义图片节点(shape:$backgroundImage)/图片节点(shape:image)/圆形(shape:circle)/多边形(shape:polyline/rect)才会触发，不支持边，需要可扩展 */
  (e: 'selection-updated', item: ItemType): void
  /**取消选中 */
  (e: 'selection-cleared', item: ItemType): void
  /**长按 */
  (e: 'selection-long-tap', item: ItemType): void
  (e: 'touchstart', data: any): void
  (e: 'touchmove', data: any): void
  (e: 'touchend', data: any): void
  /**canvasDraw对象 */
  (e: 'update:canvas', canvas?: CanvasObjectType): void
  /** 初始化完成 */
  (e: 'onReady', data: any): void
  /** 转图片时-图片加载完成的时机（不是图片渲染好的时机）tempFilePath: 图片地址 */
  (e: 'bindload', tempFilePath: any): void
  /** 所有图片加载完成（首次）- 仅微信小程序支持 */
  (e: 'imgs-first-onload', data: any): void
  /** canvas转图片成功-弹窗时canvas层级过高的解决方案 - 仅微信小程序支持 */
  (e: 'on-render-image-sucess'): void
  /** 取消canvas转图片 - 仅微信小程序支持 */
  (e: 'on-render-image-cancel'): void
}
