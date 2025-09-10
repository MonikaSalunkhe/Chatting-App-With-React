import React, { useEffect, useState } from 'react'
import { FaYoutube } from 'react-icons/fa6'
import ChatList from './ChatList'
import InputText from './InputText'
import UserLogin from './UserLogin'
import socketIOclient from 'socket.io-client'

const ChatContainer = () => {
  const[user, setUser] = useState(localStorage.getItem('user'));
  const socketio = socketIOclient("http://localhost:3002");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socketio.on("chat", (chats) => {
      setChats(chats);
    });
  });

  const sendToSocket = (chat) => {
    socketio.emit('chat', chat)
  }

  const addMessage = (chat) => {
    const newChat = { 
      ...chat, 
    user: localStorage.getItem("user"),
    avatar: localStorage.getItem("avatar"),
  };
  setChats([...chats, newChat])
  sendToSocket([...chats, newChat])

  };

  const Logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('avatar')
    setUser('')



  }

  return (
    <div>
      {user ? (
      <div>

        <div className='chats-header'>
        <h4> Username : {user} </h4>
        <p>
          <FaYoutube className='chats-icon'/> Code with Monika
        </p>
        <p className='chats-logout' onClick={Logout}>
          <strong>Logout</strong>
        </p>

        </div>
        <ChatList chats= {chats} />
        <InputText addMessage = {addMessage} />
      </div>
      ):(
      <UserLogin setUser = {setUser}/>
    )}
    </div>
  );
};

export default ChatContainer
