const Menu = [
  { header: "应用" },
  {
    title: "仪表盘",
    group: "应用",
    icon: "dashboard",
    name: "Dashboard"
  },
  {
    title: "文章",
    group: "应用",
    icon: "insert_drive_file",
    name: "Article"
  },
  {
    title: "轮播图",
    group: "应用",
    name: "Lantern",
    // target: "_self",
    icon: "email"
  },
  {
    title: "用户",
    group: "应用",
    name: "User",
    // target: "_self",
    icon: "fa fas far fa-user"
  },
  {
    title: "评论",
    group: "应用",
    name: "Comment",
    // target: "_self",
    icon: "fa fas fa-comments"
  },
  {
    title: "统计",
    group: "widgets",
    component: "widgets",
    icon: "widgets",
    items: [
      { name: "图标", title: "图表", component: "ChartWidget" ,icon: "chart" },
    ]
  },
  { header: "媒体" },
  {
    title: "媒体资源管理",
    group: "媒体",
    icon: "view_compact",
    component: "Media",
    name: "Media",
    items: [
      { name: "MediaImages", title: "Images 管理", component: "MediaImages" },
      {
        name: "MediaPPT",
        title: "PPT管理",
        component: "MediaPPT"
      }
    ]
  },
  {
    title: "拓展",
    group: "ext",
    component: "forms",
    icon: "edit",
    items: [{ name: "basic", title: "班级圈", component: "ClassRoomAdmin" }]
  },
  { divider: true }
]
// reorder menu
Menu.forEach(item => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase()
      let textB = y.title.toUpperCase()
      return textA < textB ? -1 : textA > textB ? 1 : 0
    })
  }
})

export default Menu
