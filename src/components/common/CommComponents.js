
import React, { Component } from 'react';

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