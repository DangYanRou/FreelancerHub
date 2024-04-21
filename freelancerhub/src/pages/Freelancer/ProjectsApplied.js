import React from 'react'
import '../../styles/Freelancers/ProjectsApplied.css'
import NavigationBar from './NavigationBarFreelancer';
import ProjectList from '../../components/ProjectList';
import { useState } from 'react';
import { GrFormClose } from "react-icons/gr";
import StatusBar from '../../components/statusBar';


const ProjectDetails =({project}) => {

  const [status, setStatus] = useState(0);
  if(!project)return null;
  return(
    <div className="project-details">
      <h2>{project.title}</h2>
      <a href="#" className="hover-profileLink">{project.client}</a>
          <p id="category">{project.category}</p>
          <p>{project.location}</p>
          <p>{project.budget}/project</p>
          <h3 id="about-the-project">About the Project:</h3>
          <p id="description">{project.description}</p>
          <div>
            <h3 id="key-requirement">Key Requirements:</h3>
            <ul className="list">
              {project.items.map((item,index)=>(
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h3 id="status">Status:</h3>
            <p className="detail-status">{project.status}</p>
           <p className="detail-date">{project.applyDate}</p>
           {/*  status bar*/}
           < StatusBar status={status}/>
          </div>
          <div className='button-container'>
          <button className="btn-primary">View Application</button>
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
              <h2>View Application</h2>
            <button className="close-btn" onClick={onClose}><GrFormClose /></button>
            </div>
             <ProjectDetails project={project}/>{/* Pass project to ProjectDetails */}
              
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
   ],status:'Applied on FreelancerHub',applyDate:'1 May 2024'
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

 const handleProjectClick = (project) => {
   setSelectedProject(project);
}

const handleCloseModal = () => {
   setSelectedProject(null);
}


  return (
    <div className="ProjectsApplied">
      <NavigationBar></NavigationBar>
      <h1 className="page-header">Projects Applied</h1>
      <div className="centered-container">
   <ProjectList projects={projects} onProjectClick={handleProjectClick}   selectedProjectId={selectedProject ? selectedProject.id : null}/>
   </div>
   <ProjectModal isOpen={selectedProject !== null} onClose={handleCloseModal} project={selectedProject} />
       
    </div>
  )
}

export default ProjectsApplied;