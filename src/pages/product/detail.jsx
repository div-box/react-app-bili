import { Form, Button, Col, Row, Input, InputNumber, Select, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import { getProductsTypeList, addProductsList, reqCategory } from "@/api";
import bg from "@/assets/images/bg.jpg";
import "./index.less";
const { Item } = List;
// 首页
export default class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      typeList: [],
    };
  }
  componentDidMount() {
    this.getProductsTypeList();
    this.reqCategory();
  }
  getProductsTypeList = async () => {
    const res = await getProductsTypeList({ parentId: "0" });
    this.setState({
      typeList: res.data,
    });
  };
  reqCategory = async () => {
    const record = this.props.router.location.state;
    const results = await Promise.all([
      reqCategory({ categoryId: record.categoryId }),
      reqCategory({ categoryId: record.pCategoryId }),
    ]);
    // const thisInfo = await reqCategory({ categoryId: record.categoryId });
    // const thisPInfo = await reqCategory({ categoryId: record.pCategoryId });
    this.setState({
      thisName: results[0]?.data?.name,
      thisPName: results[1]?.data?.name,
    });
  };

  submit = async () => {
    this.props.router.navigate("/pro/product");
  };
  render() {
    const { thisName, thisPName } = this.state;
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
          <span>商品详情</span>
        </div>
        <List className="list">
          <Item>
            <div>
              商品名称：<span>{record.name}</span>
            </div>
          </Item>
          <Item>
            <div>
              商品描述：<span>{record.desc}</span>
            </div>
          </Item>
          <Item>
            <div>
              商品价格：<span>{record.price}</span>
            </div>
          </Item>
          <Item>
            <div>
              商品分类：
              <span>
                {thisPName ? `${thisPName} -> ${thisName}` : `${thisName}`}
              </span>
            </div>
          </Item>
          <Item>
            <div>
              商品图片：
              <span>
                <img src={bg} alt="商品图片" />
                <img src={bg} alt="商品图片" />
              </span>
            </div>
          </Item>
          <Item>
            <div>
              商品详情：
              <div
                style={{ display: "inline-block", marginLeft: "15px" }}
                dangerouslySetInnerHTML={{
                  __html: '<p style="color:red">鲨大富豪是</p>',
                }}
              ></div>
            </div>
          </Item>
        </List>
      </div>
    );
  }
}
