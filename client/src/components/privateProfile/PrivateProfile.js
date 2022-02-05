import React, { useEffect, useState } from 'react';
import './PrivateProfile.css'
import axios from 'axios';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import IconButton from '@mui/material/IconButton';

const PrivateProfile = (props) => {

    const [show, setShow] = useState({
        showAge: false,
        showJob: false,
        showContent: false
    })

    const [age, setAge] = useState('')
    const [job, setJob] = useState('')
    const [content, setContent] = useState('')
    const { username } = props
    const [userData, setUserData] = useState([])
    const [imgValue, setImgValue] = useState('')

    const setProfileImg = async () => {
        console.log("image", imgValue);
        const formData = new FormData();
        formData.append("image", imgValue);
        formData.append("username", username);

        try {
            const data = await axios.post(
                'http://localhost:8080/api/setImg',
                formData
            );
            setUserData(data.data)

        } catch (e) {
            console.log(e);
        }
    }

    const setUserInfo = () => {
        console.log('im in');
        fetch(`http://localhost:8080/private-info-page/${username}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ age, job, content })
        })
            .then((res) => {
                console.log('res', res)
            })
            .catch((e) => console.log(e))
    }
    console.log('userData', userData);
    // get user data
    useEffect(() => {
        fetch(`http://localhost:8080/infoUsers/${username}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data)
            })
            .catch((e) => console.log(e));
    }, [])

    useEffect(() => {
        setUserInfo()
    }, [age, job, content])


    return (
        <>
            {userData.length ? (userData.map(user => {
                return <div className='profile-container' key={user.user_id}>
                    <div className='user-img'>
                        <img
                            alt="img profile"
                            className='profile-img'
                            src={`http://localhost:8080/uploads/${user.profileimg}`}
                            style={{ width: '35%' }}
                        />
                    </div>
                    <div className='img-btn'>
                        <input
                            type="file"
                            name="image"
                            accept=".jpg"
                            onChange={(e) => setImgValue(e.target.files[0])}
                        />
                        <button onClick={() => setProfileImg()}>submit</button>
                    </div>

                    <label>
                        <span style={{ fontSize: '29px' }}>
                            {user.firstname}</span>, {age}
                        {
                            show.showAge ? <input
                                style={{ width: 40 }}
                                type='number'
                                onKeyDown={(e) => e.key === "Enter" ? setAge(e.target.value)
                                    || setShow(!show.showAge) : ''} /> : null
                        }

                        <IconButton onClick={() => setShow({ showAge: !show.showAge })}>
                            <EditTwoToneIcon />
                        </IconButton>
                    </label>

                    <p className='job'> My job in : {job} {userData.job}
                        {
                            show.showJob ? <input
                                style={{ width: 40 }}

                                onKeyDown={(e) => e.key === "Enter" ? setJob(e.target.value)
                                    || setShow(!show.showJob) : ''} /> : null
                        }
                        <IconButton onClick={() => setShow({ showJob: !show.showJob })}>
                            <EditTwoToneIcon />
                        </IconButton>
                    </p>


                    <p className='about-myself'>Content about myself : {userData.content}
                        {
                            show.showContent ? <input
                                style={{ width: 40 }}

                                onKeyDown={(e) => e.key === "Enter" ? setContent(e.target.value)
                                    || setShow(!show.showContent) : ''} /> : null
                        }
                        <IconButton onClick={() => setShow({ showContent: !show.showContent })}>
                            <EditTwoToneIcon />
                        </IconButton>
                    </p>
                </div>
            })) : (null)}
        </>
    )
}
export default PrivateProfile;
