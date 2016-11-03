
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTopicById, goBackTopicList } from '../actions/topicActions';
import { Link } from 'react-router';
import { fromNow } from '../helpers/dateTimeHelper';

import { TopicHeaderComponent, UserPictureComponent, ReplyListComponent } from './common/CommComponents';

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
                    <a href="javascript:;">{author.loginname}</a>
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