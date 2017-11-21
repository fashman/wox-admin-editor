import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import classNames from 'classnames/bind';
import styles from './style.mod.less';

const cx = classNames.bind(styles);
const colors = [
  '#000000', '#444444', '#666666', '#999999', '#cccccc', '#eeeeee', '#f3f3f3', '#ffffff',
  '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff',
  '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd',
  '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0',
  '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79',
  '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47',
  '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4c1130'
];


class WoxEditor extends Component {
  constructor(props) {
    super(props);

    const contentBlock = htmlToDraft(props.value || '');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);

    this.state = {
      editorState: editorState,
      firstRender: true,                                // 只能在第一次请求回来后，使用 `nextProps` 带过来的值更新编辑器
      needReciveProps: props.needReciveProps || false   // 判断是使用 `nextProps` 来进行第一次更新，还是自己通过外部字段自己控制组件的冲渲染
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.needReciveProps || !this.state.firstRender) {
      return;
    }

    const contentBlock = htmlToDraft(nextProps.value || '');
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);

    this.setState({
      editorState: editorState,
      firstRender: false
    });
  }

  onEditorStateChange = (editorState) => {
    const { keyName } = this.props;
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    this.setState({
      editorState,
    });
    this.props.callback({
      [keyName]: value
    });
  }

  uploadImageCallBack = (file) => {
    const { url } = this.props;

    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const data = {link:response.data.url};
          resolve({data:data});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  render() {
    const { placeholder, readOnly, url } = this.props;
    const { editorState } = this.state;
    const toolbarConfig = {
      options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history'],
      inline: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
      colorPicker: {
        colors: colors
      },
      image: {
        uploadCallback: this.uploadImageCallBack
      }
    };

    if (url) {
      toolbarConfig.options.push = 'image';
    }

    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="wox-editor-wrapper"
          editorClassName="wox-editor"
          onEditorStateChange={this.onEditorStateChange}
          placeholder={placeholder}
          readOnly={readOnly}
          localization={{
            locale: 'zh',
          }}
          toolbar={toolbarConfig}
        />
      </div>
    );
  }
}

WoxEditor.propTypes = {
  callback:  PropTypes.func.isRequired,
  keyName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  url: PropTypes.string,
  readOnly: PropTypes.bool
};

WoxEditor.defaultProps = {
  placeholder: '请输入信息',
  readOnly:false
};

export default WoxEditor;
