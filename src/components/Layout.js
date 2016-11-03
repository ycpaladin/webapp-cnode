import React, { Component } from 'react';
import { Link } from 'react-router';
import Load from './LoadComponent';
import { FooterComponent } from './common/CommComponents';
export default class Layout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-flex="dir:top main:justify">
                <div data-flex-box="1" data-flex="dir:top main:justify">
                    {this.props.children}
                </div>
               
            </div>
        );
    }



}