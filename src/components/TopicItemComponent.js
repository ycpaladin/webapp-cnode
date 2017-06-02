import React, { Component } from 'react';
import { Link } from 'react-router';
import ReplyTimeComponent from './common/ReplyTimeComponent';
import UserPictureComponent from './common/UserPictureComponent';
// import { getTabs } from '../helpers/tabHelper';


/**
 * 文章列表项组件
 */
export default class TopicItemComponent extends Component {

  constructor(props) {
    super(props);
    this.getTabName = () => {
      const { top, good, tab } = this.props;
      if (top) {
        return '置顶';
      } else if (good) {
        return '精华';
      }

      switch (tab) {
        case 'good': return '精华';
        case 'share': return '分享';
        case 'ask': return '问答';
        case 'job': return '招聘';
        default:
          return '精华';
      }
    };
  }

  render() {
    const { id, top, tab, good, title, currentTab, page,
      visit_count: visitCount, reply_count: replyCount,
      last_reply_at: lastReplyAt, author } = this.props;
    let tabElement;
    if (currentTab === 'all' || top || good) {
      tabElement = <span className={top || good || tab === currentTab ? 'green' : 'normal'}>{this.getTabName()}</span>;
    }
    return (
      <li>
        <UserPictureComponent user={author} page={page} />
        {tabElement}
        <Link title={title} to={`/topic/${tab}/${id}`}> {title}</Link>
        <span className="count">
          <span>{replyCount}</span><span>/</span><span>{visitCount}</span>
        </span>
        <ReplyTimeComponent replyTime={lastReplyAt} />
      </li>
    );
  }
}
