import React, { useState } from 'react';
import workImage from '../../Gallery/work.png';
import noteImage from '../../Gallery/note.png';
import { useNavigate } from "react-router-dom";
import { IoMdClose } from 'react-icons/io';
import NavigationBarClients from './NavigationBarClient';


// ProgressBar component to display the stages of project creation
const ProgressBar = ({ stages }) => {
  return (
    <div className="flex justify-between w-10/12 mb-8 border py-4 mx-auto">
      {stages.map((stage, index) => (
        <div key={index} className={`stage-container w-1/4 ${index !== stages.length - 1 ? 'border-r' : ''}`}>
        <div className="stage flex flex-col items-center px-4">
            <div className="icon w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stage.title === 'Preferred' ? '#213E60' : '#E9EBFD' }}>
              <img src={stage.title === 'Preferred' ? workImage : noteImage} alt="Stage icon" />
            </div>
            <div className="title font-bold">{stage.title}</div>
            <div>{stage.step}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const CreateProjectPreferred = () => {
  // Define the stages of project creation
  const stages = [
    { title: 'Job Details', step: 'Step 1/5' },
    { title: 'Job Description', step: 'Step 2/5' },
    { title: 'Preferred', step: 'Step 3/5' },
    { title: 'Invite', step: 'Step 4/5' },
    { title: 'Preview', step: 'Step 5/5' },
  ];


  const navigate = useNavigate();
  
  const handlePreviousButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/post-project-description");
  };

  const handleNextButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/post-project-invite");
  };

  const [skills, setSkills] = useState([]);

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const value = event.target.value.trim();
    if (value && !skills.includes(value)) {
      setSkills([...skills, value]);
    }
    event.target.value = '';
  }
};

const handleDelete = (skillToDelete) => {
  setSkills(skills.filter(skill => skill !== skillToDelete));
};

const [keywords, setKeywords] = useState([]);

const handleKeywordKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    setKeywords([...keywords, event.target.value]);
    event.target.value = '';
  }
};

const handleKeywordDelete = (keywordToDelete) => {
  setKeywords(keywords.filter(keyword => keyword !== keywordToDelete));
};

  return (
    <div className="flex flex-col items-start justify-center">
                        <NavigationBarClients/>

      <h1 className="text-4xl mb-5 mt-10 font-bold pl-16">Create Project</h1>
      <div className="w-11/12 h-px bg-black mb-5 mx-auto"></div>
      <ProgressBar stages={stages} />
      <div style={{ backgroundColor: '#69ACC2' }} className="w-screen max-w-full h-8/10">
        <div className="bg-white w-4/5 rounded-md my-12 mx-auto text-left">
        <form className="flex flex-col space-y-4 p-4">

            <div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobDescription">Job Rrsponsibilities: </label>
                <textarea style={{ width: '100%' }} className="flex h-[100px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 py-2"
                id="jobDescription"></textarea>
            </div>
            </div>
            <div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobDescription">Preferred Qualification: </label>
                <textarea style={{ width: '100%' }} className="flex h-[100px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 py-2"
                id="jobDescription"></textarea>
            </div>
            </div>
            <div className="flex justify-between w-8/10 m-4">
  <div className="flex flex-col w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectStartTime">Preffered Skills: </label>
    <input 
    className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
    id="preferredSkills"
    onKeyDown={handleKeyDown}
  />
<div className="flex flex-wrap">
{skills.map((skill, index) => (
  <div key={index} className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
    <span>#{skill}</span>
    <button 
      onClick={() => handleDelete(skill)} 
      className="ml-1 cursor-pointer font-bold items-center"
      style={{ background: 'none', border: 'none' }}
    >
      <IoMdClose />
    </button>
  </div>
))}
</div>
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="duration">Keyword: </label>
    <input 
  className="flex h-[40px] w-full items-center justify-center rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 sm:w-full"
  id="duration" 
  type="text" 
  onKeyDown={handleKeywordKeyDown}
/>
<div className="flex flex-wrap">
{keywords.map((keyword, index) => (
  <div key={index} className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
    <span>#{keyword}</span>
    <button 
      onClick={() => handleKeywordDelete(keyword)} 
      className="ml-1 cursor-pointer font-bold items-center"
      style={{ background: 'none', border: 'none' }}
    >
      <IoMdClose />
    </button>
  </div>
))}
</div>
  </div>
</div>
<div className="pt-5">
<div className="flex justify-between w-8/10 m-4" >
  <div className="w-1/4">
    <button onClick={handlePreviousButtonClick} type="button" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
      Previous
    </button>
  </div>
  <div className="w-1/4">
    <button onClick={handleNextButtonClick} type="next2" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
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

export default CreateProjectPreferred;