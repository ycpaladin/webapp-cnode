import React, { Component } from 'react';


/**
 * 用户头像组件
 */
export default class UserPictureComponent extends Component {

  constructor(props) {
    super(props);
    this.scrollElement = document.getElementById('contentWarpper');
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
    if (self.userIcon !== undefined && self.scrollElement != null) {
      self.scrollElement.addEventListener('scroll', this.showUserIcon, true);
    }
  }

  componentWillUnmount() {
    if (this.scrollElement != null) {
      this.scrollElement.removeEventListener('scroll', this.showUserIcon, true);
    }
  }

}
