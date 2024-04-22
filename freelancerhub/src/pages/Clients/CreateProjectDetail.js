import React, { useState, useEffect } from 'react';
import workImage from '../../Gallery/work.png';
import noteImage from '../../Gallery/note.png';
import { useNavigate } from "react-router-dom";
import NavigationBarClients from './NavigationBarClient';



// ProgressBar component to display the stages of project creation
const ProgressBar = ({ stages }) => {
  return (
    <div className="flex justify-between w-10/12 mb-8 border py-4 mx-auto">
      {stages.map((stage, index) => (
        <div key={index} className={`stage-container w-1/4 ${index !== stages.length - 1 ? 'border-r' : ''}`}>
        <div className="stage flex flex-col items-center px-4">
            <div className="icon w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stage.title === 'Job Details' ? '#213E60' : '#E9EBFD' }}>
              <img src={stage.title === 'Job Details' ? workImage : noteImage} alt="Stage icon" />
            </div>
            <div className="title font-bold">{stage.title}</div>
            <div>{stage.step}</div>
          </div>
        </div>
      ))}
    </div>
  );
};



const CreateProjectDetail = () => {

  const navigate = useNavigate();


  // Define the stages of project creation
  const stages = [
    { title: 'Job Details', step: 'Step 1/5' },
    { title: 'Job Description', step: 'Step 2/5' },
    { title: 'Preferred', step: 'Step 3/5' },
    { title: 'Invite', step: 'Step 4/5' },
    { title: 'Preview', step: 'Step 5/5' },
  ];

  const contractType = [
    'Freelance',
    'Part time',
    'Full time',
    'Permanent',
    'Other'
  ];

  const workPlace = [
    'Onsite',
    'Remote',
    'Hybrid',
    'Other'
  ];
  
  const [projectName, setProjectName] = useState('');
  const [contractInput, setContractType] = useState('');
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [minError, setMinError] = useState('');
  const [maxError, setMaxError] = useState('');

  // Update state when input fields change
const handleProjectNameChange = (event) => setProjectName(event.target.value);
const handleContractTypeChange = (event) => setContractType(event.target.value);
const handleMinInputChange = (event) => setMinInput(event.target.value);
const handleMaxInputChange = (event) => setMaxInput(event.target.value);

// Check if all required fields are filled
const allFieldsFilled = projectName !== '' && contractInput !== '' && minInput !== '' && maxInput !== '';

const handleFormSubmit = (event) => {
  event.preventDefault();


  const location = document.getElementById('location').value;
  const min = document.getElementById('min').value;
  const max = document.getElementById('max').value;

  if (!projectName) {
    setSubjectError('Subject is required');
  } else {
    setSubjectError('');
  }

  if (!min) {
    setMinError('Min is required');
  } else {
    setMinError('');
  }

  if (!max) {
    setMaxError('Max is required');
  } else {
    setMaxError('');
  }

  if (!allFieldsFilled) 
  window.alert('All fields must be filled!');

  // Proceed with form submission if no errors
  if (location && min && max) {
    navigate("/clients/post-project-description");
  }  
};

const handleButtonClick = (event) => {
  event.preventDefault();

  // if (!allFieldsFilled) {
  //   window.alert('All fields must be filled!');
  // } else {
  handleFormSubmit(event);
  // navigate("/clients/post-project-description");
  // }
};


  return (
    <div className="flex flex-col items-start justify-center">
        <NavigationBarClients/>
      <h1 className="text-4xl mb-5 mt-10 font-bold pl-16">Create Project</h1>
      <div className="w-11/12 h-px bg-black mb-5 mx-auto"></div>
      <ProgressBar stages={stages} />
      <div style={{ backgroundColor: '#69ACC2' }} className="w-screen max-w-full h-8/10">
        <div className="bg-white w-4/5 rounded-md my-12 mx-auto text-left">
        <form className="flex flex-col space-y-4 p-4" onSubmit={handleFormSubmit}>

          <div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Subject: </label>
              <input required style={{ width: '100%' }} className="flex h-[40px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
               id="projectName" type="text" value={projectName} onChange={handleProjectNameChange} />
               {subjectError && <p>{subjectError}</p>}
            </div>
          </div>
          <div className="flex justify-between w-8/10 m-4">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Contract Type: </label>
    <select className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
     id="contractType" value={contractInput} onChange={handleContractTypeChange}>
      {contractType.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))}
    </select>
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Workplace: </label>
    <select className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
     id="jobCategory">
      {workPlace.map((workPlaceSelect, index) => (
        <option key={index} value={workPlaceSelect}>
          {workPlaceSelect}
        </option>
      ))}
    </select>
  </div>
  <div className="w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location: </label>
    <input required className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="location" type="text" />
  </div>
</div>
<div className="w-8/10 m-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">Budget: </label>
</div>
<div className="w-3/4 m-4 flex">
  <div className="flex items-center w-1/3 mr-2">
    <label className="mr-2 text-gray-700 text-sm " htmlFor="min">Min: </label>
    <input required className="flex h-[40px] w-3/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="min" type="number" min="0"  value={minInput} onChange={handleMinInputChange}/>
{minError && <p style={{ color: 'red' }}>{minError}</p>}
  </div>
  <div className="flex items-center w-1/3 mr-2">
    <label className="mr-2 text-gray-700 text-sm " htmlFor="max">Max: </label>
    <input required className="flex h-[40px] w-3/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="max" type="number" min="0"  value={maxInput} onChange={handleMaxInputChange} />
                 {maxError && <p style={{ color: 'red' }}> {maxError}</p>}

  </div>
  <div className="flex items-center w-1/3 select-div">
  <select className="flex h-[40px] w-3/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5">
    <option value="MYR">MYR</option>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="JPY">JPY</option>
    <option value="CNY">CNY</option>
  </select>
</div>
</div>
<div className="pt-5">
<div className="flex justify-end w-8/10 m-4">
  <div className="w-1/4">
    <button onClick={handleButtonClick} type="submit2" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
      Next
    </button>
  </div>
</div>
</div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectDetail;