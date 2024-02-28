import { ref } from 'vue'
const useEvent = (canvasDraw: any, emits: any) => {
  const startPoint = ref(null) // 手绘起点
  const fingers = ref(null) // 手指数量
  /** 组件内置事件-与canvasDraw.js中的 events 事件集合一一对应 */
  const onSelectionUpdated = (item: any) => {
    emits('selection-updated', item)
    item.controlsVis = { delete: true }
    if (item.type !== 'Lines') item.zIndex = 1
    canvasDraw.value.draw()
  }
  const onSelectionCleared = (item: any) => {
    if (!item) return
    emits('selection-cleared', item)
    item.controlsVis = { delete: false }
    item.zIndex = 0
    canvasDraw.value.draw()
  }
  const onSelectionLongTap = (item: any) => {
    emits('selection-long-tap', item)
  }
  const onTouchstart = (e: any) => {
    startPoint.value = e.point
    fingers.value = e.event.touches.length
    emits('touchstart', e)
  }
  const onTouchmove = (e: any) => {
    emits('touchmove', e)
  }
  const onTouchend = (e: any) => {
    emits('touchend', e)
  }
  const onTap = (e: any) => {
    // console.log('点击坐标：', e.point)
    // console.log('所有canvas子对象：', canvasDraw.value.children)
  }

  const onReady = (e: any) => {
    emits('onReady', e)
  }
  /**
   * 点击删除控制点
   * @param e
   */
  const onDeleteControl = (e: any) => {
    console.log('点击删除控制点', e)
    canvasDraw.value.removeChild(e.id)
    canvasDraw.value.draw()
  }

  /** 绑定组件内置事件 */
  const addEvents = () => {
    canvasDraw.value?.on('selection:updated', onSelectionUpdated)
    canvasDraw.value?.on('selection:cleared', onSelectionCleared)
    canvasDraw.value?.on('selection:longTap', onSelectionLongTap)
    canvasDraw.value?.on('touchstart', onTouchstart)
    canvasDraw.value?.on('touchmove', onTouchmove)
    canvasDraw.value?.on('touchend', onTouchend)
    canvasDraw.value?.on('tap', onTap)
    canvasDraw.value?.on('deleteControl:tap', onDeleteControl)
    canvasDraw.value?.on('onReady', onReady)
  }
  return {
    addEvents,
  }
}

export { useEvent }
