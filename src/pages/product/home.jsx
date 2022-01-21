import React, { Component } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { getProductsList, changeStatus } from "@/api";
import {
  Card,
  Select,
  Input,
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  message,
} from "antd";
import "./index.less";
// 首页
export default class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
    this.state = {
      loading: false,
      pageNum: 1,
      pageSize: 10,
      typeList: [],
      total: 0,
    };
  }
  componentDidMount() {
    this.getDataList();
  }
  getDataList = async () => {
    const { pageNum, pageSize } = this.state;
    this.setState({ loading: true });
    const res = await getProductsList({ pageNum, pageSize });
    this.setState({
      dataSource: res.data?.list,
      total: res.data.total,
      pages: res.data.pages,
      loading: false,
    });
  };

  add = () => {
    this.props.router.navigate("edit");
  };
  edit = (record) => {
    this.props.router.navigate("edit", { state: record });
  };
  detail = (record) => {
    this.props.router.navigate("detail", { state: record });
  };
  changeStatus = (status, productId) => {
    changeStatus({ status, productId }).then((res) => {
      if (res.status == 0) {
        message.success("修改成功");
        this.getDataList();
      }
    });
  };
  pageChange = (page, pageSize) => {
    this.setState(
      {
        pageNum: page,
        pageSize: pageSize,
      },
      () => {
        this.getDataList();
      }
    );
  };
  render() {
    const { loading, dataSource, total, pageNum, pageSize } = this.state;
    const columns = [
      {
        title: "商品名称",
        dataIndex: "name",
        key: "name",
        align: "center",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
        key: "desc",
        align: "center",
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        align: "center",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        align: "center",
        width: "200px",
        render: (text, record) => {
          return text == 1 ? (
            <>
              <Button
                type="primary"
                onClick={() => {
                  this.changeStatus("2", record._id);
                }}
              >
                下架
              </Button>
              <Button type="text">在售</Button>
            </>
          ) : (
            <>
              <Button
                danger
                type="primary"
                onClick={() => {
                  this.changeStatus("1", record._id);
                }}
              >
                上架
              </Button>
              <Button type="text">缺货</Button>
            </>
          );
        },
      },
      {
        title: "操作",
        width: "150px",
        align: "center",
        render: (text, record) => {
          return (
            <>
              <Button type="link" onClick={() => this.detail(record)}>
                详情
              </Button>
              <Button type="link" onClick={() => this.edit(record)}>
                修改
              </Button>
            </>
          );
        },
      },
    ];
    return (
      <div className="box">
        <Form ref={this.searchRef}>
          <Row gutter={32}>
            <Col span={3}>
              <Form.Item name="searchType" initialValue={1}>
                <Select>
                  <Select.Option value={1}>按名称搜索</Select.Option>
                  <Select.Option value={2}>按描述搜索</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item name="keyword">
                <Input placeholder="关键字" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button type="primary">搜索</Button>
            </Col>
            <Col span={14} align="right">
              <Button type="primary" icon={<PlusOutlined />} onClick={this.add}>
                添加商品
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          loading={loading}
          className="TKtables"
          dataSource={dataSource}
          columns={columns}
          bordered
          rowKey={(row) => row?._id}
          pagination={{
            onChange: this.pageChange,
            current: pageNum,
            pageSize,
            total,
            showTotal: (total) => `共 ${total} 条`,
          }}
        ></Table>
      </div>
    );
  }
}
