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
import './style.less';

var modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    [ 'link', 'image', 'video' ],
    ['clean']
  ],
};

export default class EditorCom extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.count = true;
  }
  handleChange = (value) => {
    this.props.callback( {[this.props.keyName]: value} );
  }
  render() {
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
