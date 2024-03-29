// https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon64_wx_logo.png
export const json = {
  cells: [
    {
      position: { x: 26, y: 18 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'http://192.168.100.210/oss/resource/workspace/circle/selectable.png',
        id: '1714841118361714688',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'http://192.168.100.210/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'http://192.168.100.210/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'http://192.168.100.210/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1714841118361714688',
      zIndex: 1,
    },
    {
      position: { x: 780, y: 130 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'http://192.168.100.210/oss/resource/workspace/circle/selectable.png',
        id: '1714902036017774592',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'http://192.168.100.210/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'http://192.168.100.210/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'http://192.168.100.210/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1714902036017774592',
      zIndex: 2,
    },
    {
      position: { x: 160, y: 140 },
      size: { width: 30, height: 30 },
      attrs: { image: { 'xlink:href': 'http://192.168.100.210/oss/resource/workspace/start.png' } },
      visible: true,
      shape: 'image',
      id: 'aa6e39d4-4f49-4cde-a40c-cdcb35fef962',
      data: { $_type: 'start-point', $_name: '起点', $_isStart: false },
      zIndex: 3,
    },
    {
      position: { x: 370, y: 100 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '7f9bdff2-d1a3-48ee-8587-788468742538',
      data: {
        $_type: 'path',
        isDrawNode: true,
        isRoot: true,
        isChild: false,
        id: '7f9bdff2-d1a3-48ee-8587-788468742538',
        parentId: null,
        isRoueNode: true,
        isFromEdge: false,
      },
      zIndex: 4,
    },
    {
      position: { x: 640, y: 150 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: 'fd38a275-1900-44e5-9a03-ba3e71cbe947',
      data: {
        $_type: 'path',
        isDrawNode: true,
        isRoot: false,
        isChild: true,
        id: 'fd38a275-1900-44e5-9a03-ba3e71cbe947',
        parentId: '7f9bdff2-d1a3-48ee-8587-788468742538',
        isRoueNode: true,
        isFromEdge: false,
      },
      zIndex: 5,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#1BA854', targetMarker: false, sourceMarker: false } },
      id: 'ba070e9a-d039-488c-9b99-ef908a9b99da',
      data: {
        isDraw: true,
        sourceNodeId: '7f9bdff2-d1a3-48ee-8587-788468742538',
        targetNodeId: 'fd38a275-1900-44e5-9a03-ba3e71cbe947',
        $_type: 'path',
        isRoute: true,
      },
      zIndex: 6,
      source: { cell: '7f9bdff2-d1a3-48ee-8587-788468742538' },
      target: { cell: 'fd38a275-1900-44e5-9a03-ba3e71cbe947' },
    },
    {
      position: { x: 390, y: 310 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '0c8a822a-ae4b-4f6d-b0a7-d52675632638',
      data: {
        $_type: 'path',
        isDrawNode: true,
        isRoot: false,
        isChild: true,
        id: '0c8a822a-ae4b-4f6d-b0a7-d52675632638',
        parentId: 'fd38a275-1900-44e5-9a03-ba3e71cbe947',
        isRoueNode: true,
        isFromEdge: false,
        isLeaf: true,
      },
      zIndex: 7,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#1BA854', targetMarker: false, sourceMarker: false } },
      id: '9d23eed8-32d4-4135-a34c-b4833a34a892',
      data: {
        isDraw: true,
        sourceNodeId: 'fd38a275-1900-44e5-9a03-ba3e71cbe947',
        targetNodeId: '0c8a822a-ae4b-4f6d-b0a7-d52675632638',
        $_type: 'path',
        isRoute: true,
      },
      zIndex: 8,
      source: { cell: 'fd38a275-1900-44e5-9a03-ba3e71cbe947' },
      target: { cell: '0c8a822a-ae4b-4f6d-b0a7-d52675632638' },
    },
    {
      position: { x: 570, y: 240 },
      size: { width: 131, height: 101 },
      attrs: { body: { refPoints: '500,200 600,290 470,300', fill: '#D9D9D9', strokeWidth: 1, stroke: '#D9D9D9' } },
      visible: true,
      shape: 'polyline',
      id: '4715c8ed-e7e7-4e1f-a01b-8a928c9278fe',
      data: { isRouteObstacle: true, $_type: 'barrier' },
      zIndex: 14,
    },
    {
      position: { x: 200, y: 290 },
      size: { width: 121, height: 71 },
      attrs: { body: { refPoints: '200,290 320,310 240,360', fill: '#D9D9D9', strokeWidth: 1, stroke: '#D9D9D9' } },
      visible: true,
      shape: 'polyline',
      id: 'ebbcd90a-fd1d-424d-bdd3-cb8a2c2f3910',
      data: { isRouteObstacle: true, $_type: 'barrier' },
      zIndex: 21,
    },
  ],
  backgroundConfig: {
    position: { x: 0, y: 0 },
    size: { width: 1376, height: 821 },
    image:
      'http://192.168.100.210/oss/business/t7559214624211973/iwm/stationMap/2023-10-23/s20231023-111424mMZiFNqsWp032ozf7OW60dzSPZGJaWLG-xlhPOmY53.png',
    color: '#fff',
  },
  container: { width: 1124, height: 754 },
  customData: {},
}

export const json2 = {
  cells: [
    {
      position: { x: 380, y: 100 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        // url: 'https://test29.rd.chn-das.com/oss/business/t1719634626319564802/停车场管理备份20231108-185134oQQaaGnDc3HHaKiozI3g6uOP01AMOhQ4Ne-U9CDsEb.png',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1725403677302837248',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1725403677302837248',
      zIndex: 2,
    },
    {
      position: { x: 470, y: 100 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1725403677156036608',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1725403677156036608',
      zIndex: 3,
    },
    {
      position: { x: 470, y: 483 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1725403677021818880',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1725403677021818880',
      zIndex: 4,
    },
    {
      position: { x: 687, y: 338 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1725403676891795456',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1725403676891795456',
      zIndex: 5,
    },
    {
      position: { x: 937, y: 338 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1725403676757577728',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1725403676757577728',
      zIndex: 6,
    },
    {
      position: { x: 937, y: 571 },
      size: { width: 80, height: 80 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1725403676552056832',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1725403676552056832',
      zIndex: 7,
    },
    {
      position: { x: 937, y: 181 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1725403676304592896',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1725403676304592896',
      zIndex: 8,
    },
    {
      position: { x: 480, y: 280 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: 'a6999f64-1b53-4f81-9b6f-c75897e98e79',
      data: { ignoreHistory: true, isDrawNode: true, isRoueNode: true, $_type: 'path' },
      zIndex: 9,
    },
    {
      position: { x: 1040, y: 280 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '0f4b5d0d-c451-4af3-8131-3fa1e559e877',
      data: {
        parentId: 'c1518cd8-b812-4cf8-8f66-0033a9402f53',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
      },
      zIndex: 10,
    },
    {
      position: { x: 1040, y: 280 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: 'c1518cd8-b812-4cf8-8f66-0033a9402f53',
      data: {
        parentId: '293c5e33-be76-4935-8fb3-3cddf06d45fe',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
        isLeaf: true,
      },
      zIndex: 12,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: '2eaf5a8d-a5bb-4262-a3c7-8a574ea61557',
      data: { ignoreHistory: true, isDraw: true, $_type: 'path' },
      zIndex: 13,
      source: { cell: '0f4b5d0d-c451-4af3-8131-3fa1e559e877' },
      target: { cell: 'c1518cd8-b812-4cf8-8f66-0033a9402f53' },
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: 'f2cfee62-162a-4ef4-8429-14e461a9465d',
      data: { ignoreHistory: true, isRoute: true, $_type: 'path' },
      zIndex: 15,
      source: { cell: 'c1518cd8-b812-4cf8-8f66-0033a9402f53' },
      target: { cell: '0f4b5d0d-c451-4af3-8131-3fa1e559e877' },
    },
    {
      position: { x: 590, y: 290 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '6ff510c4-a5b1-4b2a-90f0-0e692f8258d3',
      data: {
        parentId: 'a6999f64-1b53-4f81-9b6f-c75897e98e79',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
      },
      zIndex: 16,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: 'af58cd40-fb8c-46b7-863d-813e00fdb335',
      data: { ignoreHistory: true, isRoute: true, $_type: 'path' },
      zIndex: 17,
      source: { cell: 'a6999f64-1b53-4f81-9b6f-c75897e98e79' },
      target: { cell: '6ff510c4-a5b1-4b2a-90f0-0e692f8258d3' },
    },
    {
      position: { x: 600, y: 520 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '87a2c5e6-2f07-43a8-9e75-57b99b5b1721',
      data: {
        parentId: '6ff510c4-a5b1-4b2a-90f0-0e692f8258d3',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
        isLeaf: true,
      },
      zIndex: 19,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: 'f064075b-60c5-4216-a8cb-179b9a573620',
      data: { ignoreHistory: true, isDraw: true, $_type: 'path' },
      zIndex: 20,
      source: { cell: '6ff510c4-a5b1-4b2a-90f0-0e692f8258d3' },
      target: { cell: '87a2c5e6-2f07-43a8-9e75-57b99b5b1721' },
    },
    {
      position: { x: 870, y: 290 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '293c5e33-be76-4935-8fb3-3cddf06d45fe',
      data: {
        parentId: '4de3e0f9-64e3-4237-99bf-0034a197c04f',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
      },
      zIndex: 21,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: 'ade974e6-9bea-42bd-80b5-c152916bf1bf',
      data: { ignoreHistory: true, isRoute: true, $_type: 'path' },
      zIndex: 23,
      source: { cell: '293c5e33-be76-4935-8fb3-3cddf06d45fe' },
      target: { cell: 'c1518cd8-b812-4cf8-8f66-0033a9402f53' },
    },
    {
      position: { x: 860, y: 560 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '42a06d99-69ef-4383-bd3e-48cc5ef2b5a6',
      data: {
        parentId: '293c5e33-be76-4935-8fb3-3cddf06d45fe',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
        isLeaf: true,
      },
      zIndex: 24,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: 'ca6655b7-3003-4fa4-ab80-20324b719a7c',
      data: { ignoreHistory: true, isDraw: true, $_type: 'path' },
      zIndex: 25,
      source: { cell: '293c5e33-be76-4935-8fb3-3cddf06d45fe' },
      target: { cell: '42a06d99-69ef-4383-bd3e-48cc5ef2b5a6' },
    },
    {
      position: { x: 720, y: 290 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '4de3e0f9-64e3-4237-99bf-0034a197c04f',
      data: {
        parentId: '6ff510c4-a5b1-4b2a-90f0-0e692f8258d3',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
      },
      zIndex: 26,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: 'b123a18d-2525-4b00-be40-5c05c33ab6ef',
      data: { ignoreHistory: true, isRoute: true, $_type: 'path' },
      zIndex: 27,
      source: { cell: '6ff510c4-a5b1-4b2a-90f0-0e692f8258d3' },
      target: { cell: '4de3e0f9-64e3-4237-99bf-0034a197c04f' },
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: '8b8e9fe3-2d84-4cbc-bfc1-54564a92a7cf',
      data: { ignoreHistory: true, isRoute: true, $_type: 'path' },
      zIndex: 28,
      source: { cell: '4de3e0f9-64e3-4237-99bf-0034a197c04f' },
      target: { cell: '293c5e33-be76-4935-8fb3-3cddf06d45fe' },
    },
    {
      position: { x: 720, y: 150 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '92aebbeb-6a49-4e90-9cf1-5b47a2f8e80f',
      data: {
        parentId: '13bc1f08-f5e7-41c9-a118-1c42af44f7b0',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
        isLeaf: true,
      },
      zIndex: 29,
    },
    {
      position: { x: 730, y: 250 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '62039d1c-c69c-4b8c-a68d-36518cb83e96',
      data: {
        parentId: '4de3e0f9-64e3-4237-99bf-0034a197c04f',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
      },
      zIndex: 31,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: '2d6c556b-e839-412d-8ced-2369bd5cda17',
      data: { ignoreHistory: true, isRoute: true, $_type: 'path' },
      zIndex: 32,
      source: { cell: '4de3e0f9-64e3-4237-99bf-0034a197c04f' },
      target: { cell: '62039d1c-c69c-4b8c-a68d-36518cb83e96' },
    },
    {
      position: { x: 1030, y: 250 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '7cf7e31d-1cdc-4461-a2a7-cb965bfc5438',
      data: {
        parentId: '62039d1c-c69c-4b8c-a68d-36518cb83e96',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
        isLeaf: true,
      },
      zIndex: 34,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: 'ca1b3105-81d2-41f8-9c04-6bcbdd8547c9',
      data: { ignoreHistory: true, isDraw: true, $_type: 'path' },
      zIndex: 35,
      source: { cell: '62039d1c-c69c-4b8c-a68d-36518cb83e96' },
      target: { cell: '7cf7e31d-1cdc-4461-a2a7-cb965bfc5438' },
    },
    {
      position: { x: 730, y: 180 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: '13bc1f08-f5e7-41c9-a118-1c42af44f7b0',
      data: {
        parentId: '62039d1c-c69c-4b8c-a68d-36518cb83e96',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
      },
      zIndex: 36,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: '8251a110-094a-4114-930e-1149a8a118ad',
      data: { ignoreHistory: true, isRoute: true, $_type: 'path' },
      zIndex: 37,
      source: { cell: '62039d1c-c69c-4b8c-a68d-36518cb83e96' },
      target: { cell: '13bc1f08-f5e7-41c9-a118-1c42af44f7b0' },
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: 'e4bfb43b-6ab2-41dc-8187-f13206234ca1',
      data: { ignoreHistory: true, isRoute: true, $_type: 'path' },
      zIndex: 38,
      source: { cell: '13bc1f08-f5e7-41c9-a118-1c42af44f7b0' },
      target: { cell: '92aebbeb-6a49-4e90-9cf1-5b47a2f8e80f' },
    },
    {
      position: { x: 430, y: 170 },
      size: { width: 10, height: 10 },
      visible: true,
      shape: 'circle',
      id: 'f6093bc9-38b4-45e5-b436-f310c9daf84e',
      data: {
        parentId: '13bc1f08-f5e7-41c9-a118-1c42af44f7b0',
        ignoreHistory: true,
        isDrawNode: true,
        isRoueNode: true,
        $_type: 'path',
        isLeaf: true,
      },
      zIndex: 39,
    },
    {
      shape: 'edge',
      attrs: { line: { stroke: '#5ADA10', targetMarker: false, sourceMarker: false } },
      id: '5e869bc5-a64a-453e-a678-3e2441d7c701',
      data: { ignoreHistory: true, isDraw: true, $_type: 'path' },
      zIndex: 40,
      source: { cell: '13bc1f08-f5e7-41c9-a118-1c42af44f7b0' },
      target: { cell: 'f6093bc9-38b4-45e5-b436-f310c9daf84e' },
    },
    {
      position: { x: 605, y: 485 },
      size: { width: 30, height: 30 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/start.png',
        $_type: 'start-point',
        $_name: '起点1',
        $_isStart: false,
      },
      visible: true,
      id: 'f6d92b1b-55a2-4600-bfc1-10762e46a9b7',
      zIndex: 41,
    },
    {
      position: { x: 855, y: 525 },
      size: { width: 30, height: 30 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/start.png',
        $_type: 'start-point',
        $_name: '起点3',
        $_isStart: false,
      },
      visible: true,
      id: 'f79ebf55-983d-42b3-93f0-f537a2b826b6',
      zIndex: 42,
    },
    {
      position: { x: 715, y: 195 },
      size: { width: 30, height: 30 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/start.png',
        $_type: 'start-point',
        $_name: '起点2',
        $_isStart: false,
      },
      visible: false,
      id: '05d46a64-2c20-46b1-9e49-8116b8a29c7d',
      zIndex: 43,
    },
    {
      position: { x: 620, y: 390 },
      size: { width: 191, height: 121 },
      attrs: {
        body: { refPoints: '810,400 620,390 730,510 730,510', fill: '#C51515', strokeWidth: 1, stroke: '#C51515' },
      },
      visible: true,
      shape: 'polyline',
      id: 'e6867588-7280-40c9-9dfb-c0b29b819f14',
      data: { isRouteObstacle: true, $_type: 'barrier' },
      zIndex: 44,
    },
    {
      position: { x: 400, y: 120 },
      size: { width: 1, height: 1 },
      attrs: { body: { stroke: 'rgba(255, 0, 0, 0)', strokeWidth: 1 } },
      visible: true,
      shape: 'rect',
      id: 'center_helper_1',
      data: { $_type: 'center_helper' },
      zIndex: 45,
    },
    {
      position: { x: 1110, y: 620 },
      size: { width: 1, height: 1 },
      attrs: { body: { stroke: 'rgba(255, 0, 0, 0)', strokeWidth: 1 } },
      visible: true,
      shape: 'rect',
      id: 'center_helper_2',
      data: { $_type: 'center_helper' },
      zIndex: 46,
    },
    {
      position: { x: 570, y: 200 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/business/t1719634626319564802/停车场管理备份20231108-185134oQQaaGnDc3HHaKiozI3g6uOP01AMOhQ4Ne-U9CDsEb.png',
        id: '1722461117709496320',
        icons: {
          id: '1722205231617839106',
          type: 2,
          typeName: '自定义',
          selectableIcon:
            'https://test29.rd.chn-das.com/oss/business/t1719634626319564802/停车场管理备份20231108-185134oQQaaGnDc3HHaKiozI3g6uOP01AMOhQ4Ne-U9CDsEb.png',
          selectedIcon:
            'https://test29.rd.chn-das.com/oss/business/t1719634626319564802/停车场管理备份20231108-185136jMU-5Ap7hvLimCbBQb1rem0XUwP2T58XyLbjf1tZSi.png',
          nonSelectableIcon:
            'https://test29.rd.chn-das.com/oss/business/t1719634626319564802/停车场管理备份20231108-185138n0WAecpqxz39v4TkLDmMJ73LwOX0JF6qdWWp-eaWYP.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1722461117709496320',
      zIndex: 47,
    },
    {
      position: { x: 820, y: 181 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1724715305503092736',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1724715305503092736',
      zIndex: 48,
    },
    {
      position: { x: 937, y: 426 },
      size: { width: 50, height: 50 },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1724715305305960448',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'https://test29.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1724715305305960448',
      zIndex: 49,
    },
  ],
  backgroundConfig: {
    position: { x: 400, y: 120 },
    size: { width: 710, height: 500 },
    image:
      'https://test29.rd.chn-das.com/oss/business/t1719634626319564802/170044809999520231120-104139zfahImLXyNVCIv5_oZ-AXHf4QAqzoFTyVX55hA_eRs.jpg',
  },
  container: { width: 1124, height: 688 },
  // obstacles: [{ x: 620, y: 390, width: 191, height: 121 }],
  size: { width: 1349, heght: 1349 },
  customData: {},
}

export const routes = {
  routeLength: 917.1242396993791,
  route: [
    {
      x: 405,
      y: 55,
    },
    {
      x: 380,
      y: 100,
    },
    {
      x: 480,
      y: 150,
    },
    {
      x: 510,
      y: 290,
    },
    {
      x: 385,
      y: 680,
    },
  ],
  sourceData: {
    perpendicularLength: 25,
    perpendicularPoint: {
      x: 1250,
      y: 200,
    },
  },
  targetData: {
    perpendicularLength: 710.2816342831906,
    perpendicularPoint: {
      x: 1080,
      y: 230,
    },
  },
}

export const json3 = {
  cells: [
    {
      position: {
        x: 120,
        y: 220,
      },
      size: {
        width: 50,
        height: 50,
      },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'http://test233.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1749696828369600512',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'http://test233.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'http://test233.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'http://test233.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1749696828369600512',
      zIndex: 0,
    },
    {
      position: {
        x: 340,
        y: 370,
      },
      size: {
        width: 50,
        height: 50,
      },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'http://test233.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
        id: '1749696893565861888',
        icons: {
          id: '1703680757927268311',
          type: 1,
          typeName: '系统',
          selectableIcon: 'http://test233.rd.chn-das.com/oss/resource/workspace/circle/selectable.png',
          selectedIcon: 'http://test233.rd.chn-das.com/oss/resource/workspace/circle/selected.png',
          nonSelectableIcon: 'http://test233.rd.chn-das.com/oss/resource/workspace/circle/nonSelectable.png',
        },
        $_type: 'work',
      },
      visible: true,
      id: '1749696893565861888',
      zIndex: 1,
    },
    {
      position: {
        x: 480,
        y: 150,
      },
      size: {
        width: 10,
        height: 10,
      },
      visible: true,
      shape: 'circle',
      id: 'f99d78a8-eb2b-4e45-afb0-54391956ed61',
      data: {
        isRoueNode: true,
        $_type: 'path',
        isDrawNode: true,
        drawingIndex: 2,
        drawingGroupId: 'draw-grop-1705995259707',
      },
      zIndex: 5,
    },
    {
      shape: 'edge',
      attrs: {
        line: {
          stroke: '#1BA854',
          targetMarker: false,
          sourceMarker: false,
        },
      },
      id: 'b6ae07cc-da9e-4c89-bfde-66b503a37bd7',
      data: {
        isRoueEdge: true,
        $_type: 'path',
        isDraw: true,
        drawingIndex: 1,
        drawingGroupId: 'draw-grop-1705995259707',
      },
      source: {
        cell: 'c61750a6-df56-4ffb-8d65-a7fa57392543',
      },
      target: {
        cell: 'ee879e3d-046a-47f7-8515-f8cd86112c60',
      },
      zIndex: 5,
    },
    {
      position: {
        x: 180,
        y: 210,
      },
      size: {
        width: 10,
        height: 10,
      },
      visible: true,
      shape: 'circle',
      id: 'c61750a6-df56-4ffb-8d65-a7fa57392543',
      data: {
        isRoueNode: true,
        $_type: 'path',
        isDrawNode: true,
        drawingIndex: 0,
        drawingGroupId: 'draw-grop-1705995259707',
      },
      zIndex: 5,
    },
    {
      position: {
        x: 380,
        y: 100,
      },
      size: {
        width: 10,
        height: 10,
      },
      visible: true,
      shape: 'circle',
      id: 'ee879e3d-046a-47f7-8515-f8cd86112c60',
      data: {
        isRoueNode: true,
        $_type: 'path',
        isDrawNode: true,
        drawingIndex: 1,
        drawingGroupId: 'draw-grop-1705995259707',
      },
      zIndex: 5,
    },
    {
      shape: 'edge',
      attrs: {
        line: {
          stroke: '#1BA854',
          targetMarker: false,
          sourceMarker: false,
        },
      },
      id: '5e51f402-3203-46ee-b29a-603368744843',
      data: {
        isRoueEdge: true,
        $_type: 'path',
        isDraw: true,
        drawingIndex: 2,
        drawingGroupId: 'draw-grop-1705995259707',
      },
      source: {
        cell: 'ee879e3d-046a-47f7-8515-f8cd86112c60',
      },
      target: {
        cell: 'f99d78a8-eb2b-4e45-afb0-54391956ed61',
      },
      zIndex: 5,
    },
    {
      position: {
        x: 510,
        y: 290,
      },
      size: {
        width: 10,
        height: 10,
      },
      visible: true,
      shape: 'circle',
      id: '82840e0f-5358-4a3a-ae12-2b29bea08263',
      data: {
        isRoueNode: true,
        $_type: 'path',
        isDrawNode: true,
        drawingIndex: 3,
        drawingGroupId: 'draw-grop-1705995259707',
      },
      zIndex: 5,
    },
    {
      shape: 'edge',
      attrs: {
        line: {
          stroke: '#1BA854',
          targetMarker: false,
          sourceMarker: false,
        },
      },
      id: '57f455f1-5875-4ff8-bfe5-08bfe996bc3a',
      data: {
        isRoueEdge: true,
        $_type: 'path',
        isDraw: true,
        drawingIndex: 3,
        drawingGroupId: 'draw-grop-1705995259707',
      },
      source: {
        cell: 'f99d78a8-eb2b-4e45-afb0-54391956ed61',
      },
      target: {
        cell: '82840e0f-5358-4a3a-ae12-2b29bea08263',
      },
      zIndex: 6,
    },
    {
      position: {
        x: 240,
        y: 280,
      },
      size: {
        width: 111,
        height: 51,
      },
      attrs: {
        body: {
          refPoints: '240,290 350,280 270,330',
          fill: '#D9D9D9',
          strokeWidth: 1,
          stroke: '#D9D9D9',
        },
      },
      visible: true,
      shape: 'polyline',
      id: 'cea65764-da88-47ec-a734-25a0cd07df38',
      data: {
        isRouteObstacle: true,
        $_type: 'barrier',
        drawingGroupId: 'draw-grop-1705995268841',
      },
      zIndex: 9,
    },
    {
      position: {
        x: 395,
        y: 25,
      },
      size: {
        width: 30,
        height: 30,
      },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'http://test233.rd.chn-das.com/oss/resource/workspace/start.png',
        $_type: 'start-point',
        $_name: '起点（1）',
        $_isStart: false,
      },
      visible: true,
      id: '82e0fa90-a078-4f75-bd47-17fa9afb8f9e',
      zIndex: 10,
    },
    {
      position: {
        x: 465,
        y: 500,
      },
      size: {
        width: 30,
        height: 30,
      },
      view: 'html-view',
      shape: '$backgroundImage',
      data: {
        shape: '$backgroundImage',
        url: 'http://test233.rd.chn-das.com/oss/resource/workspace/start.png',
        $_type: 'start-point',
        $_name: '起点（2）',
        $_isStart: false,
      },
      visible: true,
      id: 'a50acefb-95b0-4940-b7fb-971836b2726e',
      zIndex: 11,
    },
  ],
  backgroundConfig: {
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 810,
      height: 540,
    },
    image:
      'http://test233.rd.chn-das.com/oss/business/taiot/yezi120240123-153414sNpbYpemsoMbo1iGKLUioyOvNPabY5CA5CIl-qii3i.jpg',
  },
  // 可以fromjson的时候将route一并传入，就无需再额外调用画路线的方法了
  $routes: {
    routesColor: 'pink',
    route: [
      {
        x: 405,
        y: 55,
      },
      {
        x: 380,
        y: 100,
      },
      {
        x: 480,
        y: 150,
      },
      {
        x: 510,
        y: 290,
      },
      {
        x: 385,
        y: 380,
      },
    ],
  },
}
