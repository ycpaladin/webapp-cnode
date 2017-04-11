import React, { Component } from 'react';

export default class LoadComponent extends Component {
  render() {
    const { isFetching } = this.props;
    if (isFetching === true) {
      return (<div className="loading">
        <span>正在加载..</span>
      </div>);
    }
    return null;
  }
}
