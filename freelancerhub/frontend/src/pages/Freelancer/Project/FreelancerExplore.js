import React, { useState, useEffect } from 'react';
import backgroundHome from "../../../Gallery/backgroundHome.png"; 
import search from "../../../Gallery/img_search.svg";
import location from "../../../Gallery/img_iconoir_pin_alt.svg";
import catergory from "../../../Gallery/catergory_icon.svg";
import dropdownArrow from "../../../Gallery/dropdownArrow_icon.svg";
import '../../../styles/Freelancers/FreelancerExplore.css'
import { useHistory } from 'react-router-use-history';
import { GrFormClose } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { db, auth } from '../../../firebase'; 
import { getDocs, collection, addDoc } from 'firebase/firestore';
import Loading from '../../../components/Loading';
import { format } from 'date-fns';
import { formatDistanceToNow } from 'date-fns';


const FreelancerExplore = () => {  
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [bookmarkedProjects, setBookmarkedProjects] = useState({});
  const [selectedProject,setSelectedProject]=useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [appliedProjects, setAppliedProjects] = useState([]);

  //deon
  const handleSave = async (project) => {
    try {
      const collectionRef = collection(db, 'favouriteProject');
      const userID = auth.currentUser.uid;
      const projectWithSavedBy = { ...project, savedBy: userID };
      await addDoc(collectionRef, projectWithSavedBy);
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project: ', error);
      alert('Failed to save project');
    }
  };
  //deon

  const history = useHistory();

  const handleApply = (projectID, clientID) => {
    history.push('/freelancers/proposal-form', {
      user_key: { freelancerID: user.id },
      project_key: { projectID: projectID, clientID: clientID }
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, 'projects'); // Use the correct method for collection reference
        const snapshot = await getDocs(projectsRef); // Fetch the documents
        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);

        if (user) {
          const proposalsRef = collection(db, 'proposals');
          const proposalsSnapshot = await getDocs(proposalsRef);
          const appliedProjectsData = proposalsSnapshot.docs
            .filter(doc => doc.id.endsWith(`_${user.id}`))
            .map(doc => doc.id.split('_')[0]); // Extract projectID from documentID

          setAppliedProjects(appliedProjectsData);
        }

      } catch (error) {
        console.error('Error fetching projects: ', error);
      }finally{
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

 
  if (loading) {
    return <div><Loading/></div>;
  }

  


  const handleClick = (projectId) => {
    setBookmarkedProjects({
      ...bookmarkedProjects,
      [projectId]: !bookmarkedProjects[projectId]
    });
  };

  const dropdowns = [
    { title: 'Workplace', options: ['Onsite', 'Remote', 'Hybrid'] },
    { title: 'Workload', options: ['20% (1 day per week)', '40% (2 days per week)', '60% (3 days per week)','80% (4 days per week)','100% (5 days per week)','not specified'] },
    { title: 'Budget', min: minBudget, max: maxBudget }
  ];

  const categories = [
    'Marketing',
    'Sales',
    'Development',
    'Design',
    'Human Resources',
    'Finance',
    'IT',
    'Operations',
    'Product',
    'Other'
  ];

  function validateBudget(min, max) {
    if (min && max) {
      return Number(min) <= Number(max);
    }
    return true;
  }


  
  const handleProjectClick=(project)=>{
    setSelectedProject((prevProject)=>
      prevProject && prevProject.id==project.id?null:project
    );
  
  }
  
  const handleCloseModal = () => {
    setSelectedProject(null);
 }
 


 const ProjectList = ({ projects, onProjectClick, selectedProjectId }) => {
  return (
    <div className={`flex flex-col ${selectedProjectId ? 'w-3/5' : 'flex-grow'}`}>
      {projects.map((blog) => {
        // Destructure budget and duration from blog object
        const postedTime = blog.postedTime?.toDate();
        const timeAgo = postedTime ? formatDistanceToNow(postedTime, { addSuffix: true }) : '';

        return (
          <div
            className={`card ${selectedProjectId === blog.id ? 'selected' : ''} mb-4`}
            key={blog.id}
            onClick={() => onProjectClick(blog)}
          >
            <h2>{blog.title}</h2>
            <Link to="/freelancers/client-temporary-profile" className="hover-profileLink">{blog.client}</Link>
            <p id="category">{blog.category}</p>
            <p><FaLocationDot className="icon-style"/>{blog.location}</p>
            <p>
              <MdOutlineAttachMoney size={20} className='icon-style2' />
              {blog.minInput}-{blog.maxInput} {blog.currencyInput}/project
            </p>
            <p>
              <BiTimeFive size={20} className='icon-style2' />
              {blog.duration} {blog.durationUnit}
            </p>
            <div className="absolute bottom-4 right-3  w-50 h-8"  style={{ color: 'grey' }}>
            <p id="posted-time">Posted {timeAgo}</p></div>
            <div className="absolute top-4 right-3 space-x-4 w-8 h-8">
              {bookmarkedProjects[blog.id] ? 
                <BsBookmarkCheckFill 
                  size={20} 
                  className="cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(blog.id);
                    
                  }} 
                /> 
                : 
                <BsBookmark 
                  size={20} 
                  className="cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(blog.id);
                    handleSave(blog); 
                  }} 
                />
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};

  
  const ProjectModal = ({ isOpen, onClose, project }) => {
    if (!isOpen||!project) return null;
  
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className='view-application-header'>View Project</h2>
              <button className="jl-close-btn" onClick={onClose}><GrFormClose /></button>
              </div>
               <ProjectDetails project={project}/>{/* Pass project to ProjectDetails */}
                
            </div>
        </div>
    );
  }
  
  
  const ProjectDetails =({project}) => {
    if(!project)return null;
    const hasApplied = appliedProjects.includes(project.id);
    const formattedDate = project.date ? format(project.date.toDate(), 'dd/MM/yyyy') : '';
    return(
      <div className="project-details">
        <h2 id="detail-title">{project.title}</h2>
        <h2 className="jl-profileLink">{project.client}</h2>
            <p id="category">{project.category}</p>
            <p><FaLocationDot className="icon-style"/>{project.location}</p>
            <p><MdOutlineAttachMoney size={20}className='icon-style2' />{project.minInput}-{project.maxInput} {project.currencyInput}/project</p>
            <p><BiTimeFive size={20}className='icon-style2' />{project.duration} {project.durationUnit}</p> 
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
            <p>{project.preferredQualification}</p>
            {hasApplied ? (
          <button id="applyButton" className="btn-disabled" disabled>Applied</button>
        ) : (
          <button id="applyButton" onClick={() => handleApply(project.id, project.clientID)} className="btn btn-primary">Apply</button>
        )}
  
  
      </div>
    );
  };

  return (

    <div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      
    <div className="relative ">
      <img src={backgroundHome} alt="Background" className="w-screen object-cover h-1/2" />
      <div className="absolute bottom-[30%] left-0 right-0 m-auto flex w-full max-w-[1070px] flex-col items-center gap-[66px] md:p-5 sm:gap-[33px]">
        <h1 className="text-shadow-ts tracking-[-1.20px] text-5xl font-bold mb-5 text-white">
  Search Project
</h1>
<div className="flex items-center justify-between self-stretch rounded-[39px] bg-white px-5 py-2">
<div className="flex items-center gap-4">
  <img src={search} alt="search_one" className="h-[42px] w-[42px] align-middle" />
  <input type="text" placeholder="Job title or keyword" className="!text-[21.03px] border-none outline-none flex-grow h-[30px] py-2" />
</div>
<div className="flex items-center gap-4">
    <img src={catergory} alt="iconoirpinalt" className="h-[33px] w-[33px] align-middle" />
    <select className="!text-[21.03px] border-none outline-none flex-grow h-[30px] ">
      <option value="">Select a category...</option>
      {categories.map((category, index) => (
        <option key={index} value={category.toLowerCase()}>{category}</option>
      ))}
    </select>
  </div>
<div className="flex items-center gap-4">
  <img src={location} alt="iconoirpinalt" className="h-[33px] w-[33px] align-middle" />
  <input type="text" placeholder="Johor, Malaysia" className="!text-[21.03px] border-none outline-none flex-grow h-[30px] py-2" />
</div>
<button 
  // onClick={handleSearch} 
  className="ml-[33px] md:ml-0 sm:px-5 bg-[#214E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-full">
  Search
</button>
</div>
</div>
</div>
      <div className="flex justify-center items-center pt-10">
      <div className="flex flex-row">
            <div className="flex flex-col w-1/4">
      {dropdowns.map((dropdown, index) => (
  <details key={index} open className="mb-4 rounded-xl bg-white shadow overflow-hidden" onToggle={(e) => {
    const arrow = e.target.querySelector('.arrow');
          if (e.target.open) {
            arrow.classList.add('rotate-180');
          } else {
            arrow.classList.remove('rotate-180');
          }
        }}>
          <summary className="cursor-pointer text-white font-bold bg-[#69ACC2] p-3 flex justify-between items-center rounded-xl">
            {dropdown.title}
            <img className="arrow ml-2" src={dropdownArrow} alt="arrow" />
          </summary>
          {dropdown.title === 'Budget' ? (
            <div className="p-4 white rounded-md">
              <div className="flex items-center mb-2 justify-between">
                <label className="text-sm ml-2 font-bold text-gray-700">
                  Min:
                </label>
                <input
                  type="number"
                  value={dropdown.min}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (validateBudget(value, dropdown.max)) {
                      setMinBudget(value);
                    }
                  }}
                  className="mt-1 w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center mb-2 justify-between">
                <label className="text-sm ml-2 font-bold text-gray-700">
                  Max:
                </label>
                <input
                  type="number"
                  value={dropdown.max}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (validateBudget(dropdown.min, value)) {
                      setMaxBudget(value);
                    }
                  }}
                  className="mt-1 w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          ) : (
            dropdown.options.map((option,i) => (
              <div key={i} className="flex items-center p-2 hover:bg-gray-200">
                <input type="checkbox" id={`option-${index}-${i}`} name={`option-${index}-${i}`} className="form-checkbox rounded-xl h-5 w-5 text-blue-600"/>
                <label htmlFor={`option-${index}-${i}`} className="ml-2 text-gray-700">{option}</label>
              </div>
            ))
          )}
        </details>
      ))}

    </div>
    <div className={`FreelancerExplore ${showDetails? 'show-details':''} `}>
    <div className="parent-container ">
    <ProjectList projects={projects} onProjectClick={handleProjectClick} selectedProjectId={selectedProject ? selectedProject.id : null} />
    <ProjectModal isOpen={selectedProject !== null} onClose={handleCloseModal} project={selectedProject} />

    </div>
    </div>

  </div>
  
</div>
    </div>
    </div>

    
  );
};

export default FreelancerExplore;
