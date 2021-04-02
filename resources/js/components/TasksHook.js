import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Mordal from './mordal';

function TasksHook(){
  const[tasks,setTasks] = useState(['']);
  const[task,setTask] = useState('');
  const[show,setShow] = useState(false);
  const[id,setId] = useState(0);

  const Out = (props) => tasks.map((task,id) => 
    <tr key={id}>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td><button onClick={() => props.onDelete(task)} className="btn btn-primary">削除</button></td>
      <td><button onClick={() => props.showMordal(task)} className="btn btn-primary">表示</button></td>
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
  const changeTask = (id,title) =>{
    axios
      .post('api/change',{
        id:id,
        title:title
      })
      .then((res) =>{
        setTasks(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
      setShow(false);
  }

  const showMordal = (task) => {
    setId(task.id);
    setShow(true);
  }

  return(
    <div>
      <Mordal show={show} setShow={setShow} changeTask={changeTask} id={id} />
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
            showMordal={showMordal}
          />
        </tbody>
      </table>
    </div>
  );
}


ReactDOM.render(<TasksHook />,document.getElementById('taskHook'));