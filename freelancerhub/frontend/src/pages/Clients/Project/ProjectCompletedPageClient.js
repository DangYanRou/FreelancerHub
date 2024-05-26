import React, { useEffect, useState } from 'react';
import ProjectList from '../../../components/ProjectList';
import { useNavigate } from 'react-router-dom';
import CompletedProjectListClient from '../../../components/CompletedProjectListClient';
import Heading from '../../../components/Heading';
import { db , auth } from '../../../firebase';  
import { collection, query, getDocs, where } from 'firebase/firestore';

const ProjectCompletedPageClient = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(db, 'projects');
      const completedProjectsQuery = query(projectsCollection, where('statusState', '==', 5));
      const querySnapshot = await getDocs(completedProjectsQuery);
      setProjects(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchProjects();
  }, []);

  return (
    <div className="ProjectCompletedPage">
    <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
            Completed Projects
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
    <div className="jl-centered-container">
      <CompletedProjectListClient projects={projects} />
    </div>
   
  </div>
  );
};

// const projects=[
//   {
//     title: 'Online Shopping App Design',
//   client: 'Hana Florist',
//   category: 'Information & Communication Technology',
//   budget: 'RM 1500-RM 2000',
//   location: 'Subang Jaya, Selangor'
//   ,id: 1,
//   description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
//   items: [
//     'User-Friendly Design',
//     'Aesthetic Appeal',
//     'Mobile Responsiveness',
//     'Integration of E-Commerce Features'
//   ],
//   completeDate: '23/4/2024',
//   }];

export default ProjectCompletedPageClient;