import React from 'react';

function Mordal({show,setShow}){

  if(show){
    return(
      <React.Fragment>
        <div id="overlay">
          <div id="content">
          <p>もーだる</p>
          <p><button onClick={() => setShow(false)}>閉じる</button></p>
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
