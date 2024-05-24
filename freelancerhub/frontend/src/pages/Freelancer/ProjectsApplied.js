import React from 'react'
import '../../styles/Freelancers/ProjectsApplied.css'
import NavigationBar from './NavigationBarFreelancer';
import ProjectList from '../../components/ProjectList';
import { useState } from 'react';
import { GrFormClose } from "react-icons/gr";
import ProjectDetailsPage from './ProjectDetailsPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import StatusBar from '../../components/statusBar2';
import { useHistory } from 'react-router-use-history';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import Heading from '../../components/Heading';



const ProjectDetails =({project}) => {

  const history = useHistory();
  const handleViewApplication = () => {
    history.push('/freelancers/application',
      {proposal_key: {projectID:"projectID1",freelancerID:"freelancerID1"}},
    );
  };
  
  const [status, setStatus] = useState(0);
  if(!project)return null;
  return(
    <div className="pa-project-details">
      <Link to="/freelancers/project-details" className="link">{project.title}</Link><br></br>
      <a href="#" className="hover-profileLink">{project.client}</a>
          <p id="category">{project.category}</p>
          <p><FaLocationDot className="icon-style"/>{project.location}</p>
            <p><MdOutlineAttachMoney size={20}className='icon-style2' />{project.budget}/project</p>
            <p><BiTimeFive size={20}className='icon-style2' />{project.duration}</p> 
            <p>Starting from: {project.date}</p>
          
          <h3 id="status">Status:</h3>
            <p className="detail-status">{project.status}</p>
           <p className="detail-date">{project.applyDate}</p>
           {/*  status bar*/}
           <div className="statusbar">
           < StatusBar status={status}/></div>
          
          <div className='button-container'>
          <button className="btn-primary" onClick={handleViewApplication}>View Application</button>
          <button className="btn-secondary">Cancel Application</button>
          </div>


    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, project }) => {


  if (!isOpen||!project) return null;

  return (
      <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 id className='view-application-header' >View Application</h2>
            <button className="close-btn" onClick={onClose}><GrFormClose /></button>
            </div>
             <ProjectDetails project={project}/>
              
          </div>
      </div>
  );
}


const ProjectsApplied = () => {

  const [selectedProject,setSelectedProject]=useState(null);
  // Initial status index
 

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
   ],status:'Applied on FreelancerHub',applyDate:'1 May 2024',preferQuali:"Diploma/Degree in COmputer Science",date:"27/4/2024",duration:"1 month"
   },{
     title: 'Online Shop Website Design',
   client: 'Mr Honey Bees Farm',
   category: 'Information & Communication Technology',
   budget: 'RM 800-RM1000',
   location: 'Sitiawan, Manjung',
   id: 2,
   description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
   items: [
     'User-Friendly Design',
     'Aesthetic Appeal',
     'Mobile Responsiveness',
     'Integration of E-Commerce Features'
   ],status:'Applied on FreelancerHub',applyDate:'24 April 2024'
   }
 ];

 const handleProjectClick = (project) => {
   setSelectedProject(project);
}

const handleCloseModal = () => {
   setSelectedProject(null);
}


  return (
    <div className="ProjectsApplied">
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
            Applied Projects
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
      <div className="jl-centered-container">
   <ProjectList projects={projects} onProjectClick={handleProjectClick}   selectedProjectId={selectedProject ? selectedProject.id : null}/>
   </div>
   <ProjectModal isOpen={selectedProject !== null} onClose={handleCloseModal} project={selectedProject} />
   
       
    </div>
  )
}

export default ProjectsApplied;