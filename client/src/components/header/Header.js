import React from 'react';
import './Header.css';
import FaceIcon from '@mui/icons-material/Face';
import ChatIcon from '@mui/icons-material/Chat';
import loveIcon2 from '../../img/loveIcon2.png';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const Header = ({ username }) => {
    return (
        <section className='header-container'>
            <Link to='profile'>
                <IconButton>
                    <FaceIcon className='icon' fontSize='large' />
                </IconButton>
            </Link>
            <Link to='PeopleCards'>
                <img className='loveIcon' src={loveIcon2} alt='love Icon' />
            </Link>
            <Link to={`messenger/${username}`}>
                <IconButton>
                    <ChatIcon className='icon' fontSize='large' />
                </IconButton>
            </Link>
        </section>
    )
}
export default Header;