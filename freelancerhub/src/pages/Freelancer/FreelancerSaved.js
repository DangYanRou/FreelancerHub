import React,{ useState } from 'react'
import NavigationBar from './NavigationBarFreelancer';
import Heading from '../../components/Heading';
import ProjectList from '../../components/ProjectListSaved';
import List from '../../components/List';
import BasicTable from '../../components/BasicTable';

const FreelancerSaved = () => {

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
    ],status:'Applied on FreelancerHub',applyDate:'1 May 2024'
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
                <ProjectList projects={projects}  selectedProjectId={selectedProject ? selectedProject.id : null}/>
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