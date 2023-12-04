import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { useNavigate } from 'react-router-dom';

import socketIOClient from 'socket.io-client';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface AuthResponse {
  token: string;
  user: User;
}

interface User {
  email: String;
  name: String;
  played: number;
  wins: number;
  losses: number;
  disconnects: number;
  firstMatch: String;
  lastMatch: String;
  inMatch: boolean;
}

const GoogleAuth = (props: any) => {
  const onSuccess = async (res: any) => {
    //console.log("res: ", res)

    try {
      const result: AxiosResponse<AuthResponse> = await axios.post(
        'http://localhost:5000/auth/',
        {
          token: res?.tokenId,
          name: res?.Av.Af,
          email: res?.Av.mw,
        }
      );

      props.setUser(result.data.user);
    } catch (err) {
      console.log(err);
    }

    props.socket.disconnect();
    props.setSocket(socketIOClient('http://localhost:5001/'));

    navigate('/home');
  };

  const navigate = useNavigate();

  return (
    <div>
      {/*
      <GoogleLogin
        clientId={"985762524543-cighrje1bfoql8mfn96r4uvulsgqutck.apps.googleusercontent.com"}
        onSuccess={onSuccess}
        onFailure={(e) => console.log(e)}
        render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
        )}
        buttonText="Login"
      />*/}
      <GoogleLogin
        shape='pill'
        allowed_parent_origin={'http://localhost:3000'}
        onSuccess={async (credentials) => {
          const data: any = jwtDecode(credentials.credential || '');
          const result: any = await axios.post('http://localhost:5000/auth/', {
            token: null,
            name: data.name,
            email: data.email,
            picture: data.picture,
          });
          props.setUser(result.data.user);
          props.setSocket(socketIOClient('http://localhost:5001/'));
          navigate('/home');
        }}
        onError={() => console.log('error')}
      />
    </div>
  );
};

export default GoogleAuth;
