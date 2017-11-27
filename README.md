# Editor [![image](https://img.shields.io/npm/v/wox-admin-editor.svg)](https://www.npmjs.com/package/wox-admin-editor)

## API

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| callback | 回调函数，返回 `{ keyName: 当前值 }` | Function | |
| keyName | 返回对象的属性名 | String | value |
| readOnly | 是否只读 | Boolean | false |
| value | 富文本框值 | String | |
| toolbar | 功能栏，如需自定义配置，请参考 [默认配置](https://github.com/firebugger/wox-admin-editor/blob/master/src/index.jsx#L15) | Object | |

## Usage

```javascript
import WoxEditor from 'wox-admin-editor';

ReactDOM.render(<WoxEditor />, rootEle);
```
