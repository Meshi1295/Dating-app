import React from 'react';
import './Messages.css';
import Message from '../message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom className="messages" >
            {messages.map((message, i) =>
                // console.log('message', message)
                <div key={i} >
                    <Message message={message} name={name} />
                </div>
            )}
        </ScrollToBottom>
    )
}

export default Messages;