import axios from 'axios';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

function RenderRows(props){

  return props.tasks.map(task => {
    return(
      <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td><button className="btn btn-secondary" onClick={() => props.deleteTask(task)}>完了</button></td>
      </tr>
    );
  });
}

export default class TaskApp extends Component{
  constructor(){
    super();
    this.state = {
      tasks:[],
      task:''
    };
    this.inputChange = this.inputChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);


  }

  componentDidMount(){
    axios
      .get('api/get')
      .then((res)=>{
        this.setState({
          tasks: res.data
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  inputChange(event){
    switch(event.target.name){
      case 'task':
        this.setState({
          task:event.target.value
        })
      default:
        break;
    }
  }

  addTask(){
    if(this.state.task == ''){
      return;
    }
    axios
      .post('/api/add',{
        title: this.state.task
      })
      .then((res) => {
        this.setState({
          tasks: res.data,
          task:''
        })
      })
      .catch(error =>{
        console.log(error);
      });
  }

  deleteTask(task){
    axios
      .post('api/del',{
        id:task.id
      })
      .then(res =>{
        this.setState({
          tasks:res.data
        })
      })
      .catch(error =>{
        console.log(error);
      });

  }

  render(){
    return(
      <React.Fragment>

        <div className="form-group mt-4">
            <label htmlFor="task">新規task</label>
            <input type="text" className="form-control" name="task" value={this.state.task} onChange={this.inputChange}/>
        </div>
        <button className="btn btn-primary" onClick={this.addTask}>登録</button>


        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>タスク</th>
              <th>完了</th>
            </tr>
          </thead>
          <tbody>
            <RenderRows
              tasks = {this.state.tasks}
              deleteTask = {this.deleteTask}
              />
          </tbody>
        </table>
      </React.Fragment>

    );
  }
}

ReactDOM.render(<TaskApp />,document.getElementById('taskApp'));

// ReactDOM.render(<TodoApp />, document.getElementById('todoApp'));