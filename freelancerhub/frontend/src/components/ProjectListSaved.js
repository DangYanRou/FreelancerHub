
import React from 'react';

const ProjectListSaved=({projects,onProjectClick,selectedProjectId}) => {

    return(
      <div className='flex gap-x-4 overflow-x-auto justify-start align-start w-full'>
          {projects.map((blog)=>(
            <div className={`card ${selectedProjectId === blog.id ? 'selected' : ''}`} key={blog.id} onClick={()=>onProjectClick(blog)}> 
             <h2>{blog.title}</h2>
            <a href="#" className="hover-profileLink">{blog.client}</a>
            <p id="category">{blog.category}</p>
            <p>{blog.location}</p>
            <p>{blog.minInput}-{ blog.maxInput}/project</p>
  
             <p className="apply-status">{blog.status}</p>
             <p className="apply-date">{blog.applyDate}</p>
            </div>
  
            
          ))}
        </div>
     
    );
  }

  export default ProjectListSaved;