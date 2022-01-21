import React, { Component } from "react";
import { Row, Col, Form, Input, Select, Modal } from "antd";

export default class FormModal extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {};
  }

  handleOk = async () => {
    const { onOk, currentItem } = this.props;
    const values = await this.formRef.current.validateFields();
    onOk({ ...values, categoryId: currentItem._id });
  };

  render() {
    const { title, visible, onCancel, currentItem, currentId, selectList } =
      this.props;
    return (
      <Modal
        destroyOnClose
        title={title}
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleOk}
      >
        <Form
          ref={this.formRef}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          {title === "新增" ? (
            <Row>
              <Col span={24}>
                <Form.Item
                  name="parentId"
                  label="分类"
                  initialValue={currentId || "0"}
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option value="0">一级分类</Select.Option>
                    {selectList?.map((item) => {
                      return (
                        <Select.Option value={item._id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col span={24}>
              <Form.Item
                name="categoryName"
                label="名称"
                rules={[{ required: true }]}
                initialValue={currentItem.name}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
