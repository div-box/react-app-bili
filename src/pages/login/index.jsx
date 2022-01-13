import React, { Component } from "react";
import styles from "./index.module.less";
import logo from "@/assets/images/logo.png";
import { Form, Input, Button, Row, Col } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {};
  }

  submit = async () => {
    const res = await this.formRef.current.validateFields();
    console.log("res", res);
  };

  render() {
    return (
      <div className={styles.login}>
        <header className={styles.login_header}>
          <img src={logo} alt="logo" />
          <div>React实践 后台管理平台</div>
        </header>
        <div className={styles.login_content}>
          <div className={styles.box}>
            <h2>用户登录</h2>
            <div className={styles.login_form}>
              <Form
                ref={this.formRef}
                autoComplete="off"
                onFinish={this.submit}
                // labelCol={{ span: 6 }}
                // wrapperCol={{ span: 18 }}
              >
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // label="用户名"
                      name="userName"
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "用户名不能为空",
                        },
                        { min: 4, message: "用户名最少4位" },
                        { max: 12, message: "用户名最多12位" },
                        {
                          pattern: /^[a-zA-z0-9_]+$/,
                          message: "只包含数字字母和下划线",
                        },
                      ]}
                    >
                      <Input
                        placeholder="请输入用户名"
                        prefix={<UserOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      // label="密码"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "密码不能为空",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="请输入密码"
                        prefix={<LockOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Col span={24}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      登录
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
