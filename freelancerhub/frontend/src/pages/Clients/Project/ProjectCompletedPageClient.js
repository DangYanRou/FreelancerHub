import React, { useEffect, useState } from "react";
import CompletedProjectListClient from "../../../components/CompletedProjectListClient";
import Heading from "../../../components/Heading";
import { db, auth } from "../../../firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import Loading from "../../../components/Loading";
import { useUser } from '../../../context/UserContext';
import '../../../styles/Clients/ClientCompletedProject.css';

const ProjectCompletedPageClient = () => {

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
            where("clientID", "==", user.id)        
          );
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
       <Heading as="h1" className="text-center tracking-[-0.90px]" style={{ fontSize: '26px' }}>
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

export default ProjectCompletedPageClient;
