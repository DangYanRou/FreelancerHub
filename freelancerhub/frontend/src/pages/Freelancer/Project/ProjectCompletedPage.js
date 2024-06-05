import React, { useEffect, useState } from "react";
import CompletedProjectList from "../../../components/CompletedProjectList";
import Heading from "../../../components/Heading";
import { db } from "../../../firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useUser } from "../../../context/UserContext";
import Loading from "../../../components/Loading";
import "../../../styles/Freelancers/FreelancerCompletedProject.css";

const ProjectCompletedPage = ({ freelancerID }) => {
  const [projects, setProjects] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (user || freelancerID) {
          const uid = freelancerID || user.id;
          console.log("completed",uid);
          const projectsCollection = collection(db, "projects");
          const completedProjectsQuery = query(
            projectsCollection,
            where("statusState", "==", 5),
            where("freelancerID", "==", uid)
          );
          const querySnapshot = await getDocs(completedProjectsQuery);
          const projectsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProjects(projectsData);
        }
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch projects if user and either freelancerID or user.id is available
    if (user && (freelancerID || user.id)) {
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [freelancerID, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="ProjectCompletedPage">
      <Heading
        as="h1"
        className="text-center tracking-[-0.90px]"
        style={{ fontSize: "26px" }}
      >
        Completed Projects
      </Heading>

      <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
      <div className="jl-centered-container">
        <CompletedProjectList projects={projects} />
      </div>
    </div>
  );
};

export default ProjectCompletedPage;