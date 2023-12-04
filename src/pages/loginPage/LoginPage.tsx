import React from 'react';
import './LoginPage.css';
import GoogleAuth from '../../components/GoogleAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import socketIOClient from 'socket.io-client';

function LoginPage(props: any) {
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result: any = await axios.post('http://localhost:5000/auth/', {
      token: null,
      name: 'Guest',
      email: email,
    });
    props.setUser(result.data.user);
    props.setSocket(socketIOClient('http://localhost:5001/'));

    navigate('/home');
  };
  return (
    <div style={styles.container}>
      <h1>BattleShips!</h1>
      <div style={styles.form}>
        <span>Login with Google:</span>
        <GoogleAuth
          setUser={props.setUser}
          setSocket={props.setSocket}
          socket={props.socket}
        />
        <span style={{ marginTop: '20px' }}>Or as Guest</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          type='text'
          name='email'
          placeholder='Email'
          autoComplete='off'
        />
        <button
          disabled={!email}
          style={styles.button}
          onClick={() => handleLogin()}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    color: 'white',
    background: 'url(/img/background.png)',
    height: '100vh',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    'flex-direction': 'column',
    font: '300 32px Inter',
  },
  form: {
    background: '#222459',
    width: '360px',
    height: '240px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    'flex-direction': 'column',
    borderRadius: '10px',
    padding: '20px',
    color: 'white',
    font: '300 24px Inter',
  },
  input: {
    width: '237px',
    height: '38px',
    borderRadius: '20px',
    font: '300 18px Inter',
    'text-align': 'center',
  },
  button: {
    marginTop: '24px',
    width: '180px',
    borderRadius: '20px',
    height: '38px',
    font: '300 18px Inter',
    cursor: 'pointer',
  },
};

export default LoginPage;
