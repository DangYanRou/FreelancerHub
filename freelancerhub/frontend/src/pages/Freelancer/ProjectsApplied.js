import React, { useState, useEffect } from 'react';
import '../../styles/Freelancers/ProjectsApplied.css';
import NavigationBar from './NavigationBarFreelancer';
import ProjectList from '../../components/ProjectList';
import { GrFormClose } from "react-icons/gr";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import StatusBar from '../../components/statusBar2';
import { useHistory } from 'react-router-use-history';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import Heading from '../../components/Heading';
import { db } from '../../firebase';  // Adjust the path as necessary
import { collection, query, getDocs, doc, getDoc,where,updateDoc } from 'firebase/firestore';
import Loading from '../Loading';
import { useUser } from '../../UserContext';

const ProjectDetails = ({ project }) => {
  const history = useHistory();
  const handleViewApplication = () => {
    history.push('/freelancers/application', {
      proposal_key: { projectID: "projectID1", freelancerID: "freelancerID1" },
    });
  };

  const getStatusType = (statusState) => {
    const state = parseInt(statusState);
    switch (state) {
      case 2:
        return "Applied on FreelancerHub";
      case 3:
        return "Assigned by Client";
      case 4:
        return "In Progress";
      case 5:
        return "Completed";
      default:
        return "Unknown Status";
    }
  };

  if (!project) return null;
  const [min, max, currency] = project.budget;
  const statusMessage = getStatusType(project.statusState);

  return (
    <div className="pa-project-details">
      <Link to="/freelancers/project-details" className="link">{project.title}</Link><br />
      <a href="#" className="hover-profileLink">{project.client}</a>
      <p id="category">{project.category}</p>
      <p><FaLocationDot className="icon-style" />{project.location}</p>
      <p><MdOutlineAttachMoney size={20} className='icon-style2' />{min}-{max} {currency}/project</p>
      <p><BiTimeFive size={20} className='icon-style2' />{project.duration ?`${project.duration[0]} ${project.duration[1]}` : ''}</p>
      <p>Starting from: {project.date}</p>
      <h3 id="status">Status:</h3>
      <p className="detail-status">{statusMessage}</p>
      <p className="detail-date">{project.applyDate}</p>
      <div className="statusbar">
        <StatusBar projectId={project.id}/>
      </div>
      <div className='button-container'>
        <button className="btn-primary" onClick={handleViewApplication}>View Application</button>
        <button className="btn-secondary">Cancel Application</button>
      </div>
    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, project, loading }) => {
  if (!isOpen || !project) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className='view-application-header'>View Application</h2>
          <button className="close-btn" onClick={onClose}><GrFormClose /></button>
        </div>
        {loading ? <Loading /> : <ProjectDetails project={project} />}
      </div>
    </div>
  );
};

const ProjectsApplied = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false); // Loading state for the modal content
  const [status, setStatus] = useState(1); // Add status state here
  const {user}=useUser();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const proposalsQuery = query(collection(db, 'proposals'),where('freelancerID','==',user))
        const proposalSnapshot = await getDocs(proposalsQuery);
        const projectPromises = proposalSnapshot.docs.map(async (proposalDoc) => {
          const projectId = proposalDoc.data().projectID;
          const projectRef = doc(db, 'projects', projectId);
          const projectDoc = await getDoc(projectRef);
          return { id: projectDoc.id, ...projectDoc.data() };
        });
        const projectData = await Promise.all(projectPromises);
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = async (project) => {
    setModalLoading(true); // Start modal loading
    try {
      setSelectedProject(project);
      setStatus(project.statusState); // Update status based on the selected project
    } catch (error) {
      console.error("Error fetching project details: ", error);
    } finally {
      setModalLoading(false); // End modal loading
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return <div><Loading/></div>;
  }

  return (
    <div className="ProjectsApplied">
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
        Applied Projects
      </Heading>
      <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
      <div className="jl-centered-container">
        <ProjectList projects={projects} onProjectClick={handleProjectClick} selectedProjectId={selectedProject ? selectedProject.id : null} />
      </div>
      <ProjectModal isOpen={selectedProject !== null} onClose={handleCloseModal} project={selectedProject} loading={modalLoading} />
    </div>
  );
};

export default ProjectsApplied;
