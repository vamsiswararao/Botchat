const Success = () => {

  
    return (
      <div className="login-container">
        <header>
          <div
            style={{
              display: "flex",
              flexDirection: "colum",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src="\images\LOGO-TS2.jpg" alt="csb-ts" className="cst-logo" />
            <h1
              className="header-title"
              style={{ padding: 20, textAlign: "center" }}
            >
              1930-Cyber Bot
            </h1>
            <img src="\images\LOGO-INDIA.png" alt="csb-ts" className="csi-logo" />
          </div>
        </header>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <img style={{ width: '300px', height: '300px' }}  src="https://thumbs.dreamstime.com/b/blue-tick-icon-vector-symbol-checkmark-vector-illustration-white-background-blue-tick-vector-symbol-checkmark-isolated-white-142134938.jpg" alt=""/>

        {/* <h1>Error Message</h1> */}
        <p style={{fontWeight:'600'}}>You complaint already received successfully</p>
        </div>
      </div>
    );
  };
  
  export default Success;
  