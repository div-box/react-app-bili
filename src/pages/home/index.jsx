import React, { Component } from "react";
import { getUser } from "@/utils/storageUtils";
import { Switch, Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from "./index.module.less";
import LeftMenu from "@/components/left-menu";
import Header from "@/components/header";

const { Footer, Sider, Content } = Layout;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // const user = getUser();
    // if (!user || !user.id) {
    //   this.props.router.navigate("/login");
    // }
    // console.log("user", user);
  }
  render() {
    return (
      <Layout style={{ height: "100%", width: "100%" }}>
        <Sider>
          <LeftMenu />
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ background: "#fff", margin: "25px 20px 0" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center", color: "#ccc" }}>
            推荐使用谷歌浏览器,可以获得更好的页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
