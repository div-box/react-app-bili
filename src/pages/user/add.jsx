import React, { Component } from "react";
import { Row, Col, Form, Input, Select, Modal } from "antd";
export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {};
  }

  handleOk = async () => {
    const { onOk, currentItem } = this.props;
    const values = await this.formRef.current.validateFields();
    onOk({ ...values, _id: currentItem._id });
  };

  render() {
    const { visible, onCancel, title, roles, currentItem } = this.props;
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
          <Row>
            <Col span={24}>
              <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true }]}
                initialValue={currentItem.username}
              >
                <Input />
              </Form.Item>
            </Col>
            {currentItem._id ? null : (
              <Col span={24}>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[{ required: true }]}
                  initialValue={currentItem.password}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Form.Item
                name="phone"
                label="手机号"
                rules={[{ required: true }]}
                initialValue={currentItem.phone}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[{ required: true }]}
                initialValue={currentItem.email}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="role_id"
                label="角色"
                rules={[{ required: true }]}
                initialValue={currentItem.role_id}
              >
                <Select>
                  {roles?.map((item) => {
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
        </Form>
      </Modal>
    );
  }
}
