
import React, { Component } from 'react';
import { getTopics } from '../../actions/topicActions';
import moment from 'moment';
import {Link} from 'react-router';
// import {moment} from '../../../node_modules/moment/locale/zh-cn';
export class HeaderComponent extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <header data-flex="dir:left; " data-flex-box="0">
                <span id="backBtn"><a href="javascript:;">返回</a></span>
                <header data-flex-box="1">标题</header>
                <span id="toolBtn"><a href="javascript:;">...</a></span>
            </header>
        );
    }
}


export class TopicListHeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.handClick = (tab) => {
            if (tab !== this.props.tab) {
                let {dispatch} = this.props;
                dispatch(getTopics(1, tab));
                // window.scroll.
                document.getElementsByTagName('body')[0].scrollTop = 0;
            }
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return this.props.tab !== nextProps.tab;//防止重复render
    }

    render() {
        return (
            <header data-flex="dir:left; " data-flex-box="0">
                <ul data-flex="dir:left box:mean">
                    <li className={this.props.tab == 'all' ? 'currentTab' : ''}><a href="javascript:;" onClick={e => this.handClick('all')} >全部</a></li>
                    <li className={this.props.tab == 'good' ? 'currentTab' : ''}><a href="javascript:;" onClick={e => this.handClick('good')} >精华</a></li>
                    <li className={this.props.tab == 'share' ? 'currentTab' : ''}><a href="javascript:;" onClick={e => this.handClick('share')} >分享</a></li>
                    <li className={this.props.tab == 'ask' ? 'currentTab' : ''}><a href="javascript:;" onClick={e => this.handClick('ask')}>问答</a></li>
                    <li className={this.props.tab == 'job' ? 'currentTab' : ''}><a href="javascript:;" onClick={e => this.handClick('job')}>招聘</a></li>
                </ul>

            </header>
        );
    }
}


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
        let { id, top, tab, good, title, currentTab, visit_count, reply_count, last_reply_at, author: { loginname, avatar_url}} = this.props;
        let tabElement;
        if (currentTab == 'all' || top || good) {
            tabElement = <span className={top || good || tab === currentTab ? 'green' : 'normal'}>{this.getTabName()}</span>;
        }
        return (
            <li>
                <UserPictureComponent avatar_url={avatar_url} />
                {tabElement}
                <Link title={title} to={ `/topic/${id}`}> {title}</Link>
                <span className="count">
                    <span>{reply_count}</span><span>/</span><span>{visit_count}</span>
                </span>
                <ReplyTimeComponent replyTime={last_reply_at} />
            </li>
        );
    }
}

export class ReplyTimeComponent extends Component {

    constructor(props) {

        super(props);
        this.getReplyDateAsString = () => {
            let { replyTime} = this.props;
            return moment(replyTime).locale('zh-cn').fromNow();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.replyTime !== this.props.replyTime;
    }

    render() {
        return (<span className="time">{this.getReplyDateAsString()}</span>);
    }
}


export class UserPictureComponent extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.avatar_url !== this.props.avatar_url;
    }

    render() {
        let {avatar_url} = this.props;
        return (
            <div style={{ backgroundImage: `url(${avatar_url})` }}></div>
        )
    }
}

export class LoadingComponent extends Component {
    render() {
        return (<div className="fetching"></div>)
    }
}