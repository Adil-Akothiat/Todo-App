import Todo from './component/todo';
import Header from './component/header';
import Input from './component/input';
import Filter from './component/filter';
import HandleMessage from './component/handleMessage';
import User from './component/user';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ViewUsers from './component/viewUser';
const SERVER_URL_API = 'https://'+require('./adil/akothiat/issam/__txt__').default.split('²')[1]+'.firebaseio.com';
function App() {
  const [todolist, setTodoList] = useState([]);
  const [count, setCount] = useState(0);
  const [choose, setChoose] = useState('All');
  const [message, setMessage] = useState(false);
  const [user, setUser] = useState(true);
  const [userState, setUserState] = useState(false);

  function keyDownHandler (e) {
    if(e.key==='Enter') {
      submitTodo(e.target);
    }
  }
  async function submitTodo (todo) {
    if(todo.value) {
      await fetch(SERVER_URL_API+'/todo.json', {
        method: 'POST',
        body: JSON.stringify({
          task: todo.value,
          completed: false
        }),
        headers : {
          'content-Type':'application/json'
        }
      }).then(()=> console.log('Todos load success!')).catch(()=> console.log('Tods fails to load. Please reload the page!'));
      setMessage(false);
    }else {
      setMessage(true);
    }
    todo.value='';
  }
  function displayTodos () {
    try {
      fetch(SERVER_URL_API+'/todo.json').then(response=> response.json())
      .then(todo=> {
        let todoCounted = [];
        let todos = [];
        for(let key in todo) {
            const task = {
                id: key,
                ...todo[key]
            }
            todoCounted.push(task);
            todos.push(task);
        }
        if(choose === 'Completed') {
          setTodoList(todos.filter(t=> t.completed === true));
          setCount(todoCounted.filter(t=> t.completed ===true).length);
        }else if(choose === 'Active') {
          setTodoList(todos.filter(t=> t.completed === false));
          setCount(todos.filter(t=> t.completed === false).length);
        }else {
          setTodoList(todos);
          setCount(todoCounted.length);
        }
      });
    }catch(err) {
      console.log('todos fails to load. Please reload the page!');
    }
  }
  displayTodos();
  function onClickHandleFilter (e) {
    const btns = document.querySelectorAll('.btn_filter');
    btns.forEach(btn=> btn.classList.remove('focus'));
    e.target.classList.add('focus');
    setChoose(e.target.textContent);
    try{
      fetch(SERVER_URL_API+'/todo.json').then(response=> response.json())
      .then(todo=> {
        let todoCounted = [], todos = [];
        for(let key in todo) {
          const task = {
            id: key,
            ...todo[key]
          }
          todoCounted.push(task);
          todos.push(task);
        }
        if(e.target.textContent === 'Completed') {
          setTodoList(todos.filter(t=> t.completed === true));
          setCount(todoCounted.filter(t=> t.completed ===true).length);
        }else if(e.target.textContent === 'Active') {
          setTodoList(todos.filter(t=> t.completed === false));
          setCount(todos.filter(t=> t.completed === false).length);
        }else {
          setTodoList(todos);
          setCount(todos.length);
        }
      })
    }catch(err) {
      console.log('Tods fails to load. Please reload the page!');
    }

  }
  function updateCompleted (e) {
    e.target.classList.toggle('complete');
    let completed = false;
      e.target.classList.contains('complete')?completed = true:completed=false;
      try {
        fetch(SERVER_URL_API+'/todo/'+e.target.id+'.json', {
          method : 'PATCH',
          headers : {
            'content-Type':'application/json'
          },
          body : JSON.stringify({completed: completed})
        })
      }catch(err) {
        console.log(err);
    }
  }
  function updateActive (e) {
    submitTodo(e.target.nextElementSibling);
  }
  function clearCompleted (e) {
    e.target.classList.toggle('focus');
    try {
      document.querySelectorAll('.complete').forEach(btn=> {
        fetch(SERVER_URL_API+'/todo/'+btn.id+'.json', {
          method:'Delete',
          headers: {
            'content-Type':'application/json'
          }
        })
      })
    }catch(err) {
      console.log(err);
    }
  }
  // mode
  const [mode, setMode] = useState('light');
  const mainContent = useRef(null);
  useEffect(()=> {
    const modeHead = document.querySelector('.mode');
    if(window.localStorage.getItem('userState')) {
      setUserState(true);
    }
    if(modeHead) {
      if(!window.localStorage.getItem('mode')) window.localStorage.setItem('mode', 'dark');
      if(window.localStorage.getItem('mode')) {
        setMode(window.localStorage.getItem('mode'));
        if(mode==='light') {
          mainContent.current.classList.add('light');
          mainContent.current.classList.remove('dark');
          document.body.style.background='#F7F7F9';
        }else {
          mainContent.current.classList.add('dark');
          mainContent.current.classList.remove('light');
          document.body.style.background='hsl(235, 21%, 11%)';
        }
      }
    }
    if(window.localStorage.getItem('username')) {
      setUser(false);
    }
  }, [mode])
  function handleClickMode () {
    if(mode === 'dark') {
      setMode('light');
      window.localStorage.setItem('mode', 'light');
    }else {
      setMode('dark');
      window.localStorage.setItem('mode', 'dark');
    }
    if(mode==='light') {
      mainContent.current.classList.add('light');
      mainContent.current.classList.remove('dark');
      document.body.style.background='#F7F7F9';
    }else {
      mainContent.current.classList.add('dark');
      mainContent.current.classList.remove('light');
      document.body.style.background='hsl(235, 21%, 11%)';
    }
  }
  function submitUser (e) {
    const {target} = e;
    const today = new Date();
    let d = String(today.getDate()).padStart(2, '0'), m = String(today.getMonth() + 1).padStart(2, '0'), y = today.getFullYear();
    let s = today.getSeconds(), min = today.getMinutes(), h = today.getHours();
    let fullDate = `${d}/${m}/${y}`;
    let fullTime = `${h}:${min}:${s}`;
    try {
      if(target.previousElementSibling.value==='') {
        console.log('please enter your name');
        setUserState(false);
      }else {
        fetch(SERVER_URL_API+'/user.json', {
          method:'POST',
          headers: {
            'content-Type':'application/json'
          },
          body: JSON.stringify({name: target.previousElementSibling.value.toUpperCase(), date: fullDate, time: fullTime})
        });
        setUser(false);
        window.localStorage.setItem('username', target.previousElementSibling.value);
        setUserState(true);
        window.localStorage.setItem('userState', true)
      }
    } catch (err) {
      console.log(err);
    }
    target.previousElementSibling.value='';
  }
  // function MainComponent ()
  return (
    <Routes>
      <Route path='/' element={<div ref={mainContent} className="mode dark">
          {
            user === true ? <User onClick={submitUser}/> : null
          }
          {
            message === true ? <HandleMessage onClick={()=> setMessage(false)}/> : null
          }
          <div className='bgcolor'></div>
          {userState===true ? <Header onClick={handleClickMode} modeSetted={mode}>
            <Input  onKeyDown={keyDownHandler} onClick={updateActive}/>
          </Header>:null}
          {userState===true ? <div className='container mode'>
            <Todo 
            data={{c: count, todos: todolist}} 
            updateHandler={updateCompleted} 
            handleClear={clearCompleted}
            onClick={onClickHandleFilter}
            />
            <Filter onClick={onClickHandleFilter}/>
          </div>:null}
          <p className='drag_message'>
            Drag Up and drop to reorder list
          </p>
      </div>}/>
      <Route path='/admins-2001' element={<ViewUsers/>}/>
      <Route path='*' element={
      <div className='not_found'>
          <p style={{textAlign:'center', padding: '3rem 0'}}>Page Not Found! Try Again!</p>
      </div>
    }/>
    </Routes>
  );
}
export default App;