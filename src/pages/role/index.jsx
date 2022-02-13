import React, { Component } from "react";
import { Card, Button, Table } from "antd";
import { getRolesList, addRole, updateRole } from "@/api";
import AddModal from "./add";
import EditModal from "./edit";
import moment from "moment";
import Modal from "antd/lib/modal/Modal";
// import "./index.less";
// 首页
export default class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectKeys: [],
      dataSource: [],
      isAddModal: false,
      isEditModal: false,
      selectRow: {},
    };
  }

  componentDidMount() {
    this.getRolesList();
  }

  getRolesList = async () => {
    const res = await getRolesList();
    if (res.status === 0) {
      this.setState({
        dataSource: res.data,
      });
    }
  };

  onRow = (record, key) => {
    const { selectKeys } = this.state;
    return {
      // 多选
      // onClick: () => {
      //   if (selectKeys.includes(record._id)) {
      //     selectKeys.splice(
      //       selectKeys.findIndex((item) => item == record._id),
      //       1
      //     );
      //     this.setState({ selectKeys: [...selectKeys] });
      //   } else {
      //     this.setState({
      //       selectKeys: [...selectKeys, record._id],
      //     });
      //   }
      // },
      // 单选
      onClick: () => {
        if (selectKeys.includes(record._id)) {
          this.setState({ selectKeys: [], selectRow: {} });
        } else {
          this.setState({
            selectKeys: [record._id],
            selectRow: record,
          });
        }
      },
    };
  };

  handleSubmit = async (data) => {
    const res = await addRole(data);
    if (res.status === 0) {
      this.setState(
        {
          isAddModal: false,
        },
        () => {
          this.getRolesList();
        }
      );
    }
  };

  handleUpdate = async (data) => {
    const res = await updateRole(data);
    if (res.status === 0) {
      this.setState(
        {
          isEditModal: false,
          selectKeys: [],
        },
        () => {
          this.getRolesList();
        }
      );
    }
  };

  handleCancel = () => {
    this.setState({
      isAddModal: false,
    });
  };

  handleCancelUpdate = () => {
    this.setState({
      isEditModal: false,
    });
  };

  render() {
    const {
      selectKeys,
      loading,
      dataSource,
      isAddModal,
      isEditModal,
      selectRow,
    } = this.state;
    const title = (
      <span>
        <Button
          type="primary"
          style={{ marginRight: 15 }}
          onClick={() => {
            this.setState({
              isAddModal: true,
            });
          }}
        >
          创建角色
        </Button>
        <Button
          type="primary"
          disabled={!selectKeys.length}
          onClick={() => {
            this.setState({
              isEditModal: true,
            });
          }}
        >
          设置角色权限
        </Button>
      </span>
    );
    const columns = [
      {
        title: "角色名称",
        dataIndex: "name",
        key: "name",
        align: "center",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        align: "center",
        render: (text) => {
          return text ? moment(text).format("YYYY-MM-DD HH:mm") : "--";
        },
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        key: "auth_time",
        align: "center",
        render: (text) => {
          return text ? moment(text).format("YYYY-MM-DD HH:mm") : "--";
        },
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
        key: "auth_name",
        align: "center",
        render: (text) => {
          return text || "--";
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
          rowSelection={{
            type: "radio",
            selectedRowKeys: selectKeys,
            selections: true,
            onChange: (keys, row) => {
              this.setState({
                selectKeys: keys,
                selectRow: row,
              });
            },
          }}
          onRow={this.onRow}
        ></Table>
        <AddModal
          visible={isAddModal}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        />
        <EditModal
          visible={isEditModal}
          onOk={this.handleUpdate}
          onCancel={this.handleCancelUpdate}
          current={selectRow}
        />
      </Card>
    );
  }
}
