import React, { useState } from 'react';
import './ButtonsArea.css'
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

const ButtonsArea = (props) => {
    const { currentlyLogged, userExist } = props

    return (
        <div className='buttonsContainer' >
            <IconButton className='btn replayIcon'>
                <ReplayIcon fontSize='small' />
            </IconButton>

            <IconButton className='btn closeIcon'>
                <CloseIcon fontSize='small' />
            </IconButton>

            <Link onClick={event => (!currentlyLogged || !userExist) ? event.preventDefault() : null}
                to={`/chat/${currentlyLogged}/${userExist}`}>
                <IconButton
                    className='btn favoriteIcon'
                >
                    <FavoriteBorderIcon fontSize='small' />
                </IconButton>
            </Link>
        </div>
    )
}

export default ButtonsArea;