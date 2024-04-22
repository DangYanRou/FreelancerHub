import React, { useState, useEffect } from 'react';
import backgroundHome from "../../Gallery/backgroundHome.png"; 
import search from "../../Gallery/img_search.svg";
import location from "../../Gallery/img_iconoir_pin_alt.svg";
import catergory from "../../Gallery/catergory_icon.svg";
import dropdownArrow from "../../Gallery/dropdownArrow_icon.svg";
import NavigationBarFreelancer from './NavigationBarFreelancer';
import '../../styles/Freelancers/FreelancerExplore.css'


const FreelancerExplore = () => {
  
 
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  const dropdowns = [
    { title: 'Workplace', options: ['Onsite', 'Remote', 'Hybrid'] },
    { title: 'Contract Type', options: ['Freelance', 'Part Time', 'Full Time'] },
    { title: 'Workload', options: ['20% (1 day per week)', '40% (2 days per week)', '60% (3 days per week)','80% (4 days per week)','100% (5 days per week)','not specified'] },
    { title: 'Budget', min: minBudget, max: maxBudget }
  ];

  const categories = [
    'Marketing',
    'Sales',
    'Development',
    'Design',
    'Human Resources',
    'Finance',
    'IT',
    'Operations',
    'Product',
    'Other'
  ];

  function validateBudget(min, max) {
    if (min && max) {
      return Number(min) <= Number(max);
    }
    return true;
  }
  const [selectedProject,setSelectedProject]=useState(null);

  const projects=[
    {
      title: 'Online Shopping Website Design',
    client: 'Hana Florist',
    category: 'Information & Communication Technology',
    budget: 'RM 1500-RM 2000',
    location: 'Petaling Jaya, Selangor'
    ,id: 1,
    description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
    items: [
      'User-Friendly Design',
      'Aesthetic Appeal',
      'Mobile Responsiveness',
      'Integration of E-Commerce Features'
    ]
    },{
      title: 'Online Shopping Website Design',
    client: 'Hana Florist',
    category: 'Information & Communication Technology',
    budget: 'RM 1500-RM 2000',
    location: 'Petaling Jaya, Selangor',
    id: 2,
    description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
    items: [
      'User-Friendly Design',
      'Aesthetic Appeal',
      'Mobile Responsiveness',
      'Integration of E-Commerce Features'
    ]
    },{
      title: 'Accountant',
    client: 'Mr Honey Bees Farm',
    category: 'Accounting',
    budget: 'RM 1500-RM 2000',
    location: 'Petaling Jaya, Selangor',
    id: 3,
    description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
    items: [
      'User-Friendly Design',
      'Aesthetic Appeal',
      'Mobile Responsiveness',
      'Integration of E-Commerce Features'
    ]
    }
  ];

  const handleProjectClick=(project)=>{
    setSelectedProject((prevProject)=>
      prevProject && prevProject.id==project.id?null:project
    );
  }
  const ProjectList=({projects,onProjectClick,selectedProjectId}) => {
    return(
      <div>
          {projects.map((blog)=>(
            <div className={`card ${selectedProjectId === blog.id ? 'selected' : ''}`} key={blog.id} onClick={()=>onProjectClick(blog)}> 
            <h2>{blog.title}</h2>
            <a href="#" className="hover-profileLink">{blog.client}</a>
            <p id="category">{blog.category}</p>
            <p>{blog.location}</p>
            <p>{blog.budget}/project</p>
            </div>
              
          ))}
        </div>
     
    );
  }
  
  const ProjectDetails =({project}) => {
    if(!project)return null;
    return(
      <div className="project-details">
        <h2>{project.title}</h2>
        <a href="#" className="hover-profileLink">{project.client}</a>
            <p id="category">{project.category}</p>
            <p>{project.location}</p>
            <p>{project.budget}/project</p>
            <h3 id="about-the-project">About the Project:</h3>
            <p>{project.description}</p>
            <div>
              <h3 id="key-requirement">Key Requirements:</h3>
              <ul className="list">
                {project.items.map((item,index)=>(
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <button id="applyButton" className="btn btn-primary">Apply</button>
  
  
      </div>
    );
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <NavigationBarFreelancer/>
    <div className="relative ">
      <img src={backgroundHome} alt="Background" className="w-screen object-cover h-1/2" />
      <div className="absolute bottom-[30%] left-0 right-0 m-auto flex w-full max-w-[1070px] flex-col items-center gap-[66px] md:p-5 sm:gap-[33px]">
        <h1 className="text-shadow-ts tracking-[-1.20px] text-5xl font-bold mb-5 text-white">
  Search Project
</h1>
<div className="flex items-center justify-between self-stretch rounded-[39px] bg-white px-5 py-2">
<div className="flex items-center gap-4">
  <img src={search} alt="search_one" className="h-[42px] w-[42px] align-middle" />
  <input type="text" placeholder="Job title or keyword" className="!text-[21.03px] border-none outline-none flex-grow h-[30px] py-2" />
</div>
<div className="flex items-center gap-4">
    <img src={catergory} alt="iconoirpinalt" className="h-[33px] w-[33px] align-middle" />
    <select className="!text-[21.03px] border-none outline-none flex-grow h-[30px] ">
      <option value="">Select a category...</option>
      {categories.map((category, index) => (
        <option key={index} value={category.toLowerCase()}>{category}</option>
      ))}
    </select>
  </div>
<div className="flex items-center gap-4">
  <img src={location} alt="iconoirpinalt" className="h-[33px] w-[33px] align-middle" />
  <input type="text" placeholder="Johor, Malaysia" className="!text-[21.03px] border-none outline-none flex-grow h-[30px] py-2" />
</div>
<button 
  // onClick={handleSearch} 
  className="ml-[33px] md:ml-0 sm:px-5 bg-[#214E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-full">
  Search
</button>
</div>
</div>
      </div>
      <div className="flex justify-start h-full ml-10 w-full mt-10">
  <div className="flex w-full">
    <div className="flex flex-col w-1/5">
      {dropdowns.map((dropdown, index) => (
  <details key={index} open className="mb-4 rounded-xl bg-white shadow overflow-hidden" onToggle={(e) => {
    const arrow = e.target.querySelector('.arrow');
          if (e.target.open) {
            arrow.classList.add('rotate-180');
          } else {
            arrow.classList.remove('rotate-180');
          }
        }}>
          <summary className="cursor-pointer text-white font-bold bg-[#69ACC2] p-3 flex justify-between items-center rounded-xl">
            {dropdown.title}
            <img className="arrow ml-2" src={dropdownArrow} alt="arrow" />
          </summary>
          {dropdown.title === 'Budget' ? (
            <div className="p-4 white rounded-md">
              <div className="flex items-center mb-2 justify-between">
                <label className="text-sm ml-2 font-bold text-gray-700">
                  Min:
                </label>
                <input
                  type="number"
                  value={dropdown.min}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (validateBudget(value, dropdown.max)) {
                      setMinBudget(value);
                    }
                  }}
                  className="mt-1 w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center mb-2 justify-between">
                <label className="text-sm ml-2 font-bold text-gray-700">
                  Max:
                </label>
                <input
                  type="number"
                  value={dropdown.max}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (validateBudget(dropdown.min, value)) {
                      setMaxBudget(value);
                    }
                  }}
                  className="mt-1 w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          ) : (
            dropdown.options.map((option,i) => (
              <div key={i} className="flex items-center p-2 hover:bg-gray-200">
                <input type="checkbox" id={`option-${index}-${i}`} name={`option-${index}-${i}`} className="form-checkbox rounded-xl h-5 w-5 text-blue-600"/>
                <label htmlFor={`option-${index}-${i}`} className="ml-2 text-gray-700">{option}</label>
              </div>
            ))
          )}
        </details>
      ))}

    </div>
    <div className="parent-container">
   <ProjectList projects={projects} onProjectClick={handleProjectClick}   selectedProjectId={selectedProject ? selectedProject.id : null}/>
 <ProjectDetails project={selectedProject}/>
      
    </div>
  </div>
  
</div>
    </div>

    
  );
};

export default FreelancerExplore;