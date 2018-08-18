import React, { Component } from 'react';
import axios from 'axios';
import Messages from './Messages.jsx';
import Chatbox from './Chatbox.jsx';
import socketIOClient from 'socket.io-client';

class Chatroom extends Component {
  constructor() {
    super();

    const socket = socketIOClient('http://localhost:3000');
    socket.on('send', (msg) => {
      this.setState({
        messages: [...this.state.messages, msg]
      });
    });

    this.state = {
      messages: []
    };
  };

  componentDidMount() {
    this.fetchMessages();
  }

  fetchMessages() {
    axios.get('/api/messages').then(({ data }) => {
      this.setState({
        messages: data
      })
    }).catch(err => {
      console.log('error fetching messages', err);
    })
  }
  
  render() {
    return (
      <div>
        <div>
          CHATTERBOX
        </div>
        <Messages messages={this.state.messages} />
        <Chatbox />
      </div>
    )
  }
};

export default Chatroom;
