import './ProjectList.css'
import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Link } from 'react-router-dom';


const ProjectList=({projects,onProjectClick,selectedProjectId}) => {
  const handleOptionClick = (event) => {
    // Handle option click here
  };

    return(
      <div>
          {projects.map((blog)=>(
             <div className="jl-centred-container">
            <div className={`card ${selectedProjectId === blog.id ? 'selected' : ''}`} key={blog.id} onClick={()=>onProjectClick(blog)}> 
           
             <h2>{blog.title}</h2>
            <Link to="/freelancers/client-temporary-profile" className="hover-profileLink">{blog.client}</Link>
            <p id="category">{blog.category}</p>
            
            <p><FaLocationDot className="icon-style"/>{blog.location}</p>
            <p><MdOutlineAttachMoney size={20}className='icon-style2' />{blog.budget}/project</p>
             <p className="apply-status">{blog.status}</p>
             <p className="apply-date">{blog.applyDate}</p>
            </div>
            
  
            </div>
          ))}
        </div>
     
    );
  }

  export default ProjectList;