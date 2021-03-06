import React, { Component } from "react";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class EditorConvertToHTML extends Component {
  // static propTypes = {
  //   detail: PropTypes.string,
  // };

  constructor(props) {
    super(props);
    const html = this.props.detail;
    if (html) {
      const contentBlock = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }
  }
  // state = {
  //   editorState: EditorState.createEmpty(),
  // };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  getRich = () => {
    const { editorState } = this.state;
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          editorStyle={{
            border: "2px solid #000",
            minHeight: "200px",
            paddingLeft: "15px",
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
