
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TopicListHeaderComponent, FooterComponent } from './common/CommComponents';
import { getTopics } from '../actions/topicActions';
import { TopicItemComponent } from './common/CommComponents'
class TopicListComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let {dispatch} = this.props;

        dispatch(getTopics(1));
    }

    render() {

        let children;
        if (this.props.isFetching) {
            children = (<div className="fetching"></div>);
        } else {
            let items = this.props.list.map((item, index) => {
                return <TopicItemComponent key={index} {...item} />
            });

            children = (
                <ul data-flex="dir:top main:justify">
                    {items}
                </ul>
            );
        }


        return (
            <div data-flex="dir:top main:justify">
                <TopicListHeaderComponent {...this.props}/>
                <div data-flex-box="1" className="contentWarpper">
                    {children}
                </div>
            </div>
        )

    }
}


export default connect(root => root.topicReducer)(TopicListComponent);