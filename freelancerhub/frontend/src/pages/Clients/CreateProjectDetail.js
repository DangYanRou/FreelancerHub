import React, { useState, useEffect,useContext } from 'react';
import workImage from '../../Gallery/work.png';
import noteImage from '../../Gallery/note.png';
import { useNavigate } from "react-router-dom";
import NavigationBarClients from './NavigationBarClient';
import Heading from '../../components/Heading';
import { ProjectContext } from './ProjectContext';

// ProgressBar component to display the stages of project creation
const ProgressBar = ({ stages }) => {
  return (
    <div className="flex justify-between w-10/12 mb-8 border py-4 mx-auto">
      {stages.map((stage, index) => (
        <div key={index} className={`stage-container w-1/4 flex flex-col justify-between ${index !== stages.length - 1 ? 'border-r' : ''}`}>
        <div className="stage flex flex-col items-center px-4">
            <div className="icon w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stage.title === 'Project Details' ? '#213E60' : '#E9EBFD' }}>
              <img src={stage.title === 'Project Details' ? workImage : noteImage} alt="Stage icon" />
            </div>
            <div className="title font-bold">{stage.title}</div>
            </div>

            <div className="flex items-center justify-center">{stage.step}</div>
          </div>
      ))}
    </div>
  );
};


const CreateProjectDetail = () => {

  const navigate = useNavigate();


  // Define the stages of project creation
  const stages = [
    { title: 'Project Details', step: 'Step 1/5' },
    { title: 'Project Description', step: 'Step 2/5' },
    { title: 'Preferred', step: 'Step 3/5' },
    { title: 'Invite', step: 'Step 4/5' },
    { title: 'Preview', step: 'Step 5/5' },
  ];

  const workPlace = [
    'Select a Workplace',
    'Onsite',
    'Remote',
    'Hybrid',
    'Other'
  ];

  
  const [project, setProject] = useContext(ProjectContext);


  const [subjectError, setSubjectError] = useState('');
  const [minError, setMinError] = useState('');
  const [maxError, setMaxError] = useState('');
  const [locationError, setLocationError] = useState('');


const handleFormSubmit = (event) => {
  event.preventDefault();

  let isValid = true;

  if (!project.projectName) {
    setSubjectError('Project name is required');
    isValid = false;
  } else {
    setSubjectError('');
  }

  if (!project.minInput) {
    setMinError('Min input is required');
    isValid = false;
  } else {
    setMinError('');
  }

  if (!project.maxInput) {
    setMaxError('Max input is required');
    isValid = false;
  } else {
    setMaxError('');
  }

  if (!project.locationInput) {
    setLocationError('Location input is required');
    isValid = false;
  } else {
    setLocationError('');
  }

  // Proceed with form submission if no errors
  if (isValid) {
    navigate("/clients/post-project-description");
  }  else {
    window.alert('All fields must be filled!');
  }
};

const handleButtonClick = async (event) => {
  event.preventDefault();

  handleFormSubmit(event);

};

// Update the project state when the input fields change
const handleInputChange = (event) => {
  setProject({
    ...project,
    [event.target.name]: event.target.value,
  });
};


  return (
    <div>
    <div className="flex flex-col items-start justify-center">
        
        <Heading as="h1" className="ml-[25px] tracking-[-0.90px] md:p-5 mt-5">
                      Create Project
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[93%] mx-auto" />
      <ProgressBar stages={stages} />
      <div style={{ backgroundColor: '#69ACC2' }} className="w-screen max-w-full h-8/10">
        <div className="bg-white w-4/5 rounded-md my-12 mx-auto text-left">

        <form className="flex flex-col space-y-4 p-4" onSubmit={handleFormSubmit}>

          <div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Subject: </label>
              <input required style={{ width: '100%' }} className="flex h-[40px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
               id="projectName" name="projectName" type="text" value={project.projectName} onChange={handleInputChange} />
               {subjectError && <p className="text-red-500 text-xs italic">{subjectError}</p>}
            </div>
          </div>
          <div className="flex justify-between w-8/10 m-4">
  <div className="w-1/2 mr-8">
    
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workplace">Workplace: </label>
<select className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="workplace" name="workPlaceSelect" onChange={handleInputChange} value={project.workPlaceSelect}>
  {workPlace.map((workPlaceSelect, index) => (
    index === 0 
    ? <option key={index} value="" >{workPlaceSelect}</option>
    : <option key={index} value={workPlaceSelect} >{workPlaceSelect}</option>
  ))}
</select>

  </div>
  <div className="w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location: </label>
    <input required className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="location" name="locationInput" type="text"  value={project.locationInput} onChange={handleInputChange} />
 {locationError && <p className="text-red-500 text-xs italic">{locationError}</p>}
  </div>
</div>
<div className="w-8/10 m-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">Budget: </label>
</div>
<div className="w-3/4 m-4 flex">
  <div className="flex items-center w-1/3 mr-2">
    <label className="mr-2 text-gray-700 text-sm " htmlFor="min">Min: </label>
    <input required className="flex h-[40px] w-3/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="min" name="minInput" type="number" min="0"  value={project.minInput} onChange={handleInputChange}/>
      {minError && <p className="pl-2 text-red-500 text-xs italic">{minError}</p>}
  </div>
  <div className="flex items-center w-1/3 mr-2">
    <label className="mr-2 text-gray-700 text-sm " htmlFor="max">Max: </label>
    <input required className="flex h-[40px] w-3/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="max" name="maxInput" type="number" min="0"  value={project.maxInput} onChange={handleInputChange} />
      {maxError && <p className="pl-2 text-red-500 text-xs italic"> {maxError}</p>}

  </div>
  <div className="flex items-center w-1/3 select-div">
  <select required className="flex h-[40px] w-3/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
  id="currency" name="currencyInput" onChange={handleInputChange} value={project.currencyInput} >
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
    </div>
  );
};

export default CreateProjectDetail;