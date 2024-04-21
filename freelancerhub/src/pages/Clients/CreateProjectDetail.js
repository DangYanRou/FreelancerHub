import React from 'react';
import workImage from '../../Gallery/work.png';
import noteImage from '../../Gallery/note.png';
import { useNavigate } from "react-router-dom";
import NavigationBarClients from './NavigationBarClient';


// ProgressBar component to display the stages of project creation
const ProgressBar = ({ stages }) => {
  return (
    <div className="flex justify-between w-full mb-8 border py-4">
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

  const handleButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/post-project-description");
  };

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
  

  return (
    <div className="flex flex-col items-start justify-center">
        <NavigationBarClients/>
      <h1 className="text-4xl mb-5 mt-10 font-bold pl-10">Create Project</h1>
      <div className="w-full h-px bg-black mb-5"></div>
      <ProgressBar stages={stages} />
      <div style={{ backgroundColor: '#69ACC2' }} className="w-screen max-w-full h-8/10">
        <div className="bg-white w-4/5 rounded-md my-12 mx-auto text-left">
        <form className="flex flex-col space-y-4 p-4">

          <div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Subject: </label>
              <input style={{ width: '100%' }} className="flex h-[40px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
               id="projectName" type="text" />
            </div>
          </div>
          <div className="flex justify-between w-8/10 m-4">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Contract Type: </label>
    <select className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
     id="jobCategory">
      {workPlace.map((workPlace, index) => (
        <option key={index} value={workPlace}>
          {workPlace}
        </option>
      ))}
    </select>
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Workplace: </label>
    <select className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
     id="jobCategory">
      {contractType.map((contractType, index) => (
        <option key={index} value={contractType}>
          {contractType}
        </option>
      ))}
    </select>
  </div>
  <div className="w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Location: </label>
    <input className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="location" type="text" />
  </div>
</div>
<div className="w-8/10 m-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="budget">Budget: </label>
</div>
<div className="w-3/4 m-4 flex">
  <div className="flex items-center w-1/3 mr-2">
    <label className="mr-2 text-gray-700 text-sm " htmlFor="min">Min: </label>
    <input className="flex h-[40px] w-3/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="min" type="number" min="0" />
  </div>
  <div className="flex items-center w-1/3 mr-2">
    <label className="mr-2 text-gray-700 text-sm " htmlFor="max">Max: </label>
    <input className="flex h-[40px] w-3/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="max" type="number" min="0" />
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
    <button onClick={handleButtonClick} type="next2" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
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