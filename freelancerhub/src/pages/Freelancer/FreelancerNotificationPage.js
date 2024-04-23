import React from 'react';
import '../../styles/Freelancers/FreelancerNotificationPage.css';
import NavigationBar from './NavigationBarFreelancer';
import { Link } from 'react-router-dom';
import { GrFormClose } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { useState } from 'react';
import { useHistory } from 'react-router-use-history';
import Heading from '../../components/Heading';


const notifications1 = [
    { id: 1, text: "You have received a project invitation", time: "2 hours ago", priority: "important"}
  ];

  const notifications2 = [
    { id: 2, text: "Your application was submitted successfully", time: "3 hours ago", priority: "normal" },
  ];

const notifications3 = [
    { id: 3, text: "You have updated your saved projects succeessfully", time: "1 day ago", priority: "seen" },
    { id: 4, text: "You have updated your saved collaborator succeessfully", time: "1 day ago", priority: "seen" },
  ];

  const notifications4 = [
    { id: 5, text: "You have updated your saved projects succeessfully", time: "3 days ago", priority: "seen" },
    { id: 6, text: "You have updated your saved collaborator succeessfully", time: "4 days ago", priority: "seen" }
  ];
  




  
  const NotificationPage = () => {

    const project=[
      {
        title: 'Online Shopping Website Design',
      client: 'Hana Florist',
      category: 'Information & Communication Technology',
      budget: 'RM 1500-RM 2000',
      location: 'Petaling Jaya, Selangor'
      ,id: 1,
      description: `We are a flourishing florist business seeking a skilled freelancer to help us design our online shopping website. As the owner of a thriving florist, we recognize the importance of establishing a strong online presence to cater to our customers' evolving needs. We aim to create a seamless and aesthetically pleasing online shopping platform that reflects the beauty and elegance of our floral arrangements.`,
      items: [
        'User-Friendly Design',
        'Aesthetic Appeal',
        'Mobile Responsiveness',
        'Integration of E-Commerce Features'
      ],preferQuali:'Diploma/Degree in Computer Science',date:"27/4/2024",duration:"1 month"
      }
    ];

 
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const history = useHistory();
    const handleApply = () => {
      history.push('/freelancers/proposal-form');
      };

      const handleNotificationClick =(projectId)=>{
        setSelectedProjectId(projectId);
      }

  
    const ProjectModal = ({ isOpen, onClose, projectId }) => {
      if (!isOpen||!project) return null;

      const selectedProject = project.find(proj => proj.id === projectId);
    
      return (
          <div className="modal-overlay" onClick={onClose}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2 id className='view-application-header'>View Project</h2>
                <button className="close-btn" onClick={onClose}><GrFormClose /></button>
                </div>
                 <ProjectDetails project={selectedProject}/>{/* Pass project to ProjectDetails */}
                  
              </div>
          </div>
      );
    }
   
    const ProjectDetails =({project}) => {
      if(!project) return null;
      return(
        <div className="project-details">
          <h2 id="detail-title">{project.title}</h2>
          <a href="#" className="hover-profileLink">{project.client}</a>
              <p id="category">{project.category}</p>
              <p><FaLocationDot className="icon-style"/>{project.location}</p>
              <p><MdOutlineAttachMoney size={20}className='icon-style2' />{project.budget}/project</p>
              <p><BiTimeFive size={20}className='icon-style2' />{project.duration}</p> 
              <p>Starting from: {project.date}</p>
             
              <h3 id="about-the-project">About the Project:</h3>
              <p>{project.description}</p>
              <div>
                <h3 id="key-requirement">Job Responsibilities:</h3>
                <ul className="list">
                  {project.items.map((item,index)=>(
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <h3 id="preferredQualification">Preferred Qualification:</h3>
              <p>{project.preferQuali}</p>
  
              <button id="applyButton" onClick={handleApply} className="btn btn-primary">Apply</button>
    
    
        </div>
      );
    };

    return (
      <div className="notification-page">
        <NavigationBar></NavigationBar>
        <div className="notification-container">
        <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
            Notifications
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
          <h2 className="notification-timebond">New</h2>
          <div className="notification-list">
            {notifications1.map(notification => (
                <div className={`notification-box ${notification.priority}`} onClick={()=> handleNotificationClick(notification.id)} key={notification.id}>
                    <span className="notification-text" >{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                    <ProjectModal isOpen={selectedProjectId !== null} onClose={()=> setSelectedProjectId(null)} projectId={selectedProjectId} />
                </div>

            ))}
          </div>
          <Link Link to="/freelancers/projects-applied" className='notificationLink'>
          <div className="notification-list">
            {notifications2.map(notification => (
                <div className={`notification-box ${notification.priority}`} key={notification.id}>
                    <span className="notification-text">{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                </div>
            ))}
          </div>
          </Link>
          <h2 className="notification-timebond">Yesterday</h2>
          <Link Link to="/freelancers/saved" className='notificationLink'>
          <div className="notification-list">
            {notifications3.map(notification => (
                <div className={`notification-box ${notification.priority}`} key={notification.id}>
                    <span className="notification-text">{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                </div>
            ))}
          </div>
          </Link>
          <h2 className="notification-timebond">Earlier</h2>
          <Link Link to="/freelancers/saved" className='notificationLink'>
          <div className="notification-list">
            {notifications4.map(notification => (
                <div className={`notification-box ${notification.priority}`} key={notification.id}>
                    <span className="notification-text">{notification.text}</span>
                    <span className="notification-time">{notification.time}</span>
                </div>
            ))}
          </div>
          </Link>
        </div>
      </div>
    );
  }
  
  export default NotificationPage;