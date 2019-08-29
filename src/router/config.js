import { AuthLayout, DefaultLayout } from "@/components/layouts"

export const publicRoute = [
  { path: "*", component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue") },
  {
    path: "/auth",
    component: AuthLayout,
    meta: { title: "Login" },
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: "Login" },
        component: () => import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue")
      }
    ]
  },

  {
    path: "/404",
    name: "404",
    meta: { title: "Not Found" },
    component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "500",
    meta: { title: "Server Error" },
    component: () => import(/* webpackChunkName: "errors-500" */ "@/views/error/Error.vue")
  }
]

export const protectedRoute = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { title: "主页", group: "apps", icon: "" },
    redirect: "/auth",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: { title: "主页", group: "apps", icon: "dashboard", needlogin: true },
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
      },

      {
        path: "/403",
        name: "Forbidden",
        meta: { title: "Access Denied", hiddenInMenu: true },
        component: () => import(/* webpackChunkName: "error-403" */ "@/views/error/Deny.vue")
      }
    ]
  },

  //list
  {
    path: "/Article",
    component: DefaultLayout,
    name: "Article",
    redirect: "/Article/Admin",
    meta: { title: "文章管理", icon: "view_compact", group: "editor" },
    children: [
      {
        path: "/Article/Admin",
        name: "ArticleAdmin",
        meta: { title: "文章管理" },
        component: () => import(/* webpackChunkName: "table" */ "@/views/Article.vue")
      },
      {
        path: "/Article/:id",
        name: "ArticleEditor",
        meta: { title: "文章编辑" },
        component: () => import(/* webpackChunkName: "table" */ "@/views/ArticleEditor.vue")
      }
    ]
  },
  {
    path: "/Lantern",
    name: "Lantern",
    component: DefaultLayout,
    meta: { title: "轮播图", icon: "widgets", group: "advance" },
    redirect: "/Lantern/Admin",
    children: [
      {
        path: "/Lantern/Admin",
        name: "LanternAdmin",
        meta: { title: "轮播图管理" },
        component: () => import(/* webpackChunkName: "chart-widget" */ "@/views/Lantern.vue")
      }
    ]
  },
  {
    path: "/User",
    name: "User",
    component: DefaultLayout,
    meta: { title: "用户中心", icon: "widgets", group: "advance" },
    redirect: "/User/Admin",
    children: [
      {
        path: "/User/Admin",
        name: "UserAdmin",
        meta: { title: "用户管理" },
        component: () => import(/* webpackChunkName: "table" */ "@/views/User.vue")
      },
      {
        path: "/User/:id",
        name: "UserEditor",
        meta: { title: "用户编辑" },
        component: () => import(/* webpackChunkName: "table" */ "@/views/ArticleEditor.vue")
      }
    ]
  },
  {
    path: "/Comment",
    name: "Comment",
    component: DefaultLayout,
    meta: { title: "评论", icon: "widgets", group: "advance" },
    redirect: "/Comment/Admin",
    children: [
      {
        path: "/Comment/Admin",
        name: "CommentAdmin",
        meta: { title: "评论管理" },
        component: () => import(/* webpackChunkName: "chart-widget" */ "@/views/Comment.vue")
      }
    ]
  },
  //widgets
  {
    path: "/widgets",
    component: DefaultLayout,
    meta: { title: "统计", icon: "widgets", group: "advance" },
    redirect: "/widgets/chart",
    children: [
      {
        path: "/widgets/chart",
        name: "ChartWidget",
        meta: { title: "图表" },
        component: () => import(/* webpackChunkName: "chart-widget" */ "@/views/widgets/Chart.vue")
      }
    ]
  },

  //media
  {
    path: "/Media",
    meta: { title: "Media", group: "media", icon: "media" },
    name: "Media",
    component: DefaultLayout,
    redirect: "/Media/photo",
    children: [
      {
        path: "/Media/Images",
        name: "MediaImages",
        meta: { title: "图片管理" },
        component: () => import(/* webpackChunkName: "chart-widget" */ "@/views/Images.vue")
      },
      {
        path: "/Media/PPT",
        name: "MediaPPT",
        meta: { title: "PPT 管理" },
        component: () => import(/* webpackChunkName: "list-widget" */ "@/views/PPT.vue")
      }
    ]
  },

  {
    path: "/ClassRoom",
    name: "ClassRoom",
    component: DefaultLayout,
    redirect: "/ClassRoom/Admin",
    meta: { title: "班级" },
    children: [
      {
        path: "/ClassRoom/Admin",
        name: "ClassRoomAdmin",
        meta: { title: "班级管理" },
        component: () => import(/* webpackChunkName: "chart-widget" */ "@/views/ClassRoom.vue")
      }
    ]
  }
]
