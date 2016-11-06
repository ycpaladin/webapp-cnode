
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTopicById, goBackTopicList } from '../actions/topicActions';
import { Link } from 'react-router';
import { fromNow } from '../helpers/dateTimeHelper';
import { getTabs, getTabName } from '../helpers/tabHelper';
import { UserPictureComponent} from './common/CommComponents';

class TopicComponent extends Component {
    constructor(props) {
        super(props);


    }

    componentWillMount() {
        let {dispatch, routeParams: { id}} = this.props;

        dispatch(getTopicById(id));
    }

    render() {
        let {routeParams: { tab}, isFetching, topic} = this.props;
        let children;
        if (isFetching) {
            children = (<div className="fetching"></div>);
        } else if (topic !== null) {
            let {title, author, create_at, visit_count, content, replies } = topic;
            children = (<div className="topicContent">
                <div className="header">
                    <h1>{title}</h1>
                    <UserPictureComponent user={author} />
                    <a href="javascript:;" className="user-link">{author.loginname}</a>
                    <span className="createAt">发布于{fromNow(create_at) }，</span>
                    <span className="visitCount">{visit_count}次浏览</span>
                    <i className="icon iconfont">&#xe6a0; </i>
                </div>
                <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>

                <ReplyListComponent replies={replies}/>

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

                <a href="javascript:;" onClick={e => this.goBacktoTopicList(e) } className="backBtn">
                    <i className="icon iconfont">&#xe697; </i>
                    <span> {tabName}</span>
                </a>
            </header>
        );
    }
}



export class ReplyListComponent extends Component {

    constructor(props) {
        super(props);


    }

    render() {
        let { replies } = this.props;

        let children = replies.map((item, index) => {

            return (<ReplyItemComponent key={index} index={index+1} {...item} />);
        })
        return (
            <div  className="replyList">
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
        let { author, create_at, content, index} = this.props;
        return (
            <li>
                
                <UserPictureComponent user={author} />
                
                <div className="info-header">
                    <span className="layer-number">{index}楼</span>
                    <a href="javascript:;" className="user-link">{ author.loginname}</a>
                    <a href="javascript:;" className="good">
                        <i className="icon iconfont">&#xe717;</i>
                    </a>
                </div>
                <div className="reply-date">
                    发布于{ fromNow(create_at) }
                </div>
                <div className="info-content" dangerouslySetInnerHTML={{ __html: content }}>

                </div>
            </li>
        );

    }
}