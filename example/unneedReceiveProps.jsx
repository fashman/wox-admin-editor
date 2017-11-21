import React, { Component } from 'react';
import WoxEditor from '../../components/editor';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailCN: '',
      loading: true
    };
  }

  componentDidMount() {
    const _this = this;

    setTimeout(() => {
      _this.setState({
        detailCN: '<p>第一次请求数据</p>',
        loading: false
      });
    }, 2000);

    setTimeout(() => {
      _this.setState({
        detailCN: '<p>切换数据</p>',
        loading: true
      });
    }, 4000);

    setTimeout(() => {
      _this.setState({
        loading: false
      });
    }, 8000);
  }

  editorChangeCallback = (value) => {
    this.setState(value);
  }

  render() {
    const { detailCN, loading } = this.state;

    return (
      <div className={cx('app')}>
      {
        loading ?                       // 没有使用 `needReciveProps` 属性，需要自己定义一个 `loading` 字段来控制组件更新
        <div>loading...</div> :
        <div>
          <h1>detailCN: {detailCN}</h1>
          <WoxEditor
            value={detailCN}
            keyName="detailCN"
            callback={this.editorChangeCallback}
          />
        </div>
      }
      </div>
    );
  }
}
