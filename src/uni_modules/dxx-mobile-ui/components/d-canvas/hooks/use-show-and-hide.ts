export default (canvasDraw: any, { jsonObj }: any) => {
  // 隐藏节点
  canvasDraw.value.hide = (ids: any[]) => {
    if (jsonObj.value && ids) {
      jsonObj.value?.cells?.forEach((item: any) => {
        if (ids?.includes(item.id)) {
          item.visible = false
        }
      })
    }
    canvasDraw.value.draw()
  }
  // 显示节点
  canvasDraw.value.show = (ids: any[]) => {
    if (jsonObj.value && ids) {
      jsonObj.value?.cells?.forEach((item: any) => {
        if (ids?.includes(item.id)) {
          item.visible = true
        }
      })
    }
    canvasDraw.value.draw()
  }
}
