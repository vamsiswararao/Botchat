import React from 'react'
const Final = () => {
  const comp_id = sessionStorage.getItem("comp_id"); 
  return (
    <div className="page">
    <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100vh'}}>
    <img src="\images\SUCCESS.png" alt="logo" style={{height:'200px'}}/>
    <h1 className="submit-title" > Your details saved successfully </h1>
    <h1 className="submit-title" >{comp_id}</h1>
    </div>
  </div>
  )
}

export default Final
