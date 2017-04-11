import React, { Component } from 'react';

export default class Layout extends Component {

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
