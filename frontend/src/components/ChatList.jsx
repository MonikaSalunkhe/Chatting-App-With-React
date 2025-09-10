import React from 'react'
import'../style.css'

const ChatList = ({chats}) => {
  const user = localStorage.getItem('user')
  function SenderChat ({message, username, avatar}){
    return(
      <div className='chat-sender'>
        
        <img src={avatar} alt="" />
        <p> 
          <strong>{username}</strong><br/>
          {message}
          
        </p>

      </div>
    )
  }
   function ReceiverChat ({message, username, avatar}){
    return(
      <div className='chat-receiver'>
        
        <img src={avatar} alt="" />
        <p> 
          <strong>{username}</strong><br/>
          {message}
        </p>

      </div>
    )
  }
  return (
    <div className='chats-list'>
      {
        chats.map((chat, index) => {

          if(chat.user === user){
            return <SenderChat 
            key = {index}
            message = {chat.message}
            username = {chat.user}
            avatar = {chat.avatar}/>
            
          }
           return <ReceiverChat 
            key = {index}
            message = {chat.message}
            username = {chat.user}
            avatar = {chat.avatar}/>

        })
      }
      
      
    </div>
  )
}

export default ChatList
