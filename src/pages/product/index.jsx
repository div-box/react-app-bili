import React, { Component } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import ProductHome from "./home";
import ProductDetail from "./detail";
import ProductEdit from "./edit";
// import "./index.less";
// 首页
export default class Product extends Component {
  render() {
    return (
      <>
        <Outlet />
      </>
    );
  }
}
