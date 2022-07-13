import React from 'react'
import "./Story.css"
const Story = () => {
    return (
        <div className='story_main-container'>
            <div className='story_bg__image'>
                <img id="bg__story" src='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' alt='story' />
            </div>
            <div className='story__overlay'>
                <div className='story_user__image'>
                    <img id="userimage__story" src='https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' alt='story' />
                </div>
                <div className='story_user__name'>
                    Ouday
                </div>
            </div>
        </div>
    )
}

export default Story