import React, { Component } from "react";
import { Card, Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./index.less";
// 首页
export default class Category extends Component {
  render() {
    const title = "一级分类列表";
    const extra = (
      <Button type="primary" icon={<PlusOutlined />}>
        添加
      </Button>
    );
    const dataSource = [
      {
        key: "1",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "2",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ];

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
              <Button type="link">修改分类</Button>
              <Button type="link">查看子分类</Button>
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
          dataSource={dataSource}
          columns={columns}
          bordered
          rowKey={(row) => {
            return row.key;
          }}
        ></Table>
      </Card>
    );
  }
}
