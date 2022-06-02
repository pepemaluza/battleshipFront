import React from 'react';
import './Login.css';
import GoogleAuth from "../../components/GoogleAuth";

function Login() {
  return (
    <div className="login-container">
       <h1>BattleShips!</h1>
       <div>
           <p>Hi</p>
           <GoogleAuth />
       </div>
    </div>
  );
}

export default Login;
