/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import ChatSocketServer from '../../utils/ChatSocketServer';
import ChatHttpServer from '../../utils/ChatHttpServer';

import ChatList from './chat-list/ChatList';
import Conversation from './conversation/Conversation';

import './Home.css';
import MyInfo from "./myInfo/MyInfo";

class Home extends Component {
  userId = null;
  state = {
    isOverlayVisible: true,
    username: '______',
    selectedUser: null
  }

  logout = async () => {
    try {
      await ChatHttpServer.removeLS();
      ChatSocketServer.logout({
        userId: this.userId
      });
      ChatSocketServer.eventEmitter.on('logout-response', (loggedOut) => {
        this.props.history.push(`/`);
      });
    } catch (error) {
      console.log(error);
      alert(' This App is Broken, we are working on it. try after some time.');
      throw error;
    }
  }

  setRenderLoadingState = (loadingState) => {
    this.setState({
      isOverlayVisible: loadingState
    });
  }

  async componentDidMount() {
    try {
      this.setRenderLoadingState(true);
      this.userId = await ChatHttpServer.getUserId();
      const response = await ChatHttpServer.userSessionCheck(this.userId);
      if (response.error) {
        this.props.history.push(`/`)
      } else {
        this.setState({
          username: response.username
        });
        ChatHttpServer.setLS('username', response.username);
        ChatSocketServer.establishSocketConnection(this.userId);
      }
      this.setRenderLoadingState(false);
    } catch (error) {
      this.setRenderLoadingState(false);
      this.props.history.push(`/`)
    }
  }

  updateSelectedUser = (user) => {
    this.setState({
      selectedUser: user
    });
  }

  getChatListComponent() {
    return this.state.isOverlayVisible ? null : <ChatList userId={this.userId}
                                                          updateSelectedUser={this.updateSelectedUser}
                                                          logout={this.logout} />
  }

  getChatBoxComponent = () => {
    return this.state.isOverlayVisible ? null : <Conversation userId={this.userId} newSelectedUser={this.state.selectedUser}/>
  }

  render() {
    return (
      <div className="App">
        <div className = {`${this.state.isOverlayVisible ? 'overlay': 'visibility-hidden' } `}>
          <h1>Loading</h1>
        </div>

        <div role="main" className="content" >
          <div className="chat-list-container">
            <MyInfo name={this.state.username} logout={this.logout} />
            {this.getChatListComponent()}
          </div>
          <div>
            {this.getChatBoxComponent()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home)
