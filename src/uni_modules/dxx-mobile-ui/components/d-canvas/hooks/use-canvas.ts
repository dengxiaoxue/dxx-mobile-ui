import { CanvasDraw } from '../utils/canvasDraw.js'
import { useEvent } from './use-event'
import { default as useDraw } from './use-draw'
import { default as renderToImage } from './use-render-to-image'
import { default as hideOrShowNode } from './use-show-and-hide'
import { getCurrentInstance, ref, shallowRef, nextTick } from 'vue'

const useCanvas = ({ props, emits }: any) => {
  const canvasDraw = shallowRef<any>(null) // 绘图对象
  const jsonObj = shallowRef<any>()
  let tempJSON: any = null // fromjson时暂存json
  let ctx: any = null
  let canvasEle: any = null // wx的canvas节点
  const canvasEleReadonly = ref(null)
  let canvasNode: any = null // wx的canvas节点
  const strokeWidth = ref(1)
  const tempFilePath = ref<any>('')

  /** 初始化canvas */
  const initCanvas = () => {
    const info = uni.getSystemInfoSync()

    const instance = getCurrentInstance() // 获取组件实例
    const query = uni.createSelectorQuery().in(instance)

    query
      .select(`#${props.id}`)
      // @ts-ignore
      .fields({ node: true, size: true, rect: true })
      .exec((res) => {
        let ele = res[0]

        // #ifdef H5 || APP-PLUS
        ctx = uni.createCanvasContext(props.id)
        canvasEle = { node: {}, ctx: ctx, width: ele.width, height: ele.height }
        canvasNode = { width: ele.width, height: ele.heght, canvasId: props.id }
        canvasEleReadonly.value = canvasEle
        // #endif

        // #ifdef MP-WEIXIN
        canvasEle = ele
        canvasNode = ele?.node
        canvasEleReadonly.value = canvasEle
        // #endif

        const { draw, handelJSON, drawRoute, handleOpt, changeChildrenPosition } = useDraw(
          canvasDraw,
          jsonObj,
          canvasEleReadonly,
          strokeWidth,
        )

        // 配置项
        const option = {
          ele: canvasEle, // canvas元素 这里用ref对象传值会报错
          drawCallBack: draw, // 必须：用户自定义绘图方法
          scale: 1, // 当前缩放倍数
          scaleStep: 0.1, // 缩放步长（按钮)
          touchScaleStep: 0.02, // 缩放步长（手势）
          maxScale: 10, // 缩放最大倍数（缩放比率倍数）
          minScale: 0.25, // 缩放最小倍数（缩放比率倍数）
          translate: { x: 0, y: 0 }, // 默认画布偏移
          isThrottleDraw: true, // 是否开启节流绘图（建议开启，否则安卓调用频繁导致卡顿）
          throttleInterval: 20, // 节流绘图间隔，单位ms
          // #ifdef MP-WEIXIN
          pixelRatio: uni.getSystemInfoSync().pixelRatio, // 像素比（高像素比可以解决高清屏幕模糊问题）
          // #endif
          controlsVis: {
            delete: false,
          },
          controls: {
            delete: false,
          },
          ...props.options,
          isEnablePanScale: props.isEnablePanScale,
        }
        // console.log('option: ', option)
        strokeWidth.value = props.options?.strokeWidth ?? 1

        canvasDraw.value = new CanvasDraw(option, () => emits('imgs-first-onload', {})) // 创建CanvasDraw实例后就可以使用实例的所有方法了

        useEvent(canvasDraw, emits).addEvents() // 添加事件监听

        renderToImage(canvasDraw, {
          canvasNode,
          tempFilePath,
        })

        hideOrShowNode(canvasDraw, { jsonObj })

        canvasDraw.value.fromJSON = (json: any) => {
          canvasDraw.value.children = [] // 每次fromjson时清空子对象
          tempJSON = json
          jsonObj.value = handelJSON(json)
          // 以背景图居中
          if (props?.centerContent && jsonObj.value?.backgroundConfig) {
            const backgroundHeight = jsonObj.value?.backgroundConfig?.size?.height ?? 0
            const translateY = backgroundHeight ? canvasEle.height / 2 - backgroundHeight / 2 : 0
            canvasDraw.value.setTranslate({
              x: 0,
              y: translateY,
            })
          }
          canvasDraw.value.draw(true) // 参数为true,每次fromJSON的时候才执行drawCallBack
        }

        canvasDraw.value.drawRoute = (routes: any, color?: any) => {
          // #ifdef H5 || APP-PLUS
          canvasDraw.value.draw(false, () => drawRoute(routes, color))
          // #endif

          // #ifdef MP-WEIXIN
          drawRoute(routes, color)
          // #endif
        }

        canvasDraw.value.clearRoutes = () => {
          const routes = canvasDraw.value?.children?.filter((item: any) => item?.data?.shape === 'route')
          routes.forEach((route: any) => canvasDraw.value?.removeChild(route.id))
          canvasDraw.value?.draw()
        }

        canvasDraw.value.zoomToFit = zoomToFit

        canvasDraw.value.addPolyline = (opt: any, isAddChild?: boolean) => {
          const option = handleOpt(opt)
          // #ifdef H5 || APP-PLUS
          canvasDraw.value?.draw(false, () => canvasDraw.value.drawShape(option, isAddChild))
          // #endif

          // #ifdef MP-WEIXIN
          canvasDraw.value.drawShape(option, isAddChild)
          // #endif
        }
        canvasDraw.value.addEdge = (opt: any, isAddChild?: boolean) => {
          const option = handleOpt(opt)
          // #ifdef H5 || APP-PLUS
          canvasDraw.value?.draw(false, () => canvasDraw.value.drawLines(option, isAddChild))
          // #endif

          // #ifdef MP-WEIXIN
          canvasDraw.value.drawLines(option, isAddChild)
          // #endif
        }
        canvasDraw.value.addText = (opt: any, isAddChild?: boolean) => {
          const option = handleOpt(opt)
          // #ifdef H5 || APP-PLUS
          canvasDraw.value?.draw(false, () => canvasDraw.value.drawText(option, isAddChild))
          // #endif

          // #ifdef MP-WEIXIN
          canvasDraw.value.drawText(option, isAddChild)
          // #endif
        }
        canvasDraw.value.addPoint = (opt: any, isAddChild?: boolean) => {
          const option = handleOpt(opt)
          // #ifdef H5 || APP-PLUS
          canvasDraw.value?.draw(false, () => canvasDraw.value.drawPoint(option, isAddChild))
          // #endif

          // #ifdef MP-WEIXIN
          canvasDraw.value.drawPoint(option, isAddChild)
          // #endif
        }
        canvasDraw.value.removeNode = (id: string) => {
          canvasDraw.value?.removeChild(id)
          canvasDraw.value?.draw()
        }

        const redrawCanvas = (res: any, cb: any) => {
          // 重新赋值宽高，解决canvas高度变化，内容被压缩/拉伸的问题
          canvasEle.height = res?.height
          canvasEle.width = res?.width
          
          // 重置json
          jsonObj.value = handelJSON(tempJSON)
          if (props?.centerContent && jsonObj.value?.backgroundConfig) {
            const backgroundHeight = jsonObj.value?.backgroundConfig?.size?.height ?? 0
            const backgroundWidth = jsonObj.value?.backgroundConfig?.size?.width ?? 0
            const translateY = backgroundHeight ? canvasEle.height / 2 - backgroundHeight / 2 : 0
            const translateX = backgroundWidth ? canvasEle.width / 2 - backgroundWidth / 2 : 0
            canvasDraw.value.setOptionTranslate({ x: translateX, y: translateY })
            // 重置所有子对象(背景图/路线/circle/rect/polyline/edge/图片/文字)坐标和大小
            changeChildrenPosition()
          }
          
          cb && cb()
        }

        /**
         * @param isCustomDrawing 自定义绘制，默认false
         * @param cb 绘制前的回调
         * @returns Promise
         */
        let timer: any = null
        canvasDraw.value.redraw = (isCustomDrawing = false, cb?: () => void) => {
          return new Promise((resolve) => {
            nextTick(() => {
              // #ifdef H5 || APP-PLUS
              // 频繁变化会出现画布被裁切的情况
              uni.createSelectorQuery()
                .select(`#canvaswrap${props.id}`)
                // @ts-ignore
                .fields({ node: true, size: true, rect: true })
                .exec((res) => {
                  redrawCanvas(res[0], cb)
                  if (timer) clearTimeout(timer)
                  if (!isCustomDrawing) canvasDraw.value.draw()
                  // 解决偶现画布被裁切的问题
                  timer = setTimeout(() => {
                    if (!isCustomDrawing) canvasDraw.value.draw()
                    resolve(true)
                    clearTimeout(timer)
                  }, 300)
                })
              // #endif

              // #ifdef MP-WEIXIN
              query
                .select(`#${props.id}`)
                // @ts-ignore
                .fields({ node: true, size: true, rect: true })
                .exec((res) => {
                  // 重新赋值宽高，解决canvas高度变化，内容被压缩/拉伸的问题
                  redrawCanvas(res[0], cb)
                  if (!isCustomDrawing) canvasDraw.value.draw()
                  resolve(true)
                })
              // #endif
            })
          })
        }

        emits('update:canvas', canvasDraw.value)
        emits('onReady', canvasDraw.value)
      })
  }
  /** canvas事件绑定 */
  const touchstart = (e: any) => {
    canvasDraw.value.touchstart(e)
  }
  const touchmove = (e: any) => {
    canvasDraw.value.touchmove(e)
  }
  const touchend = (e: any) => {
    canvasDraw.value.touchend(e)
  }
  const longtap = (e: any) => {
    canvasDraw.value.longtap(e)
  }
  /** 重置画布（恢复初始效果） */
  const zoomToFit = () => {
    canvasDraw.value.reset()
  }
  return {
    initCanvas,
    touchstart,
    touchmove,
    touchend,
    longtap,
    canvasDraw,
    tempFilePath,
  }
}

export { useCanvas }
