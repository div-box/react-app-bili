import Admin from "@/pages/admin"
import Home from "@/pages/home"
import Login from "@/pages/login"

const routes = [
  {
    name: "用户",
    path: "/",
    icon: "icon-shouye",
    component: Admin
  },
  {
    name: "首页",
    path: "/home",
    icon: "icon-shouye",
    component: Home
  },
  {
    name: "登录",
    path: "/login",
    icon: "icon-shouye",
    component: Login
  },

]

export default routes
