import React, { Component } from 'react';
import { IndexRoute, Route, Router } from 'react-router';
import Layout from './components/Layout';
import TopicListComponent from './components/TopicListComponent';

export default class Routers extends Component {

    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={TopicListComponent} />

                </Route>
            </Router>
        )

    }
}