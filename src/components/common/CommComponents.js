
import React, { Component } from 'react';
import { getTopics, goBackTopicList } from '../../actions/topicActions';
import { Link } from 'react-router';
import { getTabs, getTabName } from '../../helpers/tabHelper';

import { fromNow } from '../../helpers/dateTimeHelper';




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
        return (<span className="time">{this.getReplyDateAsString() }</span>);
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

