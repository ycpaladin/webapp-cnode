
import React, { Component } from 'react';
import fromNow from '../../helpers/dateTimeHelper';

/**
 * 回复时间组件
 */
export default class ReplyTimeComponent extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.replyTime !== this.props.replyTime;
  }

  render() {
    const { replyTime } = this.props;
    return (<span className="time">{fromNow(replyTime)}</span>);
  }
}
