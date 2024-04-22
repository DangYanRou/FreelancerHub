import './ProjectListClient.css'
import React from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router


const ProjectListClient=({projects,onProjectClick,selectedProjectId}) => {
    

    const[showDropdown,setShowDropdown]=useState([]);
    
    const toggleDropDown =(index) =>{
        const newDropdownState =[...showDropdown];
        newDropdownState[index]=!newDropdownState[index];
        setShowDropdown(newDropdownState);
    };
    return(
      <div>
          {projects.map((blog,index)=>(
            <div className="card-content">
            <div className={`card ${selectedProjectId === blog.id ? 'selected' : ''}`} key={blog.id} onClick={()=>onProjectClick(blog)}>
                
                <div className='optionBtn-container'>
              <div className="option-button" onClick={() => toggleDropDown(index)}>
              <SlOptionsVertical />
              </div>
              {showDropdown[index] && (<div className="pa-options-dropdown">
                <ul className="pa-options">
                  <li>Edit Project</li>
                  <li>Delete Project</li>
                  <li><Link to ="/clients/proposal-received">View Applications</Link></li>
                  <li><Link to ="/clients/project-completed">Mark As Done</Link></li>
                </ul>
              </div>
            )}
              
              </div>
            
           
            <h2 className="project-title">{blog.title}</h2>
           <a href="#" className="hover-profileLink">{blog.client}</a>
            <p id="category">{blog.category}</p>
            <p>{blog.location}</p>
            <p>{blog.budget}/project</p>
  
             <p className="posted-status">{blog.status}</p>
             <p className="posted-date">{blog.applyDate}</p>
            </div>
            
            </div>
  
            
          ))}
        </div>
     
    );
  }

  export default ProjectListClient;