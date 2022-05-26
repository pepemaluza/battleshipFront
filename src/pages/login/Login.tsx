import React from 'react';
import './Login.css';

const handleClick = () => {
    //TODO integrar con el Back para la autenticacion con Google;
    alert("OK");
}

function Login() {
  return (
    <div className="login-container">
       <h1>BattleShips!</h1>
       <div>
           <p>Hi, User!</p>
           <button onClick={() => {handleClick()}}>
               Continuar con Google
            </button>
       </div>
    </div>
  );
}

export default Login;
