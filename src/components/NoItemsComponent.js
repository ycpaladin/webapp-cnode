import React, { Component } from 'react';

export default class NoItems extends Component {
  constructor(props) {
    super(props);
    this.runder = () => (<tr> <td colSpan="4">没有找到数据!</td> </tr>);
  }

}
