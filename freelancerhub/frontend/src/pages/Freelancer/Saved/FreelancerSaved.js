import React, { useEffect, useState } from 'react';
import NavigationBarFreelancer from '../../../nav/NavigationBarFreelancer';
import Heading from '../../../components/Heading';
import ProjectList from '../../../components/ProjectListSaved';
import List from '../../../components/List';
import BasicTableClient from '../../../components/BasicTableClient';
import { GrFormClose } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import '../../../styles/Freelancers/FreelancerSaved.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { db, auth } from '../../../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';


const FreelancerSaved = () => {
  const navigate = useNavigate();
  const handleApply = () => {
    navigate('/freelancers/proposal-form');
  };

  const [favProjects, setFavProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const collectionRef = collection(db, "favouriteProject");

  const getFavProjects = async () => {
    try {
      const userID = auth.currentUser.uid;
      const q = query(collectionRef, where("savedBy", "==", userID));

      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => {
        const projectData = doc.data();
        if (projectData.date) {
          projectData.date = projectData.date.toDate().toLocaleDateString();
        }
        return { ...projectData, id: doc.id };
      });
      setFavProjects(filteredData);
    } catch (error) {
      console.log(error.message);
    }
  };

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getFavProjects(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const ProjectModal = ({ isOpen, onClose, project }) => {
    if (!isOpen || !project) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 id='view-application-header'>View Project</h2>
            <button className="close-btn" onClick={onClose}><GrFormClose /></button>
          </div>
          <ProjectDetails project={project} />
        </div>
      </div>
    );
  };

  const ProjectDetails = ({ project }) => {
    if (!project) return null;
    return (
      <div className="project-details">
        <h2 id="detail-title">{project.title}</h2>
        <Link to="/freelancers/client-temporary-profile" className="hover-profileLink">{project.client}</Link>
        <p id="category">{project.category}</p>
        <p><FaLocationDot className="icon-style" />{project.location}</p>
        <p><MdOutlineAttachMoney size={20} className='icon-style2' />{project.minInput}-{project.maxInput}/project</p>
        <p><BiTimeFive size={20} className='icon-style2' />{project.duration}</p>
        <p>Starting from: {project.date}</p>
        <h3 id="about-the-project">About the Project:</h3>
        <p>{project.description}</p>
        <div>
          <h3 id="key-requirement">Job Responsibilities:</h3>
          <ul className="list">
            {project.jobResponsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <h3 id="preferredQualification">Preferred Qualification:</h3>
        <p>{project.preferredQualification}</p>
        <button id="applyButton" onClick={handleApply} className="btn btn-primary">Apply</button>
      </div>
    );
  };

  const handleProjectClick = (project) => {
    setSelectedProject(prevProject => (prevProject && prevProject.id === project.id ? null : project));
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      <div className="flex w-full justify-end bg-white-A700 py-[63px] md:py-5">
        <div className="flex w-[100%] flex-col items-start md:w-full md:p-5">
          <Heading as="h1" className="text-center tracking-[-0.90px]" style={{ fontSize: '26px', marginLeft: '40px' }}>
            Your Favourite
          </Heading>
          <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
          <div className="ml-[30px] flex flex-col items-start gap-[54px] self-stretch sm:gap-[27px]">
            <div className="font-poppin border-4 border-grey rounded-lg p-3">
              Projects
            </div>
            <List
              className="overflow-x-auto flex gap-x-6 w-full max-w-screen-lg mx-auto ml-[50px]"
              orientation="horizontal"
            >
              {favProjects.length > 0 ? (
                <ProjectList 
                  projects={favProjects}
                  onProjectClick={handleProjectClick}
                  selectedProjectId={selectedProject ? selectedProject.id : null}
                />
              ) : (
                <div style={{ fontFamily: 'Poppins' }}>No favourite project at the moment</div>
              )}
              <ProjectModal isOpen={selectedProject !== null} onClose={handleCloseModal} project={selectedProject} />
            </List>
            <div className="font-poppin border-4 border-grey rounded-lg p-3">
              Collaborator
            </div>
            <BasicTableClient />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSaved;
