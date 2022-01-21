import React, { Component } from "react";
import "./index.less";
import { getUser, removeUser } from "@/utils/storageUtils";
import logo from "@/assets/images/logo.png";
import { withRouter } from "@/utils";
import moment from "moment";
import {routes} from "@/router";
import { Popconfirm, Button } from "antd";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeData: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
  }
  componentDidMount() {
    // this.getWeather();
    this.getTime();
    this.getTitle();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.router !== this.props.router) {
      this.getTitle();
    }
  }
  getTime = () => {
    this.timer = setInterval(() => {
      this.setState({
        timeData: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
    }, 1000);
  };
  // getWeather = async () => {
  //   const { dayPictureUrl, weather } = await reqWeather("四川");
  //   this.setState(
  //     {
  //       dayPictureUrl,
  //       weather,
  //     },
  //     () => {
  //       console.log(dayPictureUrl, weather);
  //     }
  //   );
  // };
  getTitle = () => {
    const path = this.props.router.location.pathname;
    routes.forEach((item) => {
      if (item.path === path) {
        this.setState({
          currTitle: item.name,
        });
      } else if (item.routes) {
        const curr = item.routes.find((item) => item.path === path);
        if (curr) {
          this.setState({
            currTitle: curr.name,
          });
        }
      }
    });
  };
  logout = () => {
    removeUser();
    this.props.router.navigate("/login");
  };
  componentWillUnmount() {
    clearInterval(this.time);
  }
  render() {
    const { timeData } = this.state;
    const user = getUser();
    return (
      <header className="header">
        <div className="header-top">
          <span>欢迎，{user.username}</span>
          <Popconfirm title="确认退出吗?" onConfirm={this.logout}>
            <Button type="link">退出</Button>
          </Popconfirm>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{this.state.currTitle}</div>
          <div className="header-bottom-right">
            <span>{timeData}</span>
            <img src={logo} alt="" style={{ width: 20, height: 20 }} />
            <span>晴</span>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
