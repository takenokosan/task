import React, {useState, useEffect } from 'react';
import axios from 'axios';

function Mordal({show,setShow,changeTask,id}){

  const [mordalId,setMordalId] = useState('loading');
  const [mordalTitle,setMordalTitle] = useState('loading');
  const getTaskId = (id) => {
    if(id !== 0){
    axios
      .get('api/get/'+id)
      .then((res) => {
        setMordalId(res.data.id);
        setMordalTitle(res.data.title);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  useEffect(() => {
    getTaskId(id)
  },[id]);

  if(show){
    return(
      <React.Fragment>
        <div id="overlay">
          <div id="content">
            <form onSubmit={() => console.log('submit')}>
          <label>ID<br />
            <input type="text" disabled className="form-control" onChange={(e) => setMordalId(e.target.value)} value={mordalId} /><br />
          </label><br />
          <label>title<br />
            <input type="text" className="form-control" onChange={(e) => setMordalTitle(e.target.value)}  value={mordalTitle} /><br />
          </label><br />
          <button className="btn btn-primary" onClick={() => changeTask(mordalId,mordalTitle)}>更新</button>
          <button className="btn btn-secondary" onClick={() => setShow(false)}>閉じる</button>
          </form>
          </div>
        </div>
      </React.Fragment>
    )
  }else{
    return(
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default Mordal;
