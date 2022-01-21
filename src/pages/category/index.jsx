import React, { Component } from "react";
import { Card, Table, Button, message } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  getProductsTypeList,
  addProductsTypeList,
  updateProductsTypeList,
} from "@/api";
import FormModal from "./form";
// import "./index.less";
// 首页
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isAddModal: false,
      modalTitle: "新增",
      currentItem: {},
      loading: false,
      currentId: undefined,
      currentName: undefined,
      selectList: [],
    };
  }
  componentDidMount() {
    this.getDataList();
  }
  getDataList = async (id = "0") => {
    this.setState({ loading: true });
    const res = await getProductsTypeList({ parentId: id });
    this.setState({
      dataSource: res.data,
      loading: false,
    });
  };
  add = async () => {
    const res = await getProductsTypeList({ parentId: "0" });
    this.setState({
      isAddModal: true,
      modalTitle: "新增",
      currentItem: {},
      selectList: res.data,
    });
  };
  update = (record) => {
    this.setState({
      isAddModal: true,
      modalTitle: "修改",
      currentItem: record,
    });
  };
  handleSubmit = async (data) => {
    const { currentId } = this.state;
    if (data.categoryId) {
      const res = await updateProductsTypeList(data);
      if (res.status === 0) {
        message.success("修改成功");
        this.setState(
          {
            isAddModal: false,
            currentItem: {},
          },
          () => {
            this.getDataList(currentId);
          }
        );
      } else {
        message.error("修改失败");
      }
    } else {
      const res = await addProductsTypeList(data);
      if (res.status === 0) {
        message.success("添加成功");
        this.setState(
          {
            isAddModal: false,
            currentItem: {},
          },
          () => {
            if (
              data.parentId == currentId ||
              (data.parentId == "0" && !currentId)
            ) {
              this.getDataList(currentId);
            } else {
              console.log("不用刷新");
            }
          }
        );
      } else {
        message.error("添加失败");
      }
    }
  };
  handleCancel = () => {
    this.setState({
      isAddModal: false,
      currentItem: {},
    });
  };
  getSubList = (record) => {
    this.setState(
      {
        currentId: record._id,
        currentName: record.name,
      },
      () => {
        this.getDataList(record._id);
      }
    );
  };
  back = () => {
    this.setState(
      {
        currentId: undefined,
        currentName: undefined,
      },
      () => {
        this.getDataList();
      }
    );
  };
  render() {
    const {
      dataSource,
      isAddModal,
      modalTitle,
      currentItem,
      loading,
      currentId,
      currentName,
      selectList,
    } = this.state;
    const title = currentId ? (
      <>
        <Button type="link" onClick={this.back}>
          一级分类列表
        </Button>
        <ArrowRightOutlined style={{ marginRight: "15px" }} />
        {currentName}
      </>
    ) : (
      "一级分类列表"
    );
    const extra = (
      <Button type="primary" icon={<PlusOutlined />} onClick={this.add}>
        添加
      </Button>
    );

    const columns = [
      {
        title: "分类名称",
        dataIndex: "name",
        key: "name",
        align: "center",
      },
      {
        title: "操作",
        width: "300px",
        align: "center",
        render: (text, record) => {
          return (
            <>
              <Button type="link" onClick={() => this.update(record)}>
                修改分类
              </Button>
              {this.state.currentId ? null : (
                <Button type="link" onClick={() => this.getSubList(record)}>
                  查看子分类
                </Button>
              )}
            </>
          );
        },
      },
    ];
    return (
      <Card
        bordered={false}
        title={title}
        extra={extra}
        style={{ height: "100%" }}
      >
        <Table
          loading={loading}
          className="TKtables"
          dataSource={dataSource}
          columns={columns}
          bordered
          rowKey={(row) => row._id}
        ></Table>
        <FormModal
          title={modalTitle}
          visible={isAddModal}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          currentItem={currentItem}
          selectList={selectList}
          currentId={currentId}
        />
      </Card>
    );
  }
}
