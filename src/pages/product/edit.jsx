import {
  Form,
  Button,
  Col,
  Row,
  Input,
  InputNumber,
  Select,
  message,
  Cascader,
  Upload,
} from "antd";
import React, { Component } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import RichTextEditor from "./richTextEditor";
import {
  getProductsTypeList,
  addProductsList,
  updateProductsList,
  reqCategory,
} from "@/api";
import PicUpload from "@/components/upload";

import "./index.less";
const { TextArea } = Input;
const { Item } = Form;
const validateNum = (rule, value, callback) => {
  if (value > 0) {
    callback();
  } else {
    callback("价格必须大于0");
  }
};
// 首页
export default class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.fileRef = React.createRef();
    this.richRef = React.createRef();
    this.state = {
      typeList: [],
      pId: undefined,
      fileList: [],
    };
  }
  componentDidMount() {
    const record = this.props.router.location.state;
    this.getProductsTypeList("0");
    this.setState({
      fileList: record?.imgs || [],
    });
  }
  getProductsTypeList = async (parentId) => {
    const res = await getProductsTypeList(parentId);
    this.setState(
      {
        typeList: res.data,
        options: res.data.map((item) => {
          return {
            value: item._id,
            label: item.name,
            isLeaf: item.parentId !== "0",
          };
        }),
      },
      () => {
        const record = this.props.router.location.state || {};
        const { pCategoryId, categoryId } = record;
        const xxx = this.state.options.find(
          (item) => item.value == pCategoryId
        );
        record._id && this.loadData([xxx]);
      }
    );
  };
  submit = async () => {
    const record = this.props.router.location.state;
    const data = await this.formRef.current.validateFields();
    const rich = await this.richRef.current.getRich();
    const { ids } = data;
    const [pCategoryId, categoryId] = ids;
    if (record?._id) {
      const res = await updateProductsList({
        ...record,
        ...data,
        categoryId: categoryId ? categoryId : pCategoryId,
        pCategoryId: categoryId ? pCategoryId : "0",
        imgs: data.imgs?.map((item) => {
          if (typeof item == "string") {
            return item;
          } else {
            return item.name;
          }
        }),
        detail: rich,
      });
      if (res.status == 0) {
        message.success("修改成功");
        this.props.router.navigate("/pro/product");
      }
    } else {
      const res = await addProductsList({
        ...data,
        categoryId: categoryId ? categoryId : pCategoryId,
        pCategoryId: categoryId ? pCategoryId : "0",
        imgs: data.imgs?.map((item) => {
          if (typeof item == "string") {
            return item;
          } else {
            return item.name;
          }
        }),
        detail: rich,
      });
      if (res.status == 0) {
        message.success("添加成功");
        this.props.router.navigate("/pro/product");
      }
    }
  };
  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
    const res = await getProductsTypeList({ parentId: targetOption.value });
    if (res.data?.length) {
      targetOption.loading = false;
      targetOption.children = res.data.map((item) => {
        return {
          value: item._id,
          label: item.name,
          isLeaf: item.parentId !== "0",
        };
      });
    } else {
      targetOption.loading = false;
      targetOption.isLeaf = true;
    }
    this.setState({
      options: [...this.state.options],
    });
  };
  initialIds = () => {
    const record = this.props.router.location.state || {};
    const { pCategoryId, categoryId } = record;
    let arr;
    if (pCategoryId === "0") {
      arr = [categoryId];
    } else {
      arr = [pCategoryId, categoryId];
    }
    return arr;
  };
  onChange = (fileList) => {
    this.setState({ fileList });
  };
  render() {
    const { typeList, options } = this.state;
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
            <Col span={14}>
              <Item
                name="name"
                label="商品名称"
                initialValue={record.name}
                rules={[{ required: true }]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={14}>
              <Item
                name="desc"
                label="商品描述"
                initialValue={record.desc}
                rules={[{ required: true }]}
              >
                <TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
              </Item>
            </Col>
            <Col span={14}>
              <Item
                name="price"
                label="商品价格"
                initialValue={record.price}
                rules={[
                  { required: true },
                  {
                    validator: validateNum,
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} addonAfter="元" />
              </Item>
            </Col>
            <Col span={14}>
              <Item
                name="ids"
                label="商品分类"
                initialValue={record._id ? this.initialIds() : undefined}
                rules={[{ required: true }]}
              >
                {/* <Select onSelect={this.setPId}>
                  {typeList.map((item) => {
                    return (
                      <Select.Option key={item._id} value={item._id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select> */}
                <Cascader
                  // options={typeList.map((item) => {
                  //   return {
                  //     value: item._id,
                  //     label: item.name,
                  //     isLeaf: item.parentId !== "0",
                  //   };
                  // })}
                  options={options}
                  loadData={this.loadData}
                  changeOnSelect
                ></Cascader>
              </Item>
            </Col>
            <Col span={14}>
              <Item name="imgs" label="商品图片" initialValue={record.imgs}>
                <PicUpload
                  ref={this.fileRef}
                  name="image"
                  fileList={this.state.fileList}
                  onChange={this.onChange}
                />
              </Item>
            </Col>
            <Col span={24}>
              <Item name="detail" label="商品详情">
                <RichTextEditor detail={record.detail} ref={this.richRef} />
              </Item>
            </Col>
          </Row>
          <Row>
            <Col span={20} offset={2} align="left">
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
