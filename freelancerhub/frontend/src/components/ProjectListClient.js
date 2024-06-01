import './styles/ProjectListClient.css';
import React, { useState } from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useHistory } from 'react-router-use-history';
import { GrFormClose } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import visaMaster from "../Gallery/visaMaster.png"; 
import banks from "../Gallery/banks.jpg"; 
import ConfirmationDialog from '../components/ConfirmationDialog';

const ProjectListClient = ({ projects, onProjectClick, selectedProjectId, onMarkAsDone,onDeleteProject  }) => {
    const history = useHistory();
    const [showDropdown, setShowDropdown] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const[showConfirmDeleteModal,setShowConfirmDeleteModal]=useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


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

    const closeModal = () => {
        setShowModal(false);
        setPaymentProcessing(false);
    };

    const handlePayment = (paymentMethod) => {
        setSelectedPaymentMethod(paymentMethod);
    };

    const handlePayButton = () => {
        if (selectedPaymentMethod) {
            setPaymentProcessing(true);
            setTimeout(() => {
                setPaymentSuccess(true);
                onMarkAsDone(selectedProject);
                setTimeout(() => {
                    closeModal();
                    history.push('/clients/project-completed');
                }, 2000);
            }, 2000);
        } else if (selectedPaymentMethod==null){ {/* */}
            alert("Please select a payment method first.");
        }
    };

    const openConfirmDeleteModal=(project)=>{
        setSelectedProject(project);
        setShowConfirmDeleteModal(true)
    }

    const closeConfirmDeleteModal = () => {
        setShowConfirmDeleteModal(false);
    };

    const handleConfirmDelete=()=>{
        if(selectedProject){
            onDeleteProject(selectedProject);
            setShowConfirmDeleteModal(false);
            setShowSuccessModal(true);
            setTimeout(()=>setShowSuccessModal(false),2000)
        }
    }

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
                                        <li onClick={(e) => { e.stopPropagation(); openConfirmDeleteModal(project); }}>Delete Project</li>

                                        <li><Link to={{ pathname: "/clients/proposal-received"}} state={{ projectID: project.id }} >
                                            View Applications</Link></li>
                                        <li onClick={(e) => { e.stopPropagation(); openModal(project); }}>Mark As Done</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <h2 className="project-title">{project.title}</h2>
                        <a href="#" className="hover-profileLink">{project.client}</a>
                        <p id="category">{project.category}</p>
                        <p><FaLocationDot className="icon-style" />{project.location}</p>
                        <p><MdOutlineAttachMoney size={20} className='icon-style2'/>{project.minInput}-{project.maxInput} {project.currencyInput}/project</p>
                        <p><BiTimeFive size={20} className='icon-style2' />{project.duration} {project.durationUnit}</p>
                    </div>
                </div>
            ))}

            {showModal && (
                <div className='payment-overlay'>
                    <div className='payment-content'>
                        <button className="close-btn" onClick={closeModal}><GrFormClose /></button>
                        {paymentProcessing ? (
                            <div className="processing-container">
                                <div className="spinner"></div>
                                <h2 className="processing-text">Payment is being processed...</h2>
                            </div>
                        ) : (
                            <>
                                <h2 className="modal-title">Payment is required before marking the project as completed.</h2>
                                <h2 className="select">Select Payment Method</h2>
                                <div className="button-container">
                                    <button className={`payment-button ${selectedPaymentMethod === 'creditCard' ? 'selected' : ''}`} onClick={() => handlePayment('creditCard')}>
                                        <span>Credit Card/Debit Card</span>
                                        <img src={visaMaster} alt="Credit Card" className="card-image"/>
                                    </button>
                                    <button className={`payment-button ${selectedPaymentMethod === 'onlineBanking' ? 'selected' : ''}`} onClick={() => handlePayment('onlineBanking')}>
                                        <span>Online Banking</span>
                                        <img src={banks} alt="Online Banking" />
                                    </button>
                                    <button className="pay-button" onClick={handlePayButton}>Pay</button>
                                </div>
                            </>
                        )}
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

            {showConfirmDeleteModal && (
               
                        <ConfirmationDialog
                        open={showConfirmDeleteModal}
                        onClose={closeConfirmDeleteModal}
                        onConfirm={handleConfirmDelete} 
                        message="Are you sure you want to delete this project?"
                    />

                        
              
            )}

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

export default ProjectListClient;
