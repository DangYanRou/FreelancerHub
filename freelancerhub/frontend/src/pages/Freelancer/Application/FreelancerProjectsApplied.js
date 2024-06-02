import React, { useState, useEffect } from 'react';
import '../../../styles/Freelancers/ProjectsApplied.css';
import ProjectList from '../../../components/ProjectList';
import { GrFormClose } from "react-icons/gr";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import StatusBar from '../../../components/statusBar2';
import { useHistory } from 'react-router-use-history';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import Heading from '../../../components/Heading';
import { db } from '../../../firebase';  
import { getStorage, ref, deleteObject } from "firebase/storage";
import { collection, query, getDocs, doc, getDoc,where,updateDoc,deleteDoc } from 'firebase/firestore';
import Loading from '../../../components/Loading';
import { useUser } from '../../../context/UserContext';
import { format } from 'date-fns';
import ConfirmationDialog from '../../../components/ConfirmationDialog';



const ProjectDetails = ({ project ,user,onCancelApplication}) => {
  const history = useHistory();
  const handleViewApplication = () => {
    history.push('/freelancers/application', {
      proposal_key: { projectID: project.id, freelancerID: user.id },    });
  };

  const handleCancelApplication=()=>{
    onCancelApplication(project.id)
  }

  const getStatusType = (statusState) => {
  
    switch (statusState) {
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
  const formattedDate = project.date ? format(project.date.toDate(), 'dd/MM/yyyy') : '';
  const statusMessage = getStatusType(project.statusState);
  console.log(project.statusState)

  return (
    <div className="pa-project-details">
      <Link to="/freelancers/project-details" className="jl-title-pa">{project.title}</Link><br />
      <a href="#" className="jl-profileLink-pa">{project.client}</a>
      <p id="category">{project.category}</p>
      <p><FaLocationDot className="icon-style" />{project.location}</p>
      <p><MdOutlineAttachMoney size={20} className='icon-style2' />{project.minInput}-{project.maxInput} {project.currencyInput}/project</p>
      <p><BiTimeFive size={20} className='icon-style2' />{project.duration} {project.durationUnit}</p>
      <p>Starting from: {formattedDate}</p>
      <h3 id="status">Status:</h3>
      <p className="detail-status">{statusMessage}</p>
      <p className="detail-date">{project.applyDate}</p> {/*rmb add this !! apply btn */}
      <div className="statusbar">
        <StatusBar statusState={project.statusState}/>
      </div>
      <div className='jl-button-container'>
        <button className="btn-primary" onClick={handleViewApplication}>View Application</button>
        <button className="btn-secondary" onClick={handleCancelApplication}>Cancel Application</button>
      </div>
    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, project, loading ,user,onCancelApplication}) => {
  if (!isOpen || !project) return null;
  return (
    <div className="jl-modal-overlay" onClick={onClose}>
      <div className="jl-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="jl-modal-header">
          <h2 className='jl-view-application-header'>View Application</h2>
          <button className="jl-close-btn" onClick={onClose}><GrFormClose /></button>
        </div>
        {loading ? <Loading /> : <ProjectDetails project={project} user={user} onCancelApplication={onCancelApplication}/>}
      </div>
    </div>
  );
};



const FreelancerProjectsApplied = () => {

  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const[deleteLoading,setDeleteLoading]=useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false); // Loading state for the modal content
  const [status, setStatus] = useState(null); // Add status state here
  const { user } = useUser();


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!user?.id) {
          console.error('User ID is not available');
          return;
        }

        const proposalsQuery = query(collection(db, 'proposals'), where('freelancerID', '==', user.id),where('statusState','!=',5));
        console.log('Fetching proposals for freelancerID:', user.id);

        const proposalSnapshot = await getDocs(proposalsQuery);
        if (proposalSnapshot.empty) {
          console.log('No proposals found for this freelancer');
          setLoading(false);
          return;
        }

        const projectPromises = proposalSnapshot.docs.map(async (proposalDoc) => {
          const proposalData = proposalDoc.data();
          const statusState = proposalData.statusState;
          const projectId = proposalData.projectID;

          console.log('Proposal Data:', proposalData);
          console.log('stateStatus:', statusState);
          console.log('projectID:', projectId);

          if (statusState) {
            setStatus(statusState);
          } else {
            console.warn('stateStatus is undefined for proposal:', proposalDoc.id);
          }

          if (projectId) {
            const projectRef = doc(db, 'projects', projectId);
            const projectDoc = await getDoc(projectRef);
            if (projectDoc.exists()) {
              return { id: projectDoc.id, ...projectDoc.data() ,statusState};
            } else {
              console.warn('No project found for ID:', projectId);
              return null;
            }
          } else {
            console.warn('projectID is undefined for proposal:', proposalDoc.id);
            return null;
          }
        });

        const projectData = await Promise.all(projectPromises);
        setProjects(projectData.filter(project => project !== null));

      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);


  const handleProjectClick = async (project) => {
    setModalLoading(true); // Start modal loading
    try {
      setSelectedProject(project);
      //setStatus(project.statusState); // Update status based on the selected project
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

  if (deleteLoading) {
    return (
      <div className='success-modal-overlay'>
        <div className='success-modal-content'>
          <div className="processing-container">
            <div className="spinner"></div>
            <h2 className="processing-text">Deleting...</h2>
          </div>
        </div>
      </div>
    );
  }
  

  const handleOpenCancelModal = (project) => {
    setDeleteConfirmationOpen(true);
  };

  const handleCloseCancelModal = () => {
    setDeleteConfirmationOpen(false)
  };

  const handleCancelApplication = async (projectId) => {
    setDeleteLoading(true); // Start loading
    try {
        const proposalsQuery = query(
            collection(db, 'proposals'),
            where('freelancerID', '==', user.id),
            where('projectID', '==', projectId)
        );
        const proposalSnapshot = await getDocs(proposalsQuery);
        const proposalDoc = proposalSnapshot.docs[0];
        if (proposalDoc) {
            const proposalData = proposalDoc.data();
            await deleteDoc(doc(db, 'proposals', proposalDoc.id));

            // Delete CV
            if (proposalData.cvUrl) {
                const storage = getStorage();
                const fileRef = ref(storage, proposalData.cvUrl);

                try {
                    await deleteObject(fileRef);
                    console.log('CV deleted successfully');
                } catch (error) {
                    console.error('Error deleting CV:', error);
                }
            }

            // Delete proposal
            if (proposalData.proposalUrl) {
                const storage = getStorage();
                const fileRef = ref(storage, proposalData.proposalUrl);

                try {
                    await deleteObject(fileRef);
                    console.log('Proposal deleted successfully');
                } catch (error) {
                    console.error('Error deleting proposal:', error);
                }
            }

            setProjects(projects.filter(project => project.id !== projectId));
            setDeleteConfirmationOpen(false); // Close confirmation modal
            setShowSuccessModal(true); // Open success modal
            handleCloseModal();
            setTimeout(() => setShowSuccessModal(false), 1000);
        }
    } catch (error) {
        console.error("Error cancelling application: ", error);
    } finally {
      setDeleteLoading(false);
    }
};

  return (
    <div className="ProjectsApplied">
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
        Applied Projects
      </Heading>
      <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
      <div className="jl-centered-container">
        <ProjectList projects={projects} onProjectClick={handleProjectClick} selectedProjectId={selectedProject ? selectedProject.id : null} />
      </div>
      <ProjectModal isOpen={selectedProject !== null} onClose={handleCloseModal} project={selectedProject} loading={modalLoading}  user={user} onCancelApplication={handleOpenCancelModal} />
      <ConfirmationDialog
                        open={deleteConfirmationOpen}
                        onClose={handleCloseCancelModal}
                        onConfirm={() => handleCancelApplication(selectedProject.id)} 
                        message="Are you sure you want to cancel your application for this project?"
                    />

      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal-content">
        
            <p className="delete-message">Delete Successful!</p>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerProjectsApplied;
