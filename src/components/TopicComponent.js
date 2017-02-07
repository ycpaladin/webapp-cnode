
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTopicById, goBackTopicList } from '../actions/topicActions';

import fromNow from '../helpers/dateTimeHelper';
import { getTabName } from '../helpers/tabHelper';
import { UserPictureComponent } from './common/CommComponents';
import { getHistory } from '../configureStore';

class TopicComponent extends Component {

  componentWillMount() {
    const { dispatch, routeParams: { id } } = this.props;

    dispatch(getTopicById(id));
  }

  render() {
    const { routeParams: { tab }, isFetching, topic } = this.props;
    let children;
    if (isFetching) {
      children = (<div className="fetching"></div>);
    } else if (topic !== null) {
      const { title, author, create_at, visit_count: visitCount, content, replies } = topic;
      children = (<div className="topicContent">
        <div className="header">
          <h1>{title}</h1>
          <UserPictureComponent user={author} />
          <a href="#" className="user-link">{author.loginname}</a>
          <span className="createAt">发布于{fromNow(create_at)}，</span>
          <span className="visitCount">{visitCount}次浏览</span>
          <i className="icon iconfont">&#xe6a0; </i>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>

        <ReplyListComponent replies={replies} />

      </div>);
    }
    return (<div data-flex="dir:top main:justify">
      <TopicHeaderComponent tab={tab} {...this.props} />
      <div data-flex-box="1" className="contentWarpper" >
        {children}
      </div>
    </div>);
  }
}

export default connect(r => r.topicReducer)(TopicComponent);


/**
 * 文章详情页面的头部
 */
export class TopicHeaderComponent extends Component {

  constructor(props) {
    super(props);
    this.goBacktoTopicList = () => {
      const { dispatch } = this.props;
      dispatch(goBackTopicList());
      const history = getHistory();
      history.goBack();
    };
  }


  render() {
    const { tab } = this.props;
    const tabName = getTabName(tab);

    return (
      <header data-flex="dir:left; " data-flex-box="0" className="topicHeader">
        <a href="#" onClick={e => this.goBacktoTopicList(e)} className="backBtn">
          <i className="icon iconfont">&#xe697; </i>
          <span> {tabName}</span>
        </a>
      </header>
    );
  }
}


export class ReplyListComponent extends Component {

  render() {
    const { replies } = this.props;
    const children = replies.map((item, index) =>
      (<ReplyItemComponent key={index} index={index + 1} {...item} />));
    return (
      <div className="replyList">
        <div>{replies.length}个回复</div>
        <ul className="reply-list">

          {children}
        </ul>
      </div>
    );
  }
}


export class ReplyItemComponent extends Component {

  render() {
    const { author, create_at, content, index } = this.props;
    return (
      <li>

        <UserPictureComponent user={author} />

        <div className="info-header">
          <span className="layer-number">{index}楼</span>
          <a href="#" className="user-link">{author.loginname}</a>
          <a href="#" className="good">
            <i className="icon iconfont">&#xe717;</i>
          </a>
        </div>
        <div className="reply-date">
          发布于{fromNow(create_at)}
        </div>
        <div className="info-content" dangerouslySetInnerHTML={{ __html: content }}>

        </div>
      </li>
    );
  }
}
