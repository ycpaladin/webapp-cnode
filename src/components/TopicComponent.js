
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTopicById, goBackTopicList } from '../actions/topicActions';
import {Link} from 'react-router';
import {getHistory} from '../configureStore';
import {TopicHeaderComponent} from './common/CommComponents';

class TopicComponent extends Component {
    constructor(props) {
        super(props);

        this.goBacktoTopicList = e => {
            let { dispatch} = this.props;
            dispatch(goBackTopicList());
            let history = getHistory();
            history.goBack();
            // let history
        }
    }

    componentWillMount() {
        let {dispatch, routeParams: { id}} = this.props;

        dispatch(getTopicById(id));
    }

    render() {
        let {routeParams: { tab}, isFetching, topic: {title}} = this.props;
        let children;
        if (isFetching) {
            children = (<div className="fetching"></div>);
        }
        return (<div data-flex="dir:top main:justify">
            <TopicHeaderComponent title={title} tab={tab}/>
            <div data-flex-box="1" className="contentWarpper" >
                {children}
            </div>
        </div>);


        // <a href="javascript:;" onClick={e => this.goBacktoTopicList(e)}>goBack</a>
        // return <Link to="/" >goBack</Link>
    }
}

export default connect(r => r.topicReducer)(TopicComponent);