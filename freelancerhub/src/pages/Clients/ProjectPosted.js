import NavigationBar from './NavigationBarClient';
import ProjectListClient from '../../components/ProjectListClient';
import { useState } from 'react';
import '../../styles/Clients/ProjectPosted.css';





const ProjectPosted= () => {
    const [selectedProject,setSelectedProject]=useState(null);
    // Initial status index
   
  
   const projects=[
     {
       title: 'Online Shopping Website Design',
     client: 'Hana Florist',
     category: 'Information & Communication Technology',
     budget: 'RM 1500-RM 2000',
     location: 'Subang Jaya, Selangor'
     ,id: 1,
     description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
     items: [
       'User-Friendly Design',
       'Aesthetic Appeal',
       'Mobile Responsiveness',
       'Integration of E-Commerce Features'
     ]
     },{
       title: 'Florist Assistant',
     client: 'Hana Florist',
     category: 'Services ',
     budget: 'RM 300',
     location: 'Petaling Jaya, Selangor',
     id: 2,
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
  
  return (
    <div className="ProjectPosted">
      <NavigationBar></NavigationBar>
       <h2 className="page-header">Project Posted</h2>
       <div className="centered-container">
   <ProjectListClient projects={projects} onProjectClick={handleProjectClick}/>
    </div>
    </div>
  )
}
export default ProjectPosted;