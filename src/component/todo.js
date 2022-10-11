import React from 'react';
import {ReactComponent as CrossIcon} from '../Assets/icon-cross.svg';
const SERVER_URL_API = 'https://'+require('../adil/akothiat/issam/__txt__').default.split('²')[1]+'.firebaseio.com/todo/';

function Todo (props) {
    function clickHandler (e) {
        let parent = e.target.parentElement;
        parent.style.transition='all 500ms ease';
        parent.style.transform='translateY(-20px)';
        parent.style.opacity='0.1';
        parent.addEventListener('transitionend', async()=> {
            return await fetch(SERVER_URL_API+e.target.id+'.json', {
                method: 'Delete',
                headers: {
                    'content-Type':'application/json'
                }
            }).then(()=> console.log('Todos load success!')).catch(()=> console.log('Tods fails to load. Please reload the page!'));
        })
    }
    function dragOverHandler (e) {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        if(e.target.classList.contains('todo')) {
            const todosContainer = document.querySelector('.todos');
            todosContainer.insertBefore(dragging, e.target);
        }
    }
    function touchStartHandler (e) {
        const {target} = e;
        if(target.classList.contains('todo')) {
            target.classList.add('touching');
        }
    }
    function touchEndHandler (e) {
        const {target} = e;
        if(target.classList.contains('todo')) {
            target.classList.remove('touching');
        }
    }
    function touchMoveHandler (e) {
        const touch = e.nativeEvent.touches[0] || e.nativeEvent.changedTouches[0];
        const y = touch.clientY;
        const offset = e.target.getBoundingClientRect().y - y;
        const touching = document.querySelector('.touching');
        if(e.target.classList.contains('todo')) {
            const todosContainer = document.querySelector('.todos');
            if(offset >= 0 &&  e.target.previousElementSibling) {
                todosContainer.insertBefore(touching, e.target.previousElementSibling);
            } 
        }
    }
    return (
        <div 
        className='todos mode'
        >
            {props.data.todos.map((todo)=> {
                if(todo.completed) {
                    return (
                        <div 
                            key={todo.id} 
                            className='todo' 
                            draggable='true' 
                            onDragStart={e=> {
                                if(e.target.classList.contains('todo')) {
                                    e.target.classList.add('dragging');
                                }
                            }} 
                            onDragEnd={e=> {
                                if(e.target.classList.contains('todo')) {
                                    e.target.classList.remove('dragging')
                                }
                            }} 
                            onDragOver={dragOverHandler}
                            onTouchStart={touchStartHandler}
                            onTouchEnd={touchEndHandler}
                            onTouchMove = {touchMoveHandler}
                            >
                            <span className='check_complete complete' onClick={props.updateHandler} id={todo.id}></span>
                            <h3 className='task line'>{todo.task[0].toUpperCase() + todo.task.substr(1)}</h3>
                            <button className='remove' onClick={clickHandler} id={todo.id}>
                                <CrossIcon style={{pointerEvents:'none'}}/>
                            </button>
                        </div>
                    );
                }else {
                    return (
                        <div 
                            key={todo.id} 
                            className='todo' 
                            draggable='true' 
                            onDragStart={e=> {
                                if(e.target.classList.contains('todo')) {
                                    e.target.classList.add('dragging');
                                }
                            }} 
                            onDragEnd={e=> {
                                if(e.target.classList.contains('todo')) {
                                    e.target.classList.remove('dragging')
                                }
                            }} 
                            onDragOver={dragOverHandler}
                            onTouchStart={touchStartHandler}
                            onTouchEnd={touchEndHandler}
                            onTouchMove = {touchMoveHandler}
                            >
                            <span className='check_complete' onClick={props.updateHandler} id={todo.id}></span>
                            <h3 className='task'>{todo.task[0].toUpperCase() + todo.task.substr(1)}</h3>
                            <button className='remove' onClick={clickHandler} id={todo.id}>
                                <CrossIcon style={{pointerEvents:'none'}}/>
                            </button>
                        </div>
                    );
                }
            })}
            <div className='count'>
                {props.data.c > 1 ? <span>{props.data.c} items left</span> : <span>{props.data.c} item left</span>}
                <div className='filter_'>
                    <button className='btn_filter focus' onClick={props.onClick}>All</button>
                    <button className='btn_filter' onClick={props.onClick}>Active</button>
                    <button className='btn_filter' onClick={props.onClick}>Completed</button>
                </div>
                <span onClick={props.handleClear} className="clear">Clear Completed</span>
            </div>
        </div>
    );
}
export default Todo;
