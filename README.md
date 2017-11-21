# Editor [![image](https://img.shields.io/npm/v/wox-admin-editor.svg)](https://www.npmjs.com/package/wox-admin-editor)

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| callback | 回调函数，返回 `{ keyName: 当前值 }` | Function | |
| keyName | 返回对象的属性名 | String | value |
| readOnly | 是否只读 | Boolean | false |
| value | 富文本框值 | String | |
| url | 图片上传地址 | String | 必填 |

## Usage

```javascript
import WoxEditor from 'wox-admin-editor';

ReactDOM.render(
	<WoxEditor 
		value={ this.state.detailCN || '' }
		callback={this.CallBack}
		keyName={'detailCN'}
		url={`${base.img}/wximg/gtfile/upload`}
	/>, 
	rootEle
);
```
