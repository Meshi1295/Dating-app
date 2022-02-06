import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

const Message = (
    { message: { message, username_from, username_to, message_date }, name }
) => {

    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if (username_from === trimmedName) {
        isSentByCurrentUser = true;
    }

    // convert time
    let timeStep = Date.parse(message_date);
    let date = new Date(timeStep * 1000);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let time = hours + ':' + minutes + ':' + seconds



    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer" >
                    <div className='time-name'>
                        <p className="sentText pr-10"><em>{trimmedName}</em></p>
                        <small className="sentText pr-10">{time}</small>
                    </div>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(message)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer ">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(message)}</p>
                    </div>
                    <div className='time-name'>
                        <p className="sentText pl-10 ">{username_from}</p>
                        <small className="sentText pr-10">{time}</small>
                    </div>
                </div>
            )
    );
}

export default Message;