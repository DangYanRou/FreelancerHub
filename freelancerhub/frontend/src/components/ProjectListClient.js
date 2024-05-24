import './ProjectListClient.css'
import React, { useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useHistory } from 'react-router-use-history';
import { BiTimeFive } from "react-icons/bi";

const ProjectListClient = ({ projects, onProjectClick, selectedProjectId, onMarkAsDone }) => {
    const history = useHistory();
    const [showDropdown, setShowDropdown] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const toggleDropDown = (index, e) => {
        e.stopPropagation();
        const newDropdownState = [...showDropdown];
        newDropdownState[index] = !newDropdownState[index];
        setShowDropdown(newDropdownState);
    };

    const openModal = (project) => {
        setSelectedProject(project);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handlePayment = (paymentMethod) => {
        setTimeout(() => {
            setPaymentSuccess(true);
            onMarkAsDone(selectedProject); 
            setTimeout(() => {
                closeModal();
                history.push('/clients/project-completed');
            }, 2000);
        }, 2000);
    };

    return (
        <div className="main-container">
            {projects.map((project, index) => (
                <div className="card-container" key={project.id}>
                    <div className={`card ${selectedProjectId === project.id ? 'selected' : ''}`} onClick={() => onProjectClick(project)}>
                        <div className='optionBtn-container'>
                            <div className="option-button" onClick={(e) => toggleDropDown(index, e)}>
                                <SlOptionsVertical />
                            </div>
                            {showDropdown[index] && (
                                <div className="pa-options-dropdown">
                                    <ul className="pa-options">
                                        <li><Link to="/clients/edit-project">Edit Project</Link></li>
                                        <li>Delete Project</li>
                                        <li><Link to="/clients/proposal-received">View Applications</Link></li>
                                        <li onClick={(e) => { e.stopPropagation(); openModal(project); }}>Mark As Done</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <h2 className="project-title">{project.title}</h2>
                        <a href="#" className="hover-profileLink">{project.client}</a>
                        <p id="category">{project.category}</p>
                        <p><FaLocationDot className="icon-style" />{project.location}</p>
                        <p><MdOutlineAttachMoney size={20} className='icon-style2' />{project.budget ? `${project.budget[0]}-${project.budget[1]} ${project.budget[2]}` : ''}/project</p>
                        <p><BiTimeFive size={20} className='icon-style2' />{project.duration ? `${project.duration[0]} ${project.duration[1]}` : ''}</p>
                    </div>
                </div>
            ))}

            {showModal && (
                <div className='payment-overlay'>
                    <div className='payment-content'>
                        <h2 className="modal-title">Payment is required before marking the project as completed.</h2>
                        <h2 className="select">Select Payment Method</h2>
                        <div className="radioBtn-container">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="creditCard"
                                    onChange={() => handlePayment('creditCard')}
                                />
                                Credit Card
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value='onlineBanking'
                                    onChange={() => handlePayment('onlineBanking')}
                                />
                                Online Banking
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {paymentSuccess && (
                <div className='paymentSuccess-overlay'>
                    <div className='paymentSuccess-content'>
                        <h2 className="centre">Payment Successful</h2>
                        <p>Your project is now completed.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectListClient;