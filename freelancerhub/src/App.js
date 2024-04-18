import logo from './logo.svg';
import './App.css';

import React from 'react';

import { ProposalForm } from './ProposalFormComponents/ProposalForm';

function App() {
  return (
    <div className="App">
      <h1>My Form</h1>
      <ProposalForm/>
    </div>
  );
}

export default App;
