
import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { Link } from 'react-router-dom';
import { BiTimeFive } from "react-icons/bi";


const ProjectListSaved=({projects,onProjectClick,selectedProjectId}) => {

  const getStatusType = (statusState) => {
    // Convert statusState to a number
    const state = parseInt(statusState);
  
    switch (state) {
      case 2:
        return "Applied on FreelancerHub";
      case 3:
        return "Assigned by Client";
      case 4:
        return "In Progress";
      case 5:
        return "Completed";
      default:
        return "Unknown Status"; // Handle unknown status
    }
  };
  

    return (
    <div className='flex gap-x-4 justify-start align-start'>
      {projects.map((blog) => {
        // Destructure the budget array if it exists
     
        const statusMessage= getStatusType(blog.statusState)
        return (
          <div className="flex justify-center items-center" key={blog.id}>
            <div className={`min-w-[320px] w-auto h-[350px] relative flex-col items-start p-5 bg-[#F0F7F9] shadow rounded-lg cursor-pointer mb-4 ${selectedProjectId === blog.id ? 'selected' : ''}`} onClick={() => onProjectClick(blog)}> 
              <h2 className="project-title">{blog.title}</h2>
              <Link to="/freelancers/client-temporary-profile" className="hover-profileLink">{blog.client}</Link>
              <p id="category">{blog.category}</p>
              <p><FaLocationDot className="icon-style" />{blog.location}</p>
              <p><MdOutlineAttachMoney size={20} className='icon-style2'/>{blog.minInput}-{blog.maxInput} {blog.currencyInput}/project</p>
              <p><BiTimeFive size={20} className='icon-style2' />{blog.duration} {blog.durationUnit}</p>
              
            </div>
          </div>
        );
      })}
    </div>
  );
  }

  export default ProjectListSaved;