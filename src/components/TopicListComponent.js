
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HeaderComponent, FooterComponent } from './common/CommComponents';
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

        let items = this.props.list.map((item, index) => {
            return <TopicItemComponent key={index} {...item} />
        });
        return (
            <div data-flex="dir:top main:justify">
                <HeaderComponent />
                <div data-flex-box="1" className="contentWarpper">
                    <ul data-flex="dir:top main:justify">
                        {items}
                    </ul>
                </div>
            </div>
        )

    }
}


export default connect(root => root.topicReducer)(TopicListComponent);