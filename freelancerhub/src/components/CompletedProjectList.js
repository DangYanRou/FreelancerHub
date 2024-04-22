import './CompletedProjectList.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";

const CompletedProjectList = ({ projects }) => {
    const navigate = useNavigate();
    const [favourites, setFavourites] = useState({});

    const toggleFavourite = (projectId) => {
        setFavourites(prev => ({
            ...prev,
            [projectId]: !prev[projectId]  // Toggle true/false upon click
        }));
    };

    return (
        <div className='jl-centered-container '>
            {projects.map((project) => (
             
                <div className="card" key={project.id}> 
                    <h2>{project.title}</h2>
                    <a href="#" className="hover-profileLink">{project.client}</a>
                    <p id="category">{project.category}</p>
                    <p><FaLocationDot className="icon-style"/>{project.location}</p>
            <p><MdOutlineAttachMoney size={20}className='icon-style2' />{project.budget}/project</p>
                    <p className="apply-status">{project.status}</p>
                    <div className="bottom-row">
                        <p style={{ flexGrow: 1 }}>Completed on:  <span className="complete-date">{project.completeDate}</span></p>
                        <div className="buttonContainer">
                        <button 
                            className="favouriteBtn" 
                            onClick={() => toggleFavourite(project.id)}
                            style={{ backgroundColor: favourites[project.id] ? '#4CAF50' : '#69acc2', color: '#fff' }}>
                            {favourites[project.id] ? (
                                <span className="icon-text"><AiOutlineCheckCircle /> Favourite Collaborator</span>
                            ) : '+ Favourite Collaborator'}
                        </button>

                            <button className="feedbackBtn" onClick={() => navigate('../freelancer-feedback-page')}>Submit feedback</button>
                        </div>
                    </div>
                </div>
                
            ))}
        </div>
    );
}

export default CompletedProjectList;
