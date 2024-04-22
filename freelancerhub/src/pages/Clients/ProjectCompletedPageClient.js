import React from 'react';
import NavigationBarClient from './NavigationBarClient';
import ProjectList from '../../components/ProjectList';
import { useNavigate } from 'react-router-dom';
import CompletedProjectList from '../../components/CompletedProjectList';

const ProjectCompletedPageClient = () => {
  const navigate = useNavigate();
  return (
    <div className="ProjectCompletedPage">
    <NavigationBarClient></NavigationBarClient>
    <h2 className="page-header">Projects Completed</h2>
    <div className="centered-container">
      <CompletedProjectList projects={projects} />
    </div>
   
  </div>
  );
};

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
  ],
  completeDate: '10/10/2021',
  }];

export default ProjectCompletedPageClient;