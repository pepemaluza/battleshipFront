import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import LoginPage from './pages/loginPage/LoginPage';
import GamePage from './pages/gamePage/GamePage';

function App() {

    return (
        <div className="App">
            <Navbar />
            <GamePage />
            <LoginPage />
        </div>
    );
}

export default App;
