import React, { Component } from "react";
import { Card, Button, Table, Popconfirm, message } from "antd";
import { getUserList, addUser, updateUser, deleteUser } from "@/api";
import AddModal from "./add";
import moment from "moment";
// import "./index.less";
// 首页
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      modalTitle: "新增用户",
      roles: [],
      currentItem: {},
    };
    this.roleNames = {};
  }

  componentDidMount() {
    this.getUserList();
  }

  initRoleNames = (roles) => {
    const rolesNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    this.roleNames = rolesNames;
  };

  getUserList = async () => {
    const res = await getUserList();
    if (res.status === 0) {
      this.initRoleNames(res.data.roles);
      this.setState({
        dataSource: res.data.users,
        roles: res.data.roles,
      });
    }
  };

  handleSubmit = async (data) => {
    const { _id } = data;
    let res;
    if (_id) {
      res = await updateUser(data);
    } else {
      res = await addUser(data);
    }
    if (res.status === 0) {
      this.setState(
        {
          visible: false,
          currentItem: {},
        },
        () => {
          this.getUserList();
        }
      );
    }
  };

  update = (user) => {
    this.setState({
      visible: true,
      modalTitle: "修改用户",
      currentItem: user,
    });
  };

  delete = async (id) => {
    const res = await deleteUser({ userId: id });
    if (res.status === 0) {
      message.success("删除成功");
      this.getUserList();
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      currentItem: {},
    });
  };

  render() {
    const { loading, dataSource, visible, modalTitle, roles, currentItem } =
      this.state;
    const title = (
      <span>
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          onClick={() => {
            this.setState({
              visible: true,
            });
          }}
        >
          添加用户
        </Button>
      </span>
    );
    const columns = [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
        align: "center",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
        align: "center",
      },
      {
        title: "电话",
        dataIndex: "phone",
        key: "phone",
        align: "center",
      },
      {
        title: "注册时间",
        dataIndex: "create_time",
        key: "create_time",
        align: "center",
        render: (text) => {
          return text ? moment(text).format("YYYY-MM-DD HH:mm") : "--";
        },
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        key: "role_id",
        align: "center",
        // render: (text) => {
        //   const role = roles.find((item) => item._id == text);
        //   return role.name || "--";
        // },
        render: (text) => {
          return this.roleNames[text];
        },
      },
      {
        title: "操作",
        align: "center",
        width: 150,
        render: (user) => {
          return (
            <span>
              <Button type="link" onClick={() => this.update(user)}>
                修改
              </Button>
              <Popconfirm
                title="确认删除吗？"
                onConfirm={() => this.delete(user._id)}
              >
                <Button type="link">删除</Button>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
    return (
      <Card bordered={false} title={title} style={{ height: "100%" }}>
        <Table
          loading={loading}
          className="TKtables"
          dataSource={dataSource}
          columns={columns}
          bordered
          rowKey={(row) => row._id}
        ></Table>
        <AddModal
          title={modalTitle}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          roles={roles}
          currentItem={currentItem}
        />
      </Card>
    );
  }
}
