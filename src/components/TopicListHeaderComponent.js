import React, { Component } from 'react';
import { switchTab } from '../actions/topicActions';
import { getTabs } from '../helpers/tabHelper';
/**
 * 文章列表的头部
 */
export default class TopicListHeaderComponent extends Component {

  constructor(props) {
    super(props);
    this.handClick = (tab) => {
      if (tab !== this.props.tab) {
        const { dispatch } = this.props;
        dispatch(switchTab(tab, document.getElementById('contentWarpper').scrollTop));
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

