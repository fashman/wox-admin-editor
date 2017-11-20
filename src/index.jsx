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
/**
 * 组件名遵循 `Wox` 前缀的规范
 */
class WoxEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callBack: props.callBack,
      keyName: props.keyName,
      editorState:'',
      a:1
    };

  }
  componentWillReceiveProps(nextProps){
    
    if(nextProps.value && this.state.a > 1){
      return;
    }
    if(nextProps.value){
      this.setState({a:2})
    }
    const contentBlock = htmlToDraft(nextProps.value);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    this.setState({
      editorState:editorState,
    })
  }
  uploadImageCallBack = (file) => {
    return new Promise(
       (resolve, reject) => {
         const xhr = new XMLHttpRequest();
         xhr.open('POST', this.props.url);
         xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
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
  onEditorStateChange = (editorState) => {
    const value  = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const keyName = this.props.keyName;
    this.setState({
      editorState:editorState
    });
    this.props.callBack({[keyName]:value});
  };

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        wrapperClassName={cx('wox-wrapper')}
        editorClassName={cx('wox-editor')}
        onEditorStateChange={this.onEditorStateChange}
        placeholder={this.props.placeholder}
        readOnly={this.props.readOnly}
        localization={{
          locale: 'zh',
        }}
        toolbar={{
        
          link: { inDropdown: true },
          image: { uploadCallback: this.uploadImageCallBack},
          colorPicker:{
            colors:colors
          }
        }}
      />
    );
  }
}

WoxEditor.propTypes = {
  callBack:  PropTypes.func.isRequired,
  url:PropTypes.string.isRequired,
  keyName : PropTypes.string.isRequired,
  value:PropTypes.string.isRequired,
  readOnly:PropTypes.bool
};
WoxEditor.defaultProps = {
  placeholder: '请输入信息',
  readOnly:false
};

export default WoxEditor;