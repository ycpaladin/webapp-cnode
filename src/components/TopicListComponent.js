
import React, { Component } from 'react';
// import ReactPullToRefresh from 'react-pull-to-refresh';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FooterComponent, ReplyTimeComponent, UserPictureComponent } from './common/CommComponents';
import { getTopics, switchTab } from '../actions/topicActions';
import { getTabs } from '../helpers/tabHelper';

/**
 * 文章列表
 */
class TopicListComponent extends Component {

  constructor(props) {
    super(props);
    const self = this;
    // 监听滚动条是否已经到达底部
    this.handScroll = ({ target: { scrollHeight, scrollTop, clientHeight } }) => {
      // 如果到达底部则执行加载下一页的操作
      const { dispatch, tab, [tab]: { page } } = self.props;
      if (scrollTop + clientHeight >= scrollHeight) {
        dispatch(getTopics(page + 1, tab));
      }
    };
    this.handleRefresh = (resolve) => { // , reject
      const { dispatch, tab } = self.props;
      dispatch(getTopics(1, tab));
      resolve();
    };
  }

  /**
   * 第一次加载时判断是否需要去重新获取数据，因为有可能是从文章详情中返回的
   * 如果是从文章详情页中返回的则不需要重新请求，直接生成即可
   */
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getTopics(1));
  }

  componentWillUpdate({ dispatch, isFetching, tab, [tab]: { list, page } }) {
    if (page === 1 && list.size === 0 && isFetching === false) {
      dispatch(getTopics(1, tab));
    }
  }


  render() {
    let children;
    const { tab, isFetching, [tab]: { list, page } } = this.props;
    if (isFetching && page === 1) {
      children = (<div className="fetching" />);
    } else {
      const items = list.map((item, index) =>
        <TopicItemComponent key={index} {...item} currentTab={tab} page={page} />);
      children = (
        <ul data-flex="dir:top main:justify" className="topic-list">
          {items}
        </ul>
      );
    }
          /* <ReactPullToRefresh
            onRefresh={this.handleRefresh}
            className="pull-to-refresh"
            icon={<div className="fetching" />}
            style={{
              textAlign: 'center',
            }}
          >*/

    return (
      <div data-flex="dir:top main:justify" data-flex-box="1">
        <TopicListHeaderComponent {...this.props} />
        <div data-flex-box="1" id="contantWarpper" className="content-warpper" onScroll={e => this.handScroll(e)}>

          {children}

        </div>
        <FooterComponent />
      </div>
    );
  }


  /**
   * 组件已经挂载完毕，此时可以进行DOM操作
   * 在此判断如果当前没有进行数据请求，则说明是从文章详情返回的，那么此时需要将滚动条恢复到上次停留的地方
   */
  componentDidMount() {
    const { shouldFetch } = this.props;
    if (!shouldFetch) {
      document.getElementById('contantWarpper').scrollTop = parseFloat(window.localStorage.topicListScrollHeight) || 0;
    }
  }

  componentDidUpdate({ tab: prevTab }) {
    const { tab, [tab]: { scrollTop } } = this.props;
    if (prevTab !== tab) {
      document.getElementById('contantWarpper').scrollTop = scrollTop;
    }
  }
}


export default connect(root => root.topicListReducer)(TopicListComponent);


/**
 * 文章列表的头部
 */
export class TopicListHeaderComponent extends Component {

  constructor(props) {
    super(props);
    this.handClick = (tab) => {
      if (tab !== this.props.tab) {
        const { dispatch } = this.props;
        dispatch(switchTab(tab, document.getElementsByClassName('content-warpper')[0].scrollTop));
        // dispatch(getTopics(1, tab));
                // document.getElementsByTagName('body')[0].scrollTop = 0; //
      }
    };
  }

    /**
     * 判断组件是否需要重新加载，以提升性能
     */
  shouldComponentUpdate(nextProps) {
    return this.props.tab !== nextProps.tab;// 防止重复render
  }

  render() {
    const tabs = getTabs();
    const children = tabs.map(({ key, name }) => (<li key={key} className={this.props.tab === key ? 'current-tab' : ''}><a href="javascript:;" onClick={() => this.handClick(key)} >{name}</a></li>));
    return (
      <header data-flex="dir:left; " data-flex-box="0">
        <ul data-flex="dir:left box:mean">
          {children}
        </ul>

      </header>
    );
  }

}


/**
 * 文章列表项组件
 */
export class TopicItemComponent extends Component {

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
