import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

import Messages from '../messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

// let socket;

const Chat = (props) => {
    const location = useParams();
    const navigate = useNavigate();
    const [username_from, setUsername_from] = useState('')
    const [username_to, setUsername_to] = useState('')

    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [flag, setFlag] = useState(0);
    // const ENDPOINT = 'http://localhost:8080';

    // ----  with socket!!!!

    // useEffect(() => {
    //     const { name, room } = location;
    //     socket = io(ENDPOINT);
    //     socket = io(ENDPOINT, {
    //         withCredentials: true,
    //         extraHeaders: {
    //             "my-custom-header": "abcd"
    //         }
    //     })

    //     socket.emit('join', { name, room }, (error) => {
    //         console.log('error', error);
    //         if (error) {
    //             setFlag(1);
    //             alert(error);
    //         }
    //     });
    // }, [ENDPOINT, location]);

    // useEffect(() => {
    //     socket.on('message', message => {
    //         setMessages(messages => [...messages, message]);
    //     });

    //     socket.on("roomData", ({ users }) => {
    //         setUsers(users);
    //     });
    // }, []);
    // ----  with socket!!!!



    useEffect(() => {
        const { username_from, username_to } = location;

        setUsername_to(username_to);
        setUsername_from(username_from)
    }, [location])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            // socket.emit('sendMessage', message, () => setMessage(''));
            fetch(`http://localhost:8080/sendmessage`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, username_from, username_to })
            })
                .then((res) => {
                    console.log('res', res)
                    setMessage('')
                })
                .catch((e) => console.log(e))
        }
    }

    // get messages
    useEffect(() => {
        const { username_from, username_to } = location;
        setUsername_to(username_to);
        setUsername_from(username_from)

        const interval = setInterval(() => {
            fetch('http://localhost:8080/allmessage', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username_from, username_to })
            })
                .then((res) => res.json())
                .then((data) => {
                    setMessages(data)
                    console.log('arr of message', data);
                })
                .catch(e => {
                    if (e) {
                        setFlag(1);
                        alert(e);
                    }
                })

        }, 2000);
        return () => clearInterval(interval);
    }, [])



    useEffect(() => {
        const { username_from, username_to } = location;
        setUsername_to(username_to);
        setUsername_from(username_from)

        fetch('http://localhost:8080/allmessage', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username_from, username_to })
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages(data)
                console.log('arr of message', data);
            })
            .catch(e => {
                if (e) {
                    setFlag(1);
                    alert(e);
                }
            })
    }, [])

    useEffect(() => {
        const { username_from, username_to } = location;
        setUsername_to(username_to);
        setUsername_from(username_from)

        fetch('http://localhost:8080/allmessage', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username_from, username_to })
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages(data)
                console.log('arr of message', data);
            })
            .catch(e => {
                if (e) {
                    setFlag(1);
                    alert(e);
                }
            })
    }, [message])

    if (flag) {
        return (
            navigate('/')
        )
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={username_from + ' ' + username_to} />
                <Messages messages={messages} name={username_from} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;
