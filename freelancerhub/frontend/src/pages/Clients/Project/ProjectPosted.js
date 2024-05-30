import ProjectListClient from '../../../components/ProjectListClient';
import { useState, useEffect } from 'react';
import '../../../styles/Clients/ProjectPosted.css';
import Heading from '../../../components/Heading';
import { Link } from 'react-router-dom';
import { GrFormClose } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { db } from '../../../firebase'; // Adjust the path as necessary
import { collection, query, getDocs, where,doc,updateDoc,deleteDoc} from 'firebase/firestore';
import { useUser } from '../../../context/UserContext';
import Loading from '../../../components/Loading';
import { format } from 'date-fns';

const ProjectPosted = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const projectsRef = query(collection(db, 'projects'),where('clientID','==',user.id),  where('statusState', '!=', 5));
            console.log("client:"+user.id) // Use the correct method for collection reference
            const snapshot = await getDocs(projectsRef); // Fetch the documents
            const projectsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));
            setProjects(projectsData);
          } catch (error) {
            console.error('Error fetching projects: ', error);
          }finally{
            setLoading(false);
          }
        };
    
        fetchProjects();
      }, []);
    
    const handleProjectClick = (project) => {
        setSelectedProject(project);
    }

    const handleCloseModal = () => {
        setSelectedProject(null);
    }

    const handleMarkAsDone = async (project) => {    {/* update statusState=5 for both project and proposal */}
      if (project) {
          const projectRef = doc(db, "projects", project.id);
          console.log(project.id)
          try {
              await updateDoc(projectRef, {
                  statusState: 5
              });
              console.log("Project status updated successfully");
              setProjects(prevProjects => prevProjects.map(p => p.id === project.id ? { ...p, statusState: 5 } : p));
          } catch (error) {
              console.error("Error updating project status: ", error);
          }
      }
  }; 

  const onDeleteProject = async (project) => {
    if (project) {
        const projectRef = doc(db, "projects", project.id);
        try {
            await deleteDoc(projectRef);
            setProjects(prevProjects => prevProjects.filter(p => p.id !== project.id));
        } catch (error) {
            console.error("Error deleting project: ", error);
        }
    }
};

  
    if (loading) {
      return <div><Loading/></div>;
    }
  

    const ProjectModal = ({ isOpen, onClose, project }) => {
        if (!isOpen || !project) return null;

        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2 className='jl-view-project-header'>View Project</h2>
                        <button className="jl-close-btn" onClick={onClose}><GrFormClose /></button>
                    </div>
                    <ProjectDetails project={project} />
                </div>
            </div>
        );
    }

    const ProjectDetails = ({ project }) => {
        if (!project) return null;
       const formattedDate = project.date ? format(project.date.toDate(), 'dd/MM/yyyy') : '';

        
        return (
            <div className="project-details">
                <h2 id="detail-title">{project.title}</h2>
                <Link to="/freelancers/client-temporary-profile" className="hover-profileLink">{project.client}</Link>
                <p id="category">{project.category}</p>
                <p><FaLocationDot className="icon-style" />{project.location}</p>
                <p><MdOutlineAttachMoney size={20} className='icon-style2' />{project.minInput}-{project.maxInput} {project.currencyInput}/project</p>
                <p><BiTimeFive size={20} className='icon-style2' />{project.duration} {project.durationUnit}</p>
                <p>Starting from: {formattedDate}</p>
                <h3 id="about-the-project">About the Project:</h3>
                <p>{project.description}</p>
                <div>
                    <h3 id="key-requirement">Job Responsibilities:</h3>
                    <ul className="list">
              {(project.jobResponsibilities ?? []).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
                </div>
                <h3 id="preferredQualification">Preferred Qualification:</h3>
                <p>{project.preferQuali}</p>
            </div>
        );
    };

    return (
        <div className="ProjectPosted">
            <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
                Posted Project
            </Heading>
            <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
            <div className="jl-centered-container">
                <ProjectListClient projects={projects} onProjectClick={handleProjectClick} selectedProjectId={selectedProject ? selectedProject.id : null } onMarkAsDone={handleMarkAsDone} onDeleteProject={onDeleteProject}/>
                <ProjectModal isOpen={selectedProject !== null} onClose={handleCloseModal} project={selectedProject} />
            </div>
        </div>
    )
}
export default ProjectPosted;
