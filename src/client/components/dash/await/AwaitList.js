import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SingleAwait } from '../../index';
import { createChat, createChatThunk } from '../../../store/reducers/chat';
import { getLikes, sendLike } from '../../../store/reducers/likes';
import { getUser } from '../../../store/reducers/users';

class AwaitList extends Component {
  constructor() {
    super();
    this.createChat = this.createChat.bind(this);
  }
  async componentDidMount() {
    const userId = this.props.auth.uid;
    this.props.getCurrentUser(userId);
    this.props.getLikes(userId);
  }

  createChat(prospect) {
    let newChat = {
      chatId: `${prospect.userId.slice(4)}${this.props.auth.uid.slic(4)}`,
      name: prospect.name,
      people: {
        prospect: {
          name: prospect.name,
        },
        user: {
          name: this.props.user.name,
        },
      },
      image: prospect.imageUrl,
      messages: [],
    };
    console.log('TCL: AwaitList -> createChat -> newChat ', newChat);
    this.props.createChatThunk(newChat);
  }

  render() {
    if (this.props.prospects.length) {
      const prospects = this.props.prospects;
      return (
        <section className="section">
          <div className="container">
            <h1 className="title is-1">Await</h1>
            <hr />
            {prospects.map(prospect => {
              return (
                <SingleAwait
                  key={prospect.userId}
                  prospect={prospect}
                  createChat={this.createChat}
                  sendLike={this.props.sendLike}
                />
              );
            })}
          </div>
        </section>
      );
    } else {
      return(
        <section className="section">
        <div className="container">
        <h1 className="title is-1">Await</h1>
        <hr />
        <h3 className='title is-3'> No likes yet.</h3>
        </div>
      </section>
      ) 
    }
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chat.chats,
    prospects: state.likes.likes,
    user: state.users.user,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createChatThunk: newChat => dispatch(createChatThunk(newChat)),
    createChatRoom: newChat => dispatch(createChat(newChat)),
    getLikes: userId => dispatch(getLikes(userId)),
    sendLike: userId => dispatch(sendLike(userId)),
    getCurrentUser: userId => dispatch(getUser(userId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AwaitList);
