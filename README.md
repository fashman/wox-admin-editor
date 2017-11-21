# Editor [![image](https://img.shields.io/npm/v/wox-admin-editor.svg)](https://www.npmjs.com/package/wox-admin-editor)

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| callback | `必填` 回调函数，返回 `{ keyName: 当前值 }` | Function | |
| keyName | `必填` 返回对象的属性名 | String | value |
| value | `必填` 富文本框值 | String | |
| url | 图片上传地址，不填则不会展示图片上传按钮 | String | 必填 |
| readOnly | 是否只读 | Boolean | false |
| needReciveProps | 是否支持通过 `componentWillReceiveProps` 来触发组件更新，如果不设置或者为 `false`，则需要外部组件自己来控制组件渲染来达到内部组件更新的需求 | false |

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
