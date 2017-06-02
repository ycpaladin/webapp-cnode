
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FooterComponent from './common/FooterComponent';
import TopicItemComponent from './TopicItemComponent';
import TopicListHeaderComponent from './TopicListHeaderComponent';
import PullToRefreshComponent from './common/PullToRefreshComponent';
import { getTopics } from '../actions/topicActions';

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

        <div data-flex-box="1" id="contentWarpper" className="content-warpper" onScroll={e => this.handScroll(e)}>
          <PullToRefreshComponent loading={<div className="fetching" />}>
            {children}
          </PullToRefreshComponent>
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
      document.getElementById('contentWarpper').scrollTop = parseFloat(window.localStorage.topicListScrollHeight) || 0;
    }
  }

  componentDidUpdate({ tab: prevTab }) {
    const { tab, [tab]: { scrollTop } } = this.props;
    if (prevTab !== tab) {
      document.getElementById('contentWarpper').scrollTop = scrollTop;
    }
  }
}


export default connect(root => root.topicListReducer)(TopicListComponent);

