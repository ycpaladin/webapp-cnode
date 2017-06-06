import React, { Component } from 'react';
// http://www.cnblogs.com/jone-chen/p/6118930.html
export default class PullToRefreshComponent extends Component {
  constructor(props) {
    super(props);
    this.className = this.props.className || 'pull-to-refresh';
    this.defaultTranslate3dY = this.props.defaultTranslate3dY || -70;
    this.pulledYLimit = this.props.pulledYLimit || 0;
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    this.triggerRefresh = false;
    this.pulledY = 0;
  }

  render() {
    const { loading = <LoadingComponent /> } = this.props;
    return (<div
      className={this.className}
      onTouchMove={this.onTouchMove}
      onTouchStart={this.onTouchStart}
      onTouchEnd={this.onTouchEnd}
      ref={(e) => { this.element = e; }}
      style={{ transform: `translate3d(0px,${this.defaultTranslate3dY}px,0px)` }}
    >
      {loading}
      {this.props.children}
    </div>);
  }

  onTouchStart(e) {
     // 判断默认行为是否可以被禁用 !e.defaultPrevented
    if (e.cancelable && !e.defaultPrevented) {
      e.preventDefault();
    }
    const [{ pageY }] = e.changedTouches; // pageX,
    this.touchStart = pageY;
  }

  onTouchMove(e) {
      // 判断默认行为是否可以被禁用 !e.defaultPrevented
    if (e.cancelable && !e.defaultPrevented) {
      e.preventDefault();
    }
    if (e.currentTarget.className === this.className &&
    e.currentTarget.parentElement.scrollTop === 0) { // && this.triggerRefresh === false
      const [{ pageY }] = e.changedTouches; // pageX,
      this.pulledY = pageY - this.touchStart; // 往下拉了多少
      this.translate3dY = (this.defaultTranslate3dY + this.pulledY) / 3;

      this.element.style.transform = `translate3d(0px,${this.translate3dY}px,0px)`;
      if (this.pulledY >= this.pulledYLimit) {
        this.triggerRefresh = true;
      }
    }
  }

  reset(value) {
    return new Promise((resovle) => {
      const resetTimer = setInterval(() => {
        if (this.translate3dY <= value) {
          clearInterval(resetTimer);
          resovle();
        }
        this.translate3dY -= 1;
        this.element.style.transform = `translate3d(0px,${this.translate3dY}px,0px)`;
      }, 1);
    });
  }

  onTouchEnd(e) {
    if (e.cancelable && !e.defaultPrevented) {
      e.preventDefault();
    }
    if (this.triggerRefresh) {
      this.reset(this.pulledYLimit).then(() => {
        setTimeout(() => {
          if (this.props.onRefresh) {
            this.props.onRefresh(() => {
              this.triggerRefresh = false;
              this.reset(this.defaultTranslate3dY);
            });
          }
        }, 500);
      });
    } else {
      this.reset(this.defaultTranslate3dY);
    }
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
