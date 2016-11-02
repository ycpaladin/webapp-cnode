
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTopicById, goBackTopicList } from '../actions/topicActions';
// import {Link} from 'react-router';

class TopicComponent extends Component {
    constructor(props) {
        super(props);

        this.goBacktoTopicList = e => {
            let { dispatch} = this.props;
            dispatch(goBackTopicList());
        }
    }

    componentWillMount() {
        let {dispatch, routeParams: { id}} = this.props;

        dispatch(getTopicById(id));
    }

    render() {
        return <a href="javascript:;" onClick={e => this.goBacktoTopicList(e)}>goBack</a>

    }
}

export default connect(r => r.topicReducer)(TopicComponent);