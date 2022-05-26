import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Login from './pages/login/Login'

function App() {
    return (
        <div className="App">
            <Navbar />
            <Login />
        </div>
    );
}

export default App;
