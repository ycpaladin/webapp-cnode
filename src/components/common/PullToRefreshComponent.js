import React, { Component } from 'react';
// http://www.cnblogs.com/jone-chen/p/6118930.html
export default class PullToRefreshComponent extends Component {
  constructor(props) {
    super(props);
    // this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
  }

  render() {
    const { className = 'pull-to-refresh', loading = <LoadingComponent /> } = this.props;
    return (<div
      className={className}
      onTouchMove={this.onTouchMove}
      ref={(e) => { this.element = e; }}

    >
      <div className="pull-to-refresh" style={{ display: 'none' }}>
        {loading}
      </div>
      {this.props.children}
    </div>);
  }

  onTouchStart(e) {
    console.log(e, this.element);
  }

  onTouchMove(e) {
    console.log(e, this.element);
  }
}


class LoadingComponent extends Component {
  render() {
    return (<div style={{ textAlign: 'center' }}>加载中...</div>);
  }
}


// PullToRefreshComponent.propTypes = {
//   loading: React.PropTypes.element
// };
