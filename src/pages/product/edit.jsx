import {
  Form,
  Button,
  Col,
  Row,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import React, { Component } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  getProductsTypeList,
  addProductsList,
  updateProductsList,
  reqCategory,
} from "@/api";
import "./index.less";
const { Item } = Form;
// 首页
export default class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      typeList: [],
      pId: undefined,
    };
  }
  componentDidMount() {
    this.getProductsTypeList();
  }
  getProductsTypeList = async () => {
    const res = await getProductsTypeList({ parentId: "0" });
    this.setState({
      typeList: res.data,
    });
  };
  submit = async () => {
    const { pId } = this.state;
    const record = this.props.router.location.state;
    const data = await this.formRef.current.validateFields();
    if (record?._id) {
      const res = await updateProductsList({
        ...record,
        ...data,
        pCategoryId: pId,
      });
      if (res.status == 0) {
        message.success("修改成功");
        this.props.router.navigate("/pro/product");
      }
    } else {
      const res = await addProductsList({ ...data, pCategoryId: pId });
      if (res.status == 0) {
        message.success("添加成功");
        this.props.router.navigate("/pro/product");
      }
    }
  };
  setPId = async () => {
    const categoryId = this.formRef.current.getFieldValue("categoryId");
    const res = await reqCategory({ categoryId });
    if (res.status == 0) {
      this.setState({
        pId: res.data.parentId,
      });
    }
  };
  render() {
    const { typeList } = this.state;
    const record = this.props.router.location.state || {};
    return (
      <div className="box">
        <div className="title">
          <ArrowLeftOutlined
            style={{ color: "#1DA57A", fontSize: "20px" }}
            onClick={() => {
              this.props.router.navigate("/pro/product");
            }}
          />
          <span>{record._id ? "编辑商品" : "新增商品"}</span>
        </div>
        <Form ref={this.formRef} onFinish={this.submit}>
          <Row gutter={32}>
            <Col span={12}>
              <Item
                name="name"
                label="商品名称"
                initialValue={record.name}
                rules={[{ required: true }]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="desc"
                label="商品描述"
                initialValue={record.desc}
                rules={[{ required: true }]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="price"
                label="商品价格"
                initialValue={record.price}
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} addonAfter="元" />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                name="categoryId"
                label="商品分类"
                initialValue={record.categoryId}
                rules={[{ required: true }]}
              >
                <Select onSelect={this.setPId}>
                  {typeList.map((item) => {
                    return (
                      <Select.Option key={item._id} value={item._id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} align="right">
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
