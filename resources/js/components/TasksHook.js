import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Mordal from './mordal';



function TasksHook(){
  const[count,setCount] = useState(12);
  const[tasks,setTasks] = useState(['']);
  const[task,setTask] = useState('');
  const[show,setShow] = useState(false);

  const Out = (props) => tasks.map((task,id) => 
    <tr key={id}>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td><button onClick={() => props.onDelete(task)} className="btn btn-primary">削除</button></td>
      <td><button onClick={() => props.onChangeTask(task)} className="btn btn-primary">更新</button></td>
    </tr>
    );

  useEffect(() => {
    axios
      .get('api/get')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
  },[setTasks]);

  const addTask = () => {
    axios
      .post('api/add',{
        title:task
      })
      .then((res) => {
        setTasks(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const setTmpTask = (e) => {
    setTask(e.target.value);
  }
  const deleteTask = (task) => {
    axios
      .post('api/del',{
        id:task.id
      })
      .then((res) => {
        setTasks(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }
  const changeTask = (task) =>{
    console.log(task);
    axios
      .post('api/change',{
        id:task.id,
        title:task.title
      })
      .then((res) =>{
        setTasks(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  return(
    <div>
      <button onClick={() => setShow(true)}>表示</button>
      <Mordal show={show} setShow={setShow}/>
      <span>テスト！{count}</span>
      <button className="btn btn-primary"onClick={() => setCount(count+1)}>aaa</button>
      <button className="btn btn-primary"onClick={() => setCount(count-1)}>bbb</button>
      <br />
      <input onChange={setTmpTask} type="text" />
      <button onClick={addTask}>更新！</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>リスト</th>
            <th>削除</th>
            <th>更新</th>
          </tr>
        </thead>
        <tbody>
          <Out 
            onDelete={deleteTask} 
            onChangeTask={changeTask}
          />
        </tbody>
      </table>
    </div>
  );
}


ReactDOM.render(<TasksHook />,document.getElementById('taskHook'));