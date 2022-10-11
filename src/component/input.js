import React from 'react';

function Input (props) {
    return (
        <div className='todo_input'>
            <span className='submit' onClick={props.onClick}></span>
            <input 
            type={'text'} 
            name='todo' 
            id='task_id' 
            placeholder='Create a new todo...' 
            onKeyDown={props.onKeyDown}
            maxLength='40'
            />
        </div>
    );
}

export default Input;