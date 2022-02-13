import React, { Component } from "react";
import { Row, Col, Form, Input, Select, Modal } from "antd";
export default class AddModal extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {};
  }

  handleOk = async () => {
    const { onOk } = this.props;
    const values = await this.formRef.current.validateFields();
    onOk({ ...values });
  };

  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal
        destroyOnClose
        title={"创建角色"}
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
                name="roleName"
                label="角色名称"
                rules={[{ required: true }]}
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
