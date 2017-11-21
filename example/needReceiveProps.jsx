import React, { Component } from 'react';
import WoxEditor from 'wox-admin-editor';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailCN: ''
    };
  }

  editorChangeCallback = (value) => {
    this.setState(value);
  }

  render() {
    const { detailCN } = this.state;

    return (
      <div className={cx('app')}>
        <div>
          <h1>detailCN: {detailCN}</h1>
          <WoxEditor
            needReciveProps={true}
            value={detailCN}
            keyName="detailCN"
            callback={this.editorChangeCallback}
          />
        </div>
      </div>
    );
  }
}
