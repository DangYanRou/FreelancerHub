import NavigationBar from './NavigationBarClient';
import ProjectListClient from '../../Components/ProjectListClient';
import { useState } from 'react';
import '../../styles/Clients/ProjectPosted.css';
import Heading from '../../Components/Heading';





const ProjectPosted= () => {
    const [selectedProject,setSelectedProject]=useState(null);
    // Initial status index
   
  
   const projects=[
     {
       title: 'Online Shopping App Design',
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
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
            Project Posted
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
       <div className="jl-centered-container">
   <ProjectListClient projects={projects} onProjectClick={handleProjectClick}/>
    </div>
    </div>
  )
}
export default ProjectPosted;