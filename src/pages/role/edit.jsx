import React, { Component } from "react";
import { Row, Col, Form, Input, Modal, Tree } from "antd";
import { getUser } from "@/utils/storageUtils";
import { routes } from "@/router";

export default class EditModal extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      checkKeys: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current) {
      this.setState({
        checkKeys: this.props.current.menus || [],
      });
    }
  }

  handleOk = async () => {
    const { onOk, current } = this.props;
    const { checkKeys } = this.state;
    const user = getUser();
    this.setState(
      {
        checkKeys: [],
      },
      () => {
        onOk({
          _id: current._id,
          menus: checkKeys,
          auth_name: user.username,
        });
      }
    );
  };

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState(
      {
        checkKeys: this.props.current.menus,
      },
      () => {
        onCancel();
      }
    );
  };

  formatTreeData = (list = []) => {
    return list
      .map((item) => {
        if (!item.routes) {
          return !item.hideInMenu
            ? {
                title: item.name,
                key: item.path,
              }
            : {};
        } else {
          if (item.isLeaf) {
            return {
              title: item.name,
              key: item.path,
              children: undefined,
            };
          } else {
            return {
              title: item.name,
              key: item.path,
              children: this.formatTreeData(item.routes),
            };
          }
        }
      })
      .filter((i) => i.key);
  };

  onCheck = (checkKeys) => {
    this.setState({
      checkKeys,
    });
  };

  onSelect = (selectKeys) => {
    const { checkKeys } = this.state;
    if (!checkKeys.includes(selectKeys[0])) {
      this.setState({
        checkKeys: [...checkKeys, selectKeys[0]],
      });
    }
  };

  render() {
    const { checkKeys } = this.state;
    const { visible, current } = this.props;
    const treeData = this.formatTreeData(routes);
    return (
      <Modal
        destroyOnClose
        title={"编辑角色权限"}
        visible={visible}
        onCancel={this.onCancel}
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
                initialValue={current.name}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Tree
          checkable
          defaultExpandAll={true}
          // onExpand={onExpand}
          // expandedKeys={expandedKeys}
          // autoExpandParent={autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={checkKeys}
          onSelect={this.onSelect}
          selectedKeys={undefined}
          treeData={treeData}
        />
      </Modal>
    );
  }
}
