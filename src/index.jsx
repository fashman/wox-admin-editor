import React, { Component } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import './style.mod.less';

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
const defaultToolbar = {
  textStyle: ['bold', 'italic', 'underline', 'strike'],
  quote: ['blockquote'],
  header: [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  list: [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  indent: [{ 'indent': '-1'}, { 'indent': '+1' }],
  size: [{ 'size': ['small', false, 'large', 'huge'] }],
  color: [{ 'color': colors }, { 'background': colors }],
  font: [{ 'font': [] }],
  align: [{ 'align': [] }],
  liv: [ 'link', 'image', 'video' ],
  clean: ['clean']
};

export default class WoxEditor extends Component {

  handleChange = (value) => {
    const key = this.props.keyName || 'value';
    this.props.callback( {[key]: value} );
  }

  render() {
    const toolbar = Object.assign({}, defaultToolbar, this.props.toolbar || {});
    const modules = { toolbar: [] };

    for (let i in toolbar ){
      modules.toolbar.push(toolbar[i]);
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
