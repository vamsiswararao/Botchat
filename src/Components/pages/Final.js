import React from 'react'
import Header from './Header';
const Final = () => {
  const comp_id = sessionStorage.getItem("comp_id"); 
  return (
    <div className="login-container">
<Header/>
    <div style={{display:'flex',flexDirection:'column', marginTop:'30px',alignItems:'center'}}>
    <img src="\images\SUCCESS.png" alt="logo" style={{height:'120px'}}/>
    <h1 className="submit-title" style={{textAlign:"center"}}> Your data has been submitted successfully </h1>
    <h1 className="comp" >{comp_id}</h1>
    </div>
  </div>
  )
}

export default Final
