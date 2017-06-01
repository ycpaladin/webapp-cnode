import React, { Component } from 'react';
import fromNow from '../../helpers/dateTimeHelper';


/**
 * 公共的脚部分
 */
export class FooterComponent extends Component {
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


/**
 * 回复时间组件
 */
export class ReplyTimeComponent extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.replyTime !== this.props.replyTime;
  }

  render() {
    const { replyTime } = this.props;
    return (<span className="time">{fromNow(replyTime)}</span>);
  }
}

/**
 * 用户头像组件
 */
export class UserPictureComponent extends Component {

  constructor(props) {
    super(props);
    this.scrollElement = document.getElementById('contantWarpper');
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.avatar_url !== this.props.avatar_url;
  }

  render() {
    const { user: { avatar_url: avatarUrl }, page } = this.props;
    const headIcon = page === 1 ?
      <div style={{ backgroundImage: `url(${avatarUrl})` }} /> :
      <div ref={(c) => { this.userIcon = c; }} />;
    return (
      <a href="" className="user-link">
        {headIcon}
      </a>
    );
  }


  componentDidMount() {
    const { avatar_url: avatarUrl } = this.props.user;
    const self = this;
    this.showUserIcon = (e) => {
      const { scrollTop, offsetHeight } = e.target;
      const { offsetTop } = self.userIcon;
      if (offsetTop >= scrollTop && offsetTop < (scrollTop + offsetHeight)) {
        self.userIcon.style.backgroundImage = `url(${avatarUrl})`;
        self.scrollElement.removeEventListener('scroll', self.showUserIcon, true);
      }
    };
    if (self.userIcon !== undefined) {
      self.scrollElement.addEventListener('scroll', this.showUserIcon, true);
    }
  }

  componentWillUnmount() {
    this.scrollElement.removeEventListener('scroll', this.showUserIcon, true);
  }

}

/**
 * 正在加载组件
 */
export class LoadingComponent extends Component {

  constructor(props) {
    super(props);
    this.render = () => (<div className="fetching" />);
  }
}

