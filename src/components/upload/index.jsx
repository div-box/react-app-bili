import React, { Component } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { deleteImg } from "@/api";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default class PicUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      previewVisible: false,
      previewTitle: {},
      previewImage: "",
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.fileList !== this.props.fileList &&
      this.props.fileList?.length
    ) {
      this.setState(
        {
          fileList: this.props.fileList.map((item, index) => {
            if (typeof item === "string") {
              return {
                uid: item + index,
                name: item,
                url: `http://localhost:5000/upload/${item}`,
              };
            } else {
              return item;
            }
          }),
        },
        () => {
          console.log("this.state.fileList", this.state.fileList);
        }
      );
    }
  }
  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  handleChange = async ({ file, fileList }) => {
    if (file.status === "done") {
      const result = file.response;
      if (result.status === 0) {
        message.success("上传成功!");
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error("上传失败!");
      }
    } else if (file.status === "remove") {
      const res = await deleteImg(file.name);
      if (res.status === 0) {
        message.success("删除成功");
      } else {
        message.error("删除失败");
      }
    }
    this.setState({ fileList }, () => {
      this.props.onChange(fileList);
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const { fileList, previewVisible, previewTitle, previewImage } = this.state;
    const { name } = this.props;
    return (
      <div>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          accept="image/*"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          name={name}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
