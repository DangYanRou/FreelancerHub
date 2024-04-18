import logo from './logo.svg';
import './App.css';
import React from 'react';
import NavigationBarFreelancer from './pages/NavigationBarFreelancer';
import {Routes, Route } from 'react-router-dom';
import ProposalForm from './pages/ProposalForm';

function App() {
  return (
    <div className="App">
      <NavigationBarFreelancer/>
      <Routes>
          <Route path="/proposal-form" element={<ProposalForm/>} ></Route>
          {/* Add more routes as needed (change the element)*/}
      </Routes>
    </div>
  );
}

export default App;