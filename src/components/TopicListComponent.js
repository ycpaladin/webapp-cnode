
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TopicListHeaderComponent, FooterComponent } from './common/CommComponents';
import { getTopics } from '../actions/topicActions';
import { TopicItemComponent } from './common/CommComponents'

/**
 * 文章列表
 */
class TopicListComponent extends Component {

    constructor(props) {
        super(props);
        //监听滚动条是否已经到达底部
        this.handScroll = ({ target: { scrollHeight, scrollTop, clientHeight}}) => {
            //如果到达底部则执行加载下一页的操作
            if (scrollTop + clientHeight >= scrollHeight) {
                let {dispatch, page, tab} = this.props;
                dispatch(getTopics(page + 1, tab));
            }
        }
    }

    /**
     * 第一次加载时判断是否需要去重新获取数据，因为有可能是从文章详情中返回的
     * 如果是从文章详情页中返回的则不需要重新请求，直接生成即可
     */
    componentWillMount() {
        let {dispatch, shouldFetch} = this.props;
        if (shouldFetch) {
            dispatch(getTopics(1));
        }
    }


    render() {

        let children;
        if (this.props.isFetching && this.props.page === 1) {
            children = (<div className="fetching"></div>);
        } else {
            let items = this.props.list.map((item, index) => {
                return <TopicItemComponent key={index} {...item} currentTab={this.props.tab} />
            });

            children = (
                <ul data-flex="dir:top main:justify">
                    {items}
                </ul>
            );
        }


        return (
            <div data-flex="dir:top main:justify">
                <TopicListHeaderComponent {...this.props} />
                <div data-flex-box="1" className="contentWarpper" onScroll={e => this.handScroll(e) }>
                    {children}
                </div>
            </div>
        );
    }

    /**
     * 组件已经挂载完毕，此时可以进行DOM操作
     * 在此判断如果当前没有进行数据请求，则说明是从文章详情返回的，那么此时需要将滚动条恢复到上次停留的地方
     */
    componentDidMount() {
        let {shouldFetch} = this.props;
        if (!shouldFetch) {
            document.getElementsByClassName('contentWarpper')[0].scrollTop = parseInt(window.localStorage["topicListScrollHeight"]) || 0;
        }

    }
}


export default connect(root => root.topicListReducer)(TopicListComponent);