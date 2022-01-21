import React, { Component } from "react";
import { Menu } from "antd";
import { withRouter } from "@/utils";
import { Link } from "react-router-dom";
import "./index.less";
import logo from "@/assets/images/logo.png";
import { routes } from "@/router";

const { SubMenu } = Menu;

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
    };
  }

  componentDidMount() {
    const rootSubmenu = routes.filter((item) => item.routes);
    const rootSubmenuKeys = rootSubmenu.map((item) => item.path);
    //默认展开
    const openKeys = this.props.router.location.pathname
      .split("/")
      .filter((item) => item)
      .map((item) => `/${item}`);
    const optionArr = [...openKeys];
    let openArr = [];
    for (let i = 0; i < openKeys.length; i++) {
      optionArr.pop();
      let str = optionArr.join("");
      openArr.push(str);
    }
    this.setState({
      rootSubmenuKeys,
      openKeys: openArr.filter((item) => item),
    });
  }
  setSelectKeys = (path) => {
    const openKeys = path
      .split("/")
      .filter((item) => item)
      .map((item) => `/${item}`);
    const optionArr = [...openKeys];
    let openArr = [];
    for (let i = 0; i < openKeys.length; i++) {
      optionArr.pop();
      let str = optionArr.join("");
      openArr.push(str);
    }
    openArr.push(path);
    return openArr;
  };
  onOpenChange = (keys) => {
    const { openKeys, rootSubmenuKeys } = this.state;
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: keys,
      });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  renderMenu = (menuList) => {
    return menuList.map((item, index) => {
      if (!item.routes || item.component) {
        return (
          !item.hideInMenu && (
            <Menu.Item key={item.path}>
              <Link to={item.path}>
                {item.icon ? (
                  <svg className="icon" aria-hidden="true">
                    <use href={`#${item.icon}`}></use>
                  </svg>
                ) : null}
                {item.name}
              </Link>
            </Menu.Item>
          )
        );
      } else {
        return (
          <SubMenu
            key={item.path}
            title={
              <div>
                <svg className="icon" aria-hidden="true">
                  <use href={`#${item.icon}`}></use>
                </svg>
                <span>{item.name}</span>
              </div>
            }
          >
            {this.renderMenu(item.routes)}
          </SubMenu>
        );
      }
    });
  };

  render() {
    const { openKeys } = this.state;
    return (
      <div className="leftMenu">
        <div className="logo">
          <Link to="/" className="left-menu-header">
            <img
              src={logo}
              style={{ width: "40px", height: "40px" }}
              alt="React后台"
            />
            <h1>React后台</h1>
          </Link>
        </div>
        <div className="menuList">
          <Menu
            mode="inline"
            theme="dark"
            className="menuList"
            // defaultSelectedKeys={[
            //   this.props.router.location.pathname,
            //   ...openKeys,
            // ]}
            defaultSelectedKeys={() =>
              this.setSelectKeys(this.props.router.location.pathname)
            }
            openKeys={openKeys}
            onOpenChange={this.onOpenChange}
          >
            {this.renderMenu(routes)}
          </Menu>
        </div>
      </div>
    );
  }
}

export default withRouter(LeftMenu);
