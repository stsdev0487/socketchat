import React, {Component} from 'react';
import ChatSocketServer from '../../../utils/ChatSocketServer';
import "./ChatList.css";
import ChatUser from "../chat-user/ChatUser";

class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedUserId: null,
      chatListUsers: []
    }
  }

  componentDidMount() {
    const userId = this.props.userId;
    ChatSocketServer.getChatList(userId);
    ChatSocketServer.eventEmitter.on('chat-list-response', this.createChatListUsers);
  }

  componentWillUnmount() {
    ChatSocketServer.eventEmitter.removeListener('chat-list-response', this.createChatListUsers);
  }

  createChatListUsers = (chatListResponse) => {
    if (!chatListResponse.error) {
      let chatListUsers = this.state.chatListUsers;
      if (chatListResponse.singleUser) {
        if (chatListUsers.length > 0) {
          chatListUsers = chatListUsers.filter(function (obj) {
            return obj.id !== chatListResponse.chatList[0].id;
          });
        }
        /* Adding new online user into chat list array */
        chatListUsers = [...chatListUsers, ...chatListResponse.chatList];
      } else if (chatListResponse.userDisconnected) {
        const loggedOutUser = chatListUsers.findIndex((obj) => obj.id === chatListResponse.userid);
        if (loggedOutUser >= 0) {
          chatListUsers[loggedOutUser].online = 'N';
        }
      } else {
        /* Updating entire chat list if user logs in. */
        chatListUsers = chatListResponse.chatList;
      }
      this.setState({
        chatListUsers: chatListUsers
      });
    } else {
      alert(`Unable to load Chat list, Redirecting to Login.`);
    }
    this.setState({
      loading: false
    });
  }

  selectedUser = (user) => {
    console.log("select");
    this.setState({
      selectedUserId: user.id
    });
    this.props.updateSelectedUser(user)
  }

  render() {
    return (
      <div>
        <div>
          {
            this.state.chatListUsers.map((user, index) =>
              <ChatUser
                key={index}
                user={user}
                selected={this.state.selectedUserId === user.id}
                onClickUserItem={this.selectedUser}
                state={user.online}
              />
            )
          }
        </div>
        <div className={`alert 
          ${this.state.loading ? 'alert-info' : ''} 
          ${this.state.chatListUsers.length > 0 ? 'visibility-hidden' : ''}`
        }>
          {this.state.loading || this.state.chatListUsers.length.length === 0 ? 'Loading your chat list.' : 'No User Available to chat.'}
        </div>
      </div>
    );
  }
}

export default ChatList;
