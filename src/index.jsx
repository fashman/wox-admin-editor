/**
 * callback[Function]					//回调函数，返回{ keyName：当前值 }
 * keyName[String]						//返回对象的属性名
 * readOnly[Boolean]					//是否只读
 * value[String]							//富文本框值
 * 组件值的更改会触发回调函数，需要更新传入的value以达到更新组件的值
**/

import React, { Component } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const defaultToolbar = {
  textStyle: ['bold', 'italic', 'underline', 'strike'],
  quote: ['blockquote'],
  header: [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  list: [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  indent: [{ 'indent': '-1'}, { 'indent': '+1' }],
  size: [{ 'size': ['small', false, 'large', 'huge'] }],
  color: [{ 'color': [] }, { 'background': [] }],
  font: [{ 'font': [] }],
  align: [{ 'align': [] }],
  liv: [ 'link', 'image', 'video' ],
  clean: ['clean']
};

export default class EditorCom extends Component {
  handleChange = (value) => {
    const key = this.props.keyName || 'value';
    this.props.callback( {[key]: value} );
  }
  render() {
    const toolbar = Object.assign({}, defaultToolbar, this.props.toolbar || {});
    const modules = { toolbar: [] };
    for (let i in toolbar ){
      modules.toolbar.push( toolbar[i] );
    }
    return (
      <ReactQuill
        placeholder={this.props.placeholder || '请输入信息'}
        value={this.props.value}
        theme="snow"
        onChange={this.handleChange}
        modules={modules}
        readOnly={this.props.readOnly || false}
      />
    )
  }
}
