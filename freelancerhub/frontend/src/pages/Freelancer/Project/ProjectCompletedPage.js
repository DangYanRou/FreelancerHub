import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompletedProjectList from "../../../components/CompletedProjectList";
import Heading from "../../../components/Heading";
import { db, auth } from "../../../firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useUser } from "../../../context/UserContext";
import Loading from "../../../components/Loading";
import '../../../styles/Freelancers/FreelancerCompletedProject.css';

const ProjectCompletedPage = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const fetchProjects = async () => {
      try {
        if (user) {
          console.log(user.id);
          const projectsCollection = collection(db, "projects");
          const completedProjectsQuery = query(
            projectsCollection,
            where("statusState", "==", 5),
            where("freelancerID", "==", user.id)        
          );
          console.log(user.id)
          const querySnapshot = await getDocs(completedProjectsQuery);
          const projectsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setProjects(projectsData);
      }} catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
   // Cleanup function to unsubscribe from the listener when the component unmounts
 
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="ProjectCompletedPage">
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
        Completed Projects
      </Heading>

      {/* Line divider */}
      <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
      <div className="jl-centered-container">
        <CompletedProjectList projects={projects} />
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
//   completeDate: '10/10/2021',
//   }];

export default ProjectCompletedPage;
