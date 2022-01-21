import React, { Component } from "react";
import styles from "./index.module.less";
import logo from "@/assets/images/logo.png";
import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { reqLogin } from "@/api";
import { saveUser } from "@/utils/storageUtils";
import { withRouter } from "@/utils";
class Login extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {};
  }

  submit = async () => {
    const data = await this.formRef.current.validateFields();
    const res = await reqLogin(data);
    if (res.status === 0) {
      message.success("登陆成功");
      //保存user
      saveUser(res.data);
      this.props.router.navigate("/");
    } else {
      message.error(res.msg);
    }
  };
  //密码自定义验证
  validatorPwd = (rules, value, callback) => {
    if (!value) callback("密码必须输入");
    else if (value.length < 4) callback("密码不能小于4位");
    else if (value.length > 12) callback("密码不能大于12位");
    else if (!/^[a-zA-z0-9_]+$/.test(value))
      callback("密码只能是英文数字或者下划线");
    else callback();
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
                      name="username"
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
                          validator: this.validatorPwd,
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
export default withRouter(Login);
