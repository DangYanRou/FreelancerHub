import React, { useState } from 'react';
import workImage from '../../Gallery/work.png';
import noteImage from '../../Gallery/note.png';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NavigationBarClients from './NavigationBarClient';
import Heading from '../../components/Heading';



// ProgressBar component to display the stages of project creation
const ProgressBar = ({ stages }) => {
  return (
    <div className="flex justify-between w-10/12 mb-8 border py-4 mx-auto">
      {stages.map((stage, index) => (
        <div key={index} className={`stage-container w-1/4 flex flex-col justify-between ${index !== stages.length - 1 ? 'border-r' : ''}`}>
        <div className="stage flex flex-col items-center px-4">
            <div className="icon w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stage.title === 'Project Description' ? '#213E60' : '#E9EBFD' }}>
              <img src={stage.title === 'Project Description' ? workImage : noteImage} alt="Stage icon" />
            </div>
            <div className="title font-bold">{stage.title}</div>
            </div>

            <div className="flex items-center justify-center">{stage.step}</div>
            </div>
      ))}
    </div>
  );
};

const durationUnits = ['day', 'week', 'month', 'year'];

const workloadOptions = [
    'not specified',
    '20% (1 day per week)',
    '40% (2 days per week)',
    '60% (3 days per week)',
    '80% (4 days per week)',
    '100% (5 days per week)'
  ];

  const categories = [
    'Accounting',
    'Administration & Office Support',
    'Advertising, Arts & Media',
    'Banking & Financial Services',
    'Call Centre & Customer Service',
    'CEO & General Management',
    'Community Services & Development',
    'Construction',
    'Consulting & Strategy',
    'Design & Architecture',
    'Education & Training',
    'Engineering',
    'Farming, Animals & Conservation',
    'Government & Defence',
    'Healthcare & Medical',
    'Hospitality & Tourism',
    'Human Resources & Recruitment',
    'Information & Communication Technology',
    'Insurance & Superannuation',
    'Legal',
    'Manufacturing, Transport & Logistics',
    'Marketing & Communications',
    'Mining, Resources & Energy',
    'Real Estate & Property',
    'Retail & Consumer Products',
    'Sales',
    'Science & Technology',
    'Self Employment',
    'Sport & Recreation',
    'Trades & Services',
    'Other'
  ];
  
const CreateProjectDescription = () => {
  // Define the stages of project creation
  const stages = [
    { title: 'Project Details', step: 'Step 1/5' },
    { title: 'Project Description', step: 'Step 2/5' },
    { title: 'Preferred', step: 'Step 3/5' },
    { title: 'Invite', step: 'Step 4/5' },
    { title: 'Preview', step: 'Step 5/5' },
  ];

  const navigate = useNavigate();

  
  const handlePreviousButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/post-project");
  };


  const [startDate, setStartDate] = useState(new Date());

  const [jobCateInput, setJobCateInput] = useState('');

  const [jobCateError, setJobCateError] = useState('');


  const handleJobCateChange = (event) => setJobCateInput(event.target.value);

  

// Check if all required fields are filled
const allFieldsFilled = jobCateInput !== '';

const handleFormSubmit = (event) => {
  event.preventDefault(); 
 
  if (!jobCateInput) {
    setJobCateError('Job Category is required');
  } else {
    setJobCateError('');
  }


  if (!allFieldsFilled) 
  window.alert('Required fields must be filled!');

  // Proceed with form submission if no errors
  if (jobCateInput ) {
    navigate("/clients/post-project-preferred");
  }  
};

const handleNextButtonClick = (event) => {
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
                <Heading as="h1" className="ml-[25px] tracking-[-0.90px] md:p-5 mt-5">
                      Create Project
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[93%] mx-auto" />
      <ProgressBar stages={stages} />
      <div style={{ backgroundColor: '#69ACC2' }} className="w-screen max-w-full h-8/10">
        <div className="bg-white w-4/5 rounded-md my-12 mx-auto text-left">
        <form className="flex flex-col space-y-4 p-4">

        <div className="flex justify-between w-8/10 m-4">
        <div className="flex flex-col w-1/2 mr-8">
        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="jobCategory">Project Category: </label>
<select required className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
id="projectCategory" value={jobCateInput} onChange={handleJobCateChange}>
  <option value="">Select a category</option>
  {categories.map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ))}
</select>
    {jobCateError && <p className="text-red-500 text-xs italic">{jobCateError}</p>}

  </div>
  <div className="w-1/2">
 
    </div>
</div>

<div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobDescription">Job Description: </label>
                <textarea style={{ width: '100%' }} className="flex h-[200px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 pt-2"
                id="jobDescription"></textarea>
            </div>
            </div>
            <div className="flex justify-between w-8/10 m-4">
  <div className="flex flex-col w-1/2 mr-8">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectStartTime">Project Start Time: </label>
    <DatePicker
    required
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="dd/MM/yyyy"
      className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
    />
    {/* ... */}

  <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="duration">Duration: </label>
    <div className="flex items-center">
      <input className="flex h-[40px] w-3/5 items-center justify-center rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 sm:w-full"
       id="duration" type="text" />
      <select className="flex h-[40px] w-2/5 ml-4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5">
        {durationUnits.map((unit, index) => (
          <option key={index} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  </div>
  <div className="flex flex-col w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workload">Workload: </label>
    <select className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="workload"  >
       {workloadOptions.map((workloadOptions, index) => (
        <option key={index} value={workloadOptions}>
          {workloadOptions}
        </option>
      ))}
    </select>

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

export default CreateProjectDescription;