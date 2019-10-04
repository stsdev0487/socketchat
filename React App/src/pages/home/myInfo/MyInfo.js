import React, {Component} from 'react';
import {Menu, Dropdown, Icon} from 'antd';
import './my-info.scss';

class MyInfo extends Component {

  handleMenuClick = (e) => {
    const { logout } = this.props;
    switch (e.key) {
      case "3": {
        logout();
      }
    }
  }

  menu = () => {
    return (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="0">
          <span>Setting</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span>Make a group</span>
        </Menu.Item>
        <Menu.Item key="3">
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    )
  };

  render() {
    return (
      <div className="my-info">
        <div className="user-info">
          <div className="avatar">
            <img src="user.png" alt="Me"/>
          </div>
          <span>{this.props.name}</span>
        </div>
        <Dropdown overlay={this.menu} trigger={['click']} placement="bottomRight">
          <span>
            <Icon type="menu"/>
          </span>
        </Dropdown>
      </div>
    )
  }
}

export default MyInfo;
