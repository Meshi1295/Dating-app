import React, { useEffect, useState } from 'react';
import './PeopleCards.css';
import PeopleCard from 'react-tinder-card'
import ButtonsArea from '../buttonsArea/ButtonsArea';

const PeopleCards = (props) => {
    const { username } = props
    const [people, setPeople] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/users')
            .then((res) => res.json())
            .then((data) => {
                setPeople(data)
            })
            .catch((e) => console.log(e))
    }, [])


    return (
        <>
            <div className='cardContainer'>
                {people.map(person => (
                    <PeopleCard
                        className='swipe'
                        key={person.user_id}
                        // to control swiping out of screen.
                        preventSwipe={['up', 'down']}
                    >
                        <div
                            className='card'
                            // re-render css with js - nice!                            
                            style={
                                { backgroundImage: `url(http://localhost:8080/uploads/${person.profileimg})` }}
                        >
                            <h3 className='personName'>
                                {person.firstname + ' ' + person.lastname}
                            </h3>
                        </div>

                        <ButtonsArea
                            currentlyLogged={username}
                            userExist={person.username}
                        />

                    </PeopleCard>
                ))
                }
            </div >

        </>
    )
}

export default PeopleCards;