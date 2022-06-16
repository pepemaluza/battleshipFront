import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import LoginPage from './pages/loginPage/LoginPage';
import HomePage from './pages/homePage/HomePage';
import GamePage from './pages/gamePage/GamePage';

import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';

function App() {

    return (
        <div className="App">
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/play" element={<GamePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
