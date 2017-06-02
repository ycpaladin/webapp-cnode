import React, { Component } from 'react';
/**
 * 公共的脚部分
 */
export default class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.render = () => (
      <footer data-flex-box="0">
        <ul data-flex="dir:left; box:mean">
          <li><a href="">文章</a></li>
          <li><a href="">文章</a></li>
          <li><a href="">文章</a></li>
          <li><a href="">文章</a></li>
        </ul>
      </footer>
    );
  }
}
