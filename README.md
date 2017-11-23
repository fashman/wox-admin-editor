# Editor [![image](https://img.shields.io/npm/v/wox-admin-editor.svg)](https://www.npmjs.com/package/wox-admin-editor)

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| callback | `必填` 回调函数，返回 `{ keyName: 当前值 }` | Function | |
| keyName | `必填` 返回对象的属性名 | String | value |
| value | `必填` 富文本框值 | String | |
| url | 图片上传地址，不填则不会展示图片上传按钮 | String | 必填 |
| readOnly | 是否只读 | Boolean | false |

## Usage

```javascript
import WoxEditor from 'wox-admin-editor';

ReactDOM.render(
  <WoxEditor
    value={this.state.detailCN}
    callback={this.callback}
    keyName="detailCN"
    url="upload.do"
  />,
  rootEle
);
```
