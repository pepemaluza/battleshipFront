import React from 'react';
import './LoginPage.css';
import GoogleAuth from "../../components/GoogleAuth";

function LoginPage(props: any) {
  return (
    <div className="login-container">
       <h1>BattleShips!</h1>
       <div>
           <p>Hi</p>
           <GoogleAuth setUser={props.setUser} setSocket={props.setSocket} socket={props.socket} />
       </div>
    </div>
  );
}

export default LoginPage;
