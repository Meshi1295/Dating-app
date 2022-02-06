import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import onlineIcon from '../../icons/onlineIcon.png';

import './Messenger.css';

const Messenger = (props) => {
    const [users, setUsers] = useState([])
    const userName = useParams();

    useEffect(() => {
        const { login_username } = userName;

        fetch('http://localhost:8080/usersmessages', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login_username })
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data)
                console.log('arr of users', data);
            })
            .catch(e => {
                console.log(e);
            })
    }, [])

    return (
        <>
            <div className="textContainer">
                <div className="activeContainer">
                    <h1>Messenger</h1>
                    <h2>
                        {
                            users.map(({ username_to, count, username_from }) => {
                                return <Link to={`/chat/${username_from}/${username_to}`}
                                    key={username_to}
                                >
                                    <div className="activeItem">
                                        {username_to} {count}
                                        <img alt="Online Icon" src={onlineIcon} />
                                    </div>
                                </Link>
                            })
                        }
                    </h2>
                </div>
            </div>
        </>
    )
};

export default Messenger;
