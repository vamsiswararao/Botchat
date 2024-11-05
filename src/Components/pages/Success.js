import Header from "./Header";

const Success = () => {

  
    return (
      <div className="login-container">
<Header />
        <div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'50px'}}>
        <img src="\images\SUCCESS.png" alt="logo" style={{height:'120px'}}/>
        {/* <h1>Error Message</h1> */}
        <p style={{fontWeight:'600', textAlign:'center',marginTop:'50px'}}>The data has already been submitted successfully.</p>
        </div>
        </div>
      </div>
    );
  };
  
  export default Success;
  