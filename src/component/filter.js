import React from 'react';

function Filter (props) {
    return (
        <div className='filter'>
            <button className='btn_filter focus' onClick={props.onClick}>All</button>
            <button className='btn_filter' onClick={props.onClick}>Active</button>
            <button className='btn_filter' onClick={props.onClick}>Completed</button>   
        </div>
    );
}

export default Filter;