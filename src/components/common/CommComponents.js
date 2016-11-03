
import React, { Component } from 'react';
import { getTopics, goBackTopicList } from '../../actions/topicActions';
import { Link } from 'react-router';
import { getTabs, getTabName } from '../../helpers/tabHelper';
import { getHistory } from '../../configureStore';
import { fromNow } from '../../helpers/dateTimeHelper';
/**
 * 文章详情页面的头部
 */
export class TopicHeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.goBacktoTopicList = e => {
            let { dispatch} = this.props;
            dispatch(goBackTopicList());
            let history = getHistory();
            history.goBack();
        }
    }


    render() {
        let { tab} = this.props;
        let tabName = getTabName(tab);

        return (
            <header data-flex="dir:left; " data-flex-box="0" className="topicHeader">

                <a href="javascript:;" onClick={e => this.goBacktoTopicList(e)} className="backBtn">
                    <i className="icon iconfont">&#xe697;</i>
                    <span> {tabName}</span>
                </a>
            </header>
        );
    }
}

/**
 * 文章列表的头部
 */
export class TopicListHeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.handClick = (tab) => {
            if (tab !== this.props.tab) {
                let {dispatch} = this.props;
                dispatch(getTopics(1, tab));
                // document.getElementsByTagName('body')[0].scrollTop = 0; //
            }
        }
    }

    /**
     * 判断组件是否需要重新加载，以提升性能
     */
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.tab !== nextProps.tab;//防止重复render
    }

    render() {

        let tabs = getTabs();
        let children = tabs.map(({ key, name}, index) => {
            return (<li key={index} className={this.props.tab == key ? 'currentTab' : ''}><a href="javascript:;" onClick={e => this.handClick(key)} >{name}</a></li>);
        })
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
 * 公共的脚部分
 */
export class FooterComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer data-flex-box="0">
                <ul data-flex="dir:left; box:mean">
                    <li><a href="javascript:;">文章</a></li>
                    <li><a href="javascript:;">文章</a></li>
                    <li><a href="javascript:;">文章</a></li>
                    <li><a href="javascript:;">文章</a></li>
                </ul>
            </footer>
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
            let { top, good, tab, currentTab} = this.props;
            if (top) {
                return '置顶';
            } else if (good) {
                return '精华';
            }
            else {
                switch (tab) {
                    case 'good': return '精华';
                    case 'share': return '分享';
                    case 'ask': return '问答';
                    case 'job': return '招聘';
                }
            }
        }
    }

    render() {
        let { id, top, tab, good, title, currentTab, visit_count, reply_count, last_reply_at, author} = this.props;
        let tabElement;
        if (currentTab == 'all' || top || good) {
            tabElement = <span className={top || good || tab === currentTab ? 'green' : 'normal'}>{this.getTabName()}</span>;
        }
        return (
            <li>
                <UserPictureComponent user={author} />
                {tabElement}
                <Link title={title} to={`/topic/${tab}/${id}`}> {title}</Link>
                <span className="count">
                    <span>{reply_count}</span><span>/</span><span>{visit_count}</span>
                </span>
                <ReplyTimeComponent replyTime={last_reply_at} />
            </li>
        );
    }
}


/**
 * 回复时间组件
 */
export class ReplyTimeComponent extends Component {

    constructor(props) {

        super(props);
        this.getReplyDateAsString = () => {
            let { replyTime} = this.props;
            return fromNow(replyTime);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.replyTime !== this.props.replyTime;
    }

    render() {
        return (<span className="time">{this.getReplyDateAsString()}</span>);
    }
}

/**
 * 用户头像组件
 */
export class UserPictureComponent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.avatar_url !== this.props.avatar_url;
    }

    render() {
        let {avatar_url, loginname} = this.props.user;
        return (
            <a href="javascript:;" className="userLink">
                <div style={{ backgroundImage: `url(${avatar_url})` }} ></div>
            </a>
        );
    }
}

/**
 * 正在加载组件
 */
export class LoadingComponent extends Component {
    render() {
        return (<div className="fetching"></div>)
    }
}