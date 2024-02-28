import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash'

export default (canvasDraw: any, jsonObj: any, canvasEleReadonly: any, strokeWidth: any) => {
  const coefficient = ref(1) // 屏幕宽比画布宽

  // 画布宽高
  let canvasWidth = 1920
  let canvasHeight = 1080
  let backgroundOffset = { x: 0, y: 0 }

  // 自定义节点
  const handleOpt = (opt: any) => {
    opt.data = { originData: cloneDeep(opt), type: 'custom-node' }
    opt.node = cloneDeep(opt)
    const offsetX = backgroundOffset.x
    const offsetY = backgroundOffset.y
    if (opt?.points) {
      opt.points = opt?.points?.map((p: any) => ({
        x: (p.x - offsetX) * coefficient.value,
        y: (p.y - offsetY) * coefficient.value,
      }))
    }
    if (opt?.style) {
      if (opt?.style?.width) opt.style.width *= coefficient.value
      if (opt?.style?.height) opt.style.height *= coefficient.value
      if (opt?.style?.strokeWidth) opt.style.strokeWidth *= opt.style.strokeWidth
      if (opt?.style?.radius) opt.style.radius *= coefficient.value
    }
    if (opt?.x) opt.x = (opt.x - offsetX) * coefficient.value
    if (opt?.y) opt.y = (opt.y - offsetY) * coefficient.value
    return opt
  }

  const handelJSON = (data: any) => {
    if (!data) return
    let localData = cloneDeep(data)
    let source: any = null
    let target: any = null
    if (localData?.backgroundConfig && localData?.backgroundConfig?.size?.width) {
      canvasWidth = localData?.backgroundConfig?.size?.width
      canvasHeight = localData?.backgroundConfig?.size?.height
      coefficient.value = canvasEleReadonly.value.width / canvasWidth
      backgroundOffset = {
        x: localData?.backgroundConfig?.position?.x || 0,
        y: localData?.backgroundConfig?.position?.y || 0,
      }
    } else {
      coefficient.value = 1
    }
    // console.log('缩放系数：', coefficient.value)
    localData?.cells?.forEach((item: any) => {
      // 处理圆形、矩形、图片、自定义图片
      if (['circle', 'rect', 'image', '$backgroundImage', 'polyline'].includes(item.shape)) {
        item.position.x = (item.position.x - backgroundOffset.x) * coefficient.value
        item.position.y = (item.position.y - backgroundOffset.y) * coefficient.value
        item.size.width *= coefficient.value
        item.size.height *= coefficient.value
        if (item.shape === 'circle') {
          item.area = {
            x: [item.position.x - item.size.width / 2, item.position.x + item.size.width / 2],
            y: [item.position.y - item.size.height / 2, item.position.y + item.size.height / 2],
          }
        }
        if (['rect', 'image', '$backgroundImage', 'polyline'].includes(item.shape)) {
          item.area = {
            x: [item.position.x, item.position.x + item.size.width],
            y: [item.position.y, item.position.y + item.size.height],
          }
        }
      }
      // 处理边
      if (['edge'].includes(item.shape)) {
        if (item?.source?.x) item.source.x = (item.source.x - backgroundOffset.x) * coefficient.value
        if (item?.source?.y) item.source.y = (item.source.y - backgroundOffset.y) * coefficient.value
        if (item?.target?.x) item.target.x = (item.target.x - backgroundOffset.x) * coefficient.value
        if (item?.target?.y) item.target.y = (item.target.y - backgroundOffset.y) * coefficient.value
        item?.vertices?.forEach((v: any) => {
          v.x = (v.x - backgroundOffset.x) * coefficient.value
          v.y = (v.y - backgroundOffset.y) * coefficient.value
        })
      }
    })
    const result = localData?.cells?.map((item: any) => {
      if (item?.shape === 'edge') {
        source = localData?.cells?.filter((node: any) => node.id === item.source.cell)[0]
        target = localData?.cells?.filter((node: any) => node.id === item.target.cell)[0]
        return {
          ...item,
          visible: item.visible ?? true,
          $position: [
            { x: source?.position?.x || item?.source?.x, y: source?.position?.y || item?.source?.y },
            { x: target?.position.x || item?.target?.x, y: target?.position.y || item?.target?.y },
          ],
          $source: source,
          $target: target,
        }
      }
      item.visible = item.visible ?? true
      return item
    })
    const backgroundConfig = {
      ...localData?.backgroundConfig,
      size: {
        width: canvasEleReadonly.value.width,
        height: coefficient.value * localData?.backgroundConfig?.size?.height || 0,
      },
    }
    return {
      ...localData,
      backgroundConfig: backgroundConfig,
      cells: result,
      $routes: localData.$routes ?? { route: [], routesColor: 'pink' },
    }
  }
  /**
   * jsonObj获取的json不会改变,初次画才执行,以后每一次更新不执行,以防修改节点失效
   * @param isInit
   * @returns
   */
  const draw = async () => {
    if (!jsonObj.value) return
    if (jsonObj.value?.backgroundConfig) {
      // #ifdef MP-WEIXIN
      await addBackground(jsonObj.value?.backgroundConfig)
      // #endif

      // #ifdef H5 || APP-PLUS
      // app端因绘制图片表现为同步，可直接在fromjson后绘制路线，因此这里不能异步
      addBackground(jsonObj.value?.backgroundConfig)
      // #endif
    }

    const cells = jsonObj.value?.cells
      .filter((node: any) => node.visible)
      .sort((a: any, b: any) => Number(a.zIndex) - Number(b.zIndex)) // 排序
    const $routes = jsonObj.value?.$routes
    canvasDraw.value.imageNodeTotalCount =
      cells?.filter((node: any) => node.visible && (node?.shape === 'image' || node?.shape === '$backgroundImage'))
        ?.length || 0

    // 绘制节点
    cells?.forEach((cell: any) => {
      addShape(cell)
    })
    // 绘制路线
    if ($routes.route && $routes.route.length !== 0) {
      drawRoute($routes.route, $routes.routesColor)
    }
  }
  const addBackground = ({ position, size, image, color }: any) => {
    const opt = {
      id: 'backgroundConfig',
      zIndex: -1,
      points: [{ x: position.x - backgroundOffset.x, y: position.y - backgroundOffset.y }], // 左上角坐标
      style: { width: size?.width ?? canvasEleReadonly.value.width, height: size?.height, img: image },
      angle: 0,
      node: jsonObj.value?.backgroundConfig,
    }
    return canvasDraw.value?.drawBackground(opt)
  }
  const addShape = (node: any) => {
    // drawPoint
    if (node.shape === 'circle') {
      const opt = {
        id: node?.id,
        zIndex: 0,
        points: [{ x: node.position.x, y: node.position.y }], // 圆心坐标
        style: {
          radius: node.size.width / 2, // 半径
          strokeWidth: strokeWidth.value,
          stroke: node?.attrs?.body?.stroke || 'black',
          fill: node?.attrs?.body?.fill || '#fff',
        },
        data: { shape: node?.shape, ...node?.data },
        node: node,
      }
      canvasDraw.value?.drawPoint(opt)
      return
    }
    // drawShape
    if (node.shape === 'rect') {
      const opt = {
        id: node?.id,
        zIndex: 0,
        points: [
          { x: node.position.x, y: node.position.y },
          { x: node.position.x + node.size.width, y: node.position.y },
          { x: node.position.x + node.size.width, y: node.position.y + node.size.height },
          { x: node.position.x, y: node.position.y + node.size.height },
        ],
        style: {
          strokeWidth: strokeWidth.value,
          stroke: node?.attrs?.body?.stroke || 'black',
          fill: node?.attrs?.body?.fill || '#fff',
        },
        data: { shape: node?.shape, ...node?.data },
        node: node,
      }
      canvasDraw.value?.drawShape(opt)
      return
    }
    // drawShape
    if (node.shape === 'polyline') {
      const refPoints = node.attrs.body.refPoints.split(' ') || []
      // 有的障碍物坐标有偏差
      let offsetX = 0
      let offsetY = 0
      if (refPoints[0]) {
        let refPoint = refPoints[0]?.split(',')
        let x = Number(refPoint[0]) * coefficient.value
        let y = Number(refPoint[1]) * coefficient.value
        offsetX = x === node?.position?.x ? 0 : node?.position?.x - x
        offsetY = y === node?.position?.y ? 0 : node?.position?.y - y
      }
      const p = refPoints?.map((i: any, index: any) => {
        const arr = i?.split(',')
        return {
          x: Number(arr[0]) * coefficient.value + offsetX,
          y: Number(arr[1]) * coefficient.value + offsetY,
        }
      })
      const opt = {
        id: node?.id,
        zIndex: 0,
        points: p,
        style: {
          strokeWidth: strokeWidth.value,
          stroke: node?.attrs?.body?.stroke || 'black',
          fill: node?.attrs?.body?.fill || '#fff',
        },
        data: { shape: node?.shape, ...node?.data },
        node: node,
      }
      canvasDraw.value?.drawShape(opt)
      return
    }
    // drawLines
    if (node.shape === 'edge') {
      if (node?.$source?.shape === 'edge') return
      // 起止坐标
      const position = node?.$position
      // 途径点
      const vertices = node?.vertices

      const opt = {
        id: node?.id,
        zIndex: 0,
        points: [{ x: position[0].x, y: position[0].y }],
        style: { strokeWidth: strokeWidth.value, stroke: node?.attrs?.line?.stroke || '#000' },
        angle: 0,
        data: { shape: node?.shape, ...node?.data },
        node: node,
      }
      if (vertices && vertices?.length > 0) {
        vertices.forEach((item: any) => {
          opt.points.push({ x: item.x, y: item.y })
        })
      }
      opt.points.push({ x: position[1].x, y: position[1].y })
      canvasDraw.value?.drawLines(opt)
      return
    }
    // drawPoint
    if (node.shape === 'image') {
      const opt = {
        id: node?.id,
        zIndex: 0,
        points: [{ x: node.position.x, y: node.position.y }], // 左上角坐标
        style: { width: node.size.width, height: node?.size?.height, img: node?.attrs?.image['xlink:href'] },
        angle: 0,
        data: { shape: node?.shape, ...node?.data },
        node: node,
      }
      canvasDraw.value?.drawPoint(opt)
      return
    }
    // drawPoint
    if (node.shape === '$backgroundImage') {
      const opt = {
        id: node?.id,
        zIndex: 0,
        points: [{ x: node.position.x, y: node.position.y }], // 左上角坐标
        style: { width: node.size.width, height: node?.size?.height, img: node?.data?.url },
        angle: 0,
        data: { shape: node?.shape, ...node?.data },
        node: node,
      }
      canvasDraw.value?.drawPoint(opt)
      return
    }
  }
  const drawRoute = (routes: any[], color?: string) => {
    const points = routes.map((route: { x: number; y: number }) => ({
      x: route?.x * coefficient.value,
      y: route?.y * coefficient.value,
    }))
    const opt = {
      id: `route_${new Date().getTime()}`,
      zIndex: 0,
      points,
      style: { strokeWidth: strokeWidth.value, stroke: color || '#21ED20' },
      angle: 0,
      data: { shape: 'route', originRoutes: [...routes] },
    }
    canvasDraw.value?.drawLines(opt)
  }

  const changeChildrenPosition = () => {
    // 获取所有子对象
    const children = canvasDraw.value.children
    const cells = jsonObj.value.cells
    const backgroundConfig = jsonObj.value.backgroundConfig
    children.forEach((item: any) => {
      if (item.id === 'backgroundConfig') {
        item.style.height = backgroundConfig.size.height
        item.style.width = backgroundConfig.size.width
        item.style.node = backgroundConfig
        return
      }
      if (item?.data?.shape === 'route') {
        item.points = item.data.originRoutes?.map((route: { x: number; y: number }) => ({
          x: route?.x * coefficient.value,
          y: route?.y * coefficient.value,
        }))
        return
      }
      // 自定义节点
      if (item?.data?.type === 'custom-node') {
        const opt = cloneDeep(item?.data?.originData)
        const offsetX = backgroundOffset.x
        const offsetY = backgroundOffset.y
        if (opt?.points) {
          item.points = opt?.points?.map((p: any) => ({
            x: (p.x - offsetX) * coefficient.value,
            y: (p.y - offsetY) * coefficient.value,
          }))
        }
        if (opt?.style) {
          if (opt?.style?.width) item.style.width = opt.style.width * coefficient.value
          if (opt?.style?.height) item.style.height = opt.style.height * coefficient.value
          if (opt?.style?.strokeWidth) item.style.strokeWidth = opt.style.strokeWidth * opt.style.strokeWidth
          if (opt?.style?.radius) item.style.radius = opt.style.radius * coefficient.value
        }
        if (opt?.x) item.x = (opt.x - offsetX) * coefficient.value
        if (opt?.y) item.y = (opt.y - offsetY) * coefficient.value
        return
      }
      const node = cells.find((it: any) => it.id === item.id)
      if (node) {
        if (node.shape === 'circle') {
          item.points = [{ x: node.position.x, y: node.position.y }]
          item.style.radius = node.size.width / 2
          item.data = { shape: node?.shape, ...node?.data },
          item.node = node
          return
        }
        if (node.shape === 'rect') {
          item.points = [
            { x: node.position.x, y: node.position.y },
            { x: node.position.x + node.size.width, y: node.position.y },
            { x: node.position.x + node.size.width, y: node.position.y + node.size.height },
            { x: node.position.x, y: node.position.y + node.size.height },
          ]
          item.data = { shape: node?.shape, ...node?.data },
          item.node = node
          return
        }
        if (node.shape === 'polyline') {
          const refPoints = node.attrs.body.refPoints.split(' ') || []
          // 有的障碍物坐标有偏差
          let offsetX = 0
          let offsetY = 0
          if (refPoints[0]) {
            let refPoint = refPoints[0]?.split(',')
            let x = Number(refPoint[0]) * coefficient.value
            let y = Number(refPoint[1]) * coefficient.value
            offsetX = x === node?.position?.x ? 0 : node?.position?.x - x
            offsetY = y === node?.position?.y ? 0 : node?.position?.y - y
          }
          const p = refPoints?.map((i: any, index: any) => {
            const arr = i?.split(',')
            return {
              x: Number(arr[0]) * coefficient.value + offsetX,
              y: Number(arr[1]) * coefficient.value + offsetY,
            }
          })
          item.points = p
          item.data = { shape: node?.shape, ...node?.data },
          item.node = node
          return
        }
        if (node.shape === 'edge') {
          if (node?.$source?.shape === 'edge') return
          // 起止坐标
          const position = node?.$position
          // 途径点
          const vertices = node?.vertices

          const points = [{ x: position[0].x, y: position[0].y }]
          if (vertices && vertices?.length > 0) {
            vertices.forEach((item: any) => {
              points.push({ x: item.x, y: item.y })
            })
          }
          points.push({ x: position[1].x, y: position[1].y })
          item.points = points
          item.data = { shape: node?.shape, ...node?.data },
          item.node = node
          return
        }
        if (node.shape === 'image' || node.shape === '$backgroundImage') {
          item.points = [{ x: node.position.x, y: node.position.y }]
          item.style.width = node.size.width
          item.style.height = node.size.height
          item.data = { shape: node?.shape, ...node?.data },
          item.node = node
          return
        }
      }
    })
  }

  watch(
    () => coefficient.value,
    (val) => {
      canvasDraw.value.coefficient = val
    },
  )
  return { draw, handelJSON, drawRoute, addBackground, handleOpt, changeChildrenPosition }
}
