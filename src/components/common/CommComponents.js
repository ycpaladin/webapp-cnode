
import React, { Component } from 'react';
import { getTopics} from '../../actions/topicActions';
export class HeaderComponent extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <header data-flex="dir:left; " data-flex-box="0">
                <span id="backBtn"><a href="javascript:;">返回</a></span>
                <header data-flex-box="1">标题</header>
                <span id="toolBtn"><a href="javascript:;">...</a></span>
            </header>
        );
    }
}


export class TopicListHeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.handClick = (tab) => {
            if (tab !== this.props.tab) {
                let {dispatch} = this.props;
                dispatch(getTopics(1, tab));
            }

        }
    }

    render() {
        return (
            <header data-flex="dir:left; " data-flex-box="0">
                <ul data-flex="dir:left box:mean">
                    <li className={ this.props.tab == 'all' ? 'currentTab' : ''}><a href="javascript:;" onClick={ e => this.handClick('all') } >全部</a></li>
                    <li className={ this.props.tab == 'good' ? 'currentTab' : ''}><a href="javascript:;" onClick={ e => this.handClick('good') } >精华</a></li>
                    <li className={ this.props.tab == 'share' ? 'currentTab' : ''}><a href="javascript:;" onClick={ e => this.handClick('share') } >分享</a></li>
                    <li className={ this.props.tab == 'ask' ? 'currentTab' : ''}><a href="javascript:;" onClick={ e => this.handClick('ask') }>问答</a></li>
                    <li className={ this.props.tab == 'job' ? 'currentTab' : ''}><a href="javascript:;" onClick={ e => this.handClick('job') }>招聘</a></li>
                </ul>

            </header>
        );
    }
}


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


export class TopicItemComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <li>{ this.props.title}</li>
        );
    }
}


export class LoadingComponent extends Component {


    render() {

        return (<div className="fetching"></div>)

    }
}