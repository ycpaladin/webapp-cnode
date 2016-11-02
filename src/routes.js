import React, { Component } from 'react';
import { IndexRoute, Route, Router } from 'react-router';
import Layout from './components/Layout';
import TopicListComponent from './components/TopicListComponent';
import TopicComponent from './components/TopicComponent';

export default class Routers extends Component {

    constructor(props) {
        super(props);

        this.topicListOnEnter = (e) => {
            console.log('===================>',e);
        }

        this.topicListOnLeave = () => {
            window.localStorage["topicListScrollHeight"] = document.getElementsByClassName('contentWarpper')[0].scrollTop;
        }
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={TopicListComponent}  onLeave={this.topicListOnLeave} onEnter={e=> this.topicListOnEnter(e)} />
                    <Route path='topic/:tab/:id' component={TopicComponent} />
                </Route>
            </Router>
        )

    }


}