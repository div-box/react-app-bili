import Dashboards from "@/pages/dashboards";
import Category from "@/pages/category";
import Product from "@/pages/product";
import Role from "@/pages/role";
import User from "@/pages/user";
import Pie from "@/pages/charts/pie";
import Bar from "@/pages/charts/bar";
import Line from "@/pages/charts/line";
import ProductHome from "@/pages/product/home";
import ProductEdit from "@/pages/product/edit";
import ProductDetail from "@/pages/product/detail";
import NoFoundPage from "./404";
export const routes = [
  {
    name: "首页",
    path: "/",
    icon: "icon-shouye",
    component: Dashboards,
  },
  {
    name: "商品",
    icon: "icon-xitongguanli",
    path: "/pro",
    routes: [
      {
        name: "分类管理",
        path: "/pro/category",
        icon: "icon-xitongguanli",
        component: Category,
      },
      {
        name: "商品管理",
        path: "/pro/product",
        icon: "icon-xitongguanli",
        component: Product,
        isLeaf: true,
        routes: [
          {
            name: "商品首页",
            path: "/pro/product",
            icon: "icon-xiangmuguanli",
            component: ProductHome,
            hideInMenu: true,
          },
          {
            name: "编辑商品",
            path: "/pro/product/edit",
            icon: "icon-xiangmuguanli",
            component: ProductEdit,
            hideInMenu: true,
          },
          {
            name: "商品详情",
            path: "/pro/product/detail",
            icon: "icon-xiangmuguanli",
            component: ProductDetail,
            hideInMenu: true,
          },
        ],
      },
    ],
  },
  {
    name: "用户管理",
    path: "/user",
    icon: "icon-biaoqianguanli",
    component: User,
  },
  {
    name: "角色管理",
    path: "/role",
    icon: "icon-xiangmuguanli",
    component: Role,
  },
  {
    name: "可视化",
    icon: "icon-tongjibaobiao",
    path: "/charts",
    routes: [
      {
        name: "柱状图",
        path: "/charts/bar",
        icon: "icon-tongjibaobiao",
        component: Bar,
      },
      {
        name: "线形图",
        path: "/charts/line",
        icon: "icon-tongjibaobiao",
        component: Line,
      },
      {
        name: "饼图",
        path: "/charts/pie",
        icon: "icon-tongjibaobiao",
        component: Pie,
      },
    ],
  },
  {
    name: 404,
    icon: "icon-tongjibaobiao",
    path: "/*",
    component: NoFoundPage,
    hideInMenu: true,
  },
];
