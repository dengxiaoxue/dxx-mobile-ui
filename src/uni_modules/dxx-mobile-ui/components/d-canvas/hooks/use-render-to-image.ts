export default (canvasDraw: any, { canvasNode, tempFilePath }: any) => {
  canvasDraw.value.renderImage = () => {
    return new Promise((resolve) => {
      // 预览图片并弹出分享菜单
      uni.canvasToTempFilePath({
        x: 0, // 指定的画布区域的左上角横坐标
        y: 0,
        width: canvasNode.width, // 指定的画布区域的宽度
        height: canvasNode.height,
        destWidth: canvasNode.width, // 输出的图片的宽度
        destHeight: canvasNode.height,
        // #ifdef H5 || APP-PLUS
        canvasId: canvasNode.canvasId,
        // #endif
        // #ifdef MP-WEIXIN
        canvas: canvasNode,
        // #endif
        success: (resource) => {
          // 在H5平台下，tempFilePath 为 base64
          tempFilePath.value = resource.tempFilePath // 保存图片本地链接
          resolve(tempFilePath.value)
        },
        fail: () => {
          tempFilePath.value = ''
          resolve(tempFilePath.value)
        },
      })
    })
  }

  canvasDraw.value.cancelRenderImage = () => {
    tempFilePath.value = ''
    return tempFilePath.value
  }

  canvasDraw.value.getTempFilePath = () => {
    return tempFilePath.value
  }
}
