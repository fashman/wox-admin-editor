# wox-admin-edit

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| callback | 回调函数，返回{ keyName：当前值 } | Function | |
| keyName | 返回对象的属性名 | String | value |
| readOnly | 是否只读 | Boolean | false |
| value | 富文本框值 | String | |
| toolbar | 功能栏 | Object | |

## import

```javascript
$ npm install wox-admin-edit
```

## toolbar
> 默认**toolbar**为：
```javascript
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
```
> 自定义 **toolbar**请按这种格式书写