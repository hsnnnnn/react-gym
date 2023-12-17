import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './App';

const App = () => {
    return (
      <Router>
        <Routes>
         <Route path="/" exact element={<Home />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} /> 
        </Routes>
      </Router>
    );

  };
  

export default App;

{/*         */}