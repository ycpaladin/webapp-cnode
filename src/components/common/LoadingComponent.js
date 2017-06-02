import React, { Component } from 'react';


/**
 * 正在加载组件
 */
export default class LoadingComponent extends Component {
  constructor(props) {
    super(props);
    this.render = () => (<div className="fetching" />);
  }
}

