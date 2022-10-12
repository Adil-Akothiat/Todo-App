import React from 'react';

export default function User (props) {
    return (
        <div className='user'>
            <div className='blurbg'></div>
            <div className='user_info'>
                <h2>
                    ENTER YOUR NAME
                </h2>
                <input 
                type={'text'} 
                id='user_id' 
                name='username' 
                placeholder='Enter Your Name'
                maxLength={20}
                />
                <button onClick={props.onClick}>
                    submit
                </button>
            </div>
        </div>
    );
}