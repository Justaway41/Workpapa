import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class MyEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

  onEditorStateChange = (editorState) => {
      this.setState({
          editorState,
      });
      const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      this.props.getEditorValue(data);
      //   console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  render() {
      const { editorState } = this.state;
      return (
          <Editor
              toolbar={{ options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'remove'] }}
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
          />
      );
  }
}

export default MyEditor;
