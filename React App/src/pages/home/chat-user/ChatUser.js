import React, {Component} from 'react';
import "./ChatUser.scss";

class ChatUser extends Component {
  render() {
    const { user, selected, onClickUserItem } = this.props;
    return(
      <div className={selected?"user-item active":"user-item"} onClick={() => onClickUserItem(user)}>
        <div className="user-info">
          <div className="avatar">
            <img src="user.png" alt="User" />
          </div>
          <div className="username-message">
            <span>{user.username}</span>
            <span>Hi. How are you?</span>
          </div>
        </div>
        <div className="updated-time">
          <span>10m</span>
        </div>
      </div>
    )
  }
}

export default ChatUser;
