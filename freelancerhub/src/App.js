import logo from './logo.svg';
import './App.css';

import React from 'react';
import { ProposalForm } from './pages/ProposalForm';
import NavigationBarFreelancer from './pages/NavigationBarFreelancer';

function App() {
  return (
    <div className="App">
      <NavigationBarFreelancer/>
      <h1>Proposal Submission</h1>
      <ProposalForm/>
    </div>
  );
}

export default App;
