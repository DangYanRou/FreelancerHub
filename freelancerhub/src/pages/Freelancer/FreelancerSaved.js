import React,{ useState } from 'react'
import NavigationBar from './NavigationBarFreelancer';
import Heading from '../../Components/Heading';
import ProjectList from '../../Components/ProjectListSaved';
import List from '../../Components/List';
import BasicTable from '../../Components/BasicTable';
import { GrFormClose } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import '../../styles/Freelancers/FreelancerSaved.css'
import { duration } from '@mui/material';
import { useHistory } from 'react-router-use-history';


const FreelancerSaved = () => {

  const history = useHistory();
  const handleApply = () => {
    history.push('/freelancers/proposal-form');
    };

  const [selectedProject,setSelectedProject]=useState(null);

  const projects=[
    {
      title: 'Online Shopping Website Design',
    client: 'Hana Florist',
    category: 'Information Technology',
    budget: 'RM 1500-RM 2000',
    location: 'Petaling Jaya, Selangor'
    ,id: 1,
    description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
    items: [
      'User-Friendly Design',
      'Aesthetic Appeal',
      'Mobile Responsiveness',
      'Integration of E-Commerce Features'
    ],preferQuali:'Diploma/Degree in Computer Science',duration:'1 month'
    },{
      title: 'Online Shopping Website Design',
    client: 'Hana Florist',
    category: 'Information Technology',
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

  const ProjectModal = ({ isOpen, onClose, project }) => {
    if (!isOpen||!project) return null;
  
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 id className='view-application-header'>View Project</h2>
              <button className="close-btn" onClick={onClose}><GrFormClose /></button>
              </div>
               <ProjectDetails project={project}/>{/* Pass project to ProjectDetails */}
                
            </div>
        </div>
    );
  }
  
  
  const ProjectDetails =({project}) => {
    if(!project)return null;
    return(
      <div className="project-details">
        <h2 id="detail-title">{project.title}</h2>
        <a href="#" className="hover-profileLink">{project.client}</a>
            <p id="category">{project.category}</p>
            <p><FaLocationDot className="icon-style"/>{project.location}</p>
            <p><MdOutlineAttachMoney size={20}className='icon-style2' />{project.budget}/project</p>
            <p><BiTimeFive size={20}className='icon-style2' />{project.duration}</p> 
            <p>Starting from: {project.date}</p>
           
            <h3 id="about-the-project">About the Project:</h3>
            <p>{project.description}</p>
            <div>
              <h3 id="key-requirement">Job Responsibilities:</h3>
              <ul className="list">
                {project.items.map((item,index)=>(
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <h3 id="preferredQualification">Preferred Qualification:</h3>
            <p>{project.preferQuali}</p>
            <button id="applyButton" onClick={handleApply} className="btn btn-primary">Apply</button>

          
  
  
      </div>
    );
  };

  
  const handleProjectClick=(project)=>{
    setSelectedProject((prevProject)=>
      prevProject && prevProject.id==project.id?null:project
    );
  
  }
  const handleCloseModal = () => {
    setSelectedProject(null);
 }
 


  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className="flex w-full justify-end bg-white-A700 py-[63px] md:py-5">
        {/* favorite projects header section */}
        <div className=" flex w-[100%] flex-col items-start  md:w-full md:p-5">
          {/* favorite projects title section */}
          <Heading as="h1" className="ml-[20px] tracking-[-0.90px]">
            Your Favourite
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
          

          {/* projects and collaborators section */}
          <div className="ml-[30px] flex flex-col items-start gap-[54px] self-stretch sm:gap-[27px]">
            {/* projects button section */}
            <div className="font-poppin border-4 border-grey rounded-lg p-3">
              Projects
            </div>

            <List
                className="overflow-x-auto flex gap-x-6 w-full max-w-screen-lg mx-auto ml-[50px]"
                orientation="horizontal"
              >

                <ProjectList projects={projects} onProjectClick={handleProjectClick}   selectedProjectId={selectedProject ? selectedProject.id : null}/>
               <ProjectModal isOpen={selectedProject !== null} onClose={handleCloseModal} project={selectedProject} />
              </List>
              
            

            {/* collaborator button section */}
            <div className="font-poppin border-4 border-grey rounded-lg p-3">
              Collaborator
            </div>

            <BasicTable />
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelancerSaved;