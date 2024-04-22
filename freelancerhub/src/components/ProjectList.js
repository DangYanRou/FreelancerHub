import './ProjectList.css'
import React from 'react';
import { SlOptionsVertical } from "react-icons/sl";

const ProjectList=({projects,onProjectClick,selectedProjectId}) => {
  const handleOptionClick = (event) => {
    // Handle option click here
  };

    return(
      <div>
          {projects.map((blog)=>(
            <div className={`card ${selectedProjectId === blog.id ? 'selected' : ''}`} key={blog.id} onClick={()=>onProjectClick(blog)}> 
            <div className="card-content">
             <h2>{blog.title}</h2>
            <a href="#" className="hover-profileLink">{blog.client}</a>
            <p id="category">{blog.category}</p>
            <p>{blog.location}</p>
            <p>{blog.budget}/project</p>
  
             <p className="apply-status">{blog.status}</p>
             <p className="apply-date">{blog.applyDate}</p>
            </div>
            
  
            </div>
          ))}
        </div>
     
    );
  }

  export default ProjectList;