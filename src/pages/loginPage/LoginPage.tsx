import React from 'react';
import './LoginPage.css';
import GoogleAuth from "../../components/GoogleAuth";

function LoginPage() {
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

export default LoginPage;
