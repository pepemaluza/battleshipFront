import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import GamePage from './pages/gamePage/GamePage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import socketIOClient from 'socket.io-client';

interface Data {
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

function App() {
  const [user, setUser] = React.useState<User | null>(null);

  const [socket, setSocket] = React.useState(
    socketIOClient('http://localhost:5001/')
  );

  const [statusMatch, setStatusMatch] = React.useState('');

  const [canShot, setCanShot] = React.useState(false);

  const [matchOver, setMatchOver] = React.useState(false);

  const [shoteds, setShoteds] = React.useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [shots, setShots] = React.useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  return (
    <div className='App'>
      <Router>
        <Navbar
          ws={socket}
          user={user}
          setStatusMatch={setStatusMatch}
          setCanShot={setCanShot}
          shots={shots}
          setShots={setShots}
          shoteds={shoteds}
          setShoteds={setShoteds}
          setMatchOver={setMatchOver}
        />
        <Routes>
          <Route
            path='/'
            element={
              <LoginPage
                setUser={setUser}
                setSocket={setSocket}
                socket={socket}
              />
            }
          />
          <Route path='/home' element={<HomePage user={user} />} />
          <Route
            path='/play'
            element={
              <GamePage
                ws={socket}
                statusMatch={statusMatch}
                canShot={canShot}
                shots={shots}
                setShots={setShots}
                shoteds={shoteds}
                setShoteds={setShoteds}
                matchOver={matchOver}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
