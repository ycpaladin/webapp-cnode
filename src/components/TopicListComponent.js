
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TopicListHeaderComponent, FooterComponent } from './common/CommComponents';
import { getTopics } from '../actions/topicActions';
import { TopicItemComponent } from './common/CommComponents'

class TopicListComponent extends Component {

    constructor(props) {
        super(props);
        this.handScroll = ({ target: { scrollHeight, scrollTop, clientHeight}}) => {
            if (scrollTop + clientHeight >= scrollHeight) {
                let {dispatch, page, tab} = this.props;
                dispatch(getTopics(page + 1, tab));
            }
        }
    }


    componentWillMount() {
        let {dispatch, shouldFetch} = this.props;
        if (shouldFetch) {
            dispatch(getTopics(1));
        }
    }
    

    render() {

        let children;
        if (this.props.isFetching && this.props.page === 1) {
            children = (<div className="fetching"></div>);
        } else {
            let items = this.props.list.map((item, index) => {
                return <TopicItemComponent key={index} {...item} currentTab={this.props.tab} />
            });

            children = (
                <ul data-flex="dir:top main:justify">
                    {items}
                </ul>
            );
        }


        return (
            <div data-flex="dir:top main:justify">
                <TopicListHeaderComponent {...this.props} />
                <div data-flex-box="1" className="contentWarpper" onScroll={e => this.handScroll(e)}>
                    {children}
                </div>
            </div>
        );
    }

    componentDidUpdate(){
        document.getElementsByClassName('contentWarpper')[0].scrollTop = parseInt(window.localStorage["topicListScrollHeight"]) || 0;
    }
}


export default connect(root => root.topicListReducer)(TopicListComponent);