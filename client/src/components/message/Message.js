import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { message, username_from, username_to, message_date }, name }) => {

    console.log({ message: { message, username_from, username_to }, name });

    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();
    console.log('trimmedName', trimmedName);

    if (username_from === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{trimmedName} {message_date}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(message)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <p className="sentText pr-10">{message_date}</p>
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(message)}</p>
                    </div>
                    <p className="sentText pl-10 ">{username_from}</p>
                </div>
            )
    );
}

export default Message;