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
          <li><a href="#">文章</a></li>
          <li><a href="#">文章</a></li>
          <li><a href="#">文章</a></li>
          <li><a href="#">文章</a></li>
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

<<<<<<< HEAD
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.avatar_url !== this.props.avatar_url;
    }

    render() {
        let {avatar_url, loginname} = this.props.user;
        return (
            <a href="javascript:;" className="user-link">
                <div style={{ backgroundImage: `url(${avatar_url})` }} ></div>
            </a>
        );
    }
=======
  shouldComponentUpdate(nextProps) {
    return nextProps.avatar_url !== this.props.avatar_url;
  }

  render() {
    const { avatar_url: avatarUrl } = this.props.user;
    return (
      <a href="#" className="userLink">
        <div style={{ backgroundImage: `url(${avatarUrl})` }} ></div>
      </a>
    );
  }
>>>>>>> a8c995faf5b8cc60af9bf4fe359bef3557c71152
}

/**
 * 正在加载组件
 */
export class LoadingComponent extends Component {

  constructor(props) {
    super(props);
    this.render = () => (<div className="fetching"></div>);
  }

}

