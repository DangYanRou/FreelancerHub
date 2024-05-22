import './ProjectListClient.css'
import React from 'react';
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { useHistory } from 'react-router-use-history';



const ProjectListClient=({projects,onProjectClick,selectedProjectId}) => {

    const history = useHistory();

    const[showDropdown,setShowDropdown]=useState([]);
    
    const toggleDropDown =(index) =>{
        const newDropdownState =[...showDropdown];
        newDropdownState[index]=!newDropdownState[index];
        setShowDropdown(newDropdownState);
    };

   
        const [showModal,setShowModal]=useState(false);
        const[paymentSuccess,SetPaymentSuccess]=useState(false);
        
        const openModal =()=> setShowModal(true);
        const closeModal =()=> setShowModal(false);
        
        const handlePayment= (paymentMethod) => {
          setTimeout(() => {

            SetPaymentSuccess(true);
            setTimeout(() => {
                closeModal();
                history.push('/clients/project-completed');
            }, 2000);
        }, 2000);
           
        }
        

    return(
      <div className="main-container">
          {projects.map((blog,index)=>(
            <div className="card-container">
            <div className={`card ${selectedProjectId === blog.id ? 'selected' : ''}`} key={blog.id} onClick={()=>onProjectClick(blog)}>
                
                <div className='optionBtn-container'>
              <div className="option-button" onClick={() => toggleDropDown(index)}>
              <SlOptionsVertical />
              </div>
              {showDropdown[index] && (<div className="pa-options-dropdown">
                <ul className="pa-options">
                  <li><Link to ="/clients/post-project">Edit Project</Link></li>
                  <li>Delete Project</li>
                  <li><Link to ="/clients/proposal-received">View Applications</Link></li>
                  <li onClick={openModal}>Mark As Done</li>
                </ul>  
              </div>
            )}
              </div>
            
            <h2 className="project-title">{blog.title}</h2>
           <a href="#" className="hover-profileLink">{blog.client}</a>
            <p id="category">{blog.category}</p>
            <p><FaLocationDot className="icon-style"/>{blog.location}</p>
            <p><MdOutlineAttachMoney size={20}className='icon-style2' />{blog.budget}/project</p>
  
             <p className="posted-status">{blog.status}</p>
             <p className="posted-date">{blog.applyDate}</p>
            </div>
            </div>
            
          ))}

          {
            showModal&& (<div className='payment-overlay'>
                <div className='payment-content'>
                  <h2 className="modal-title">Payment is required before marking the project as completed.</h2>
                <h2 className="select">Select Payment Method</h2>
                <div className="radioBtn-container">
                    <label>
                        <input
                        type="radio"
                        name="paymentMethod"
                        value="creditCard"
                        onChange={()=> handlePayment('creditCard')}/>Credit Card
                    </label>
                    <label>
                        <input
                        type='radio'
                        name='paymentMethod'
                        value='onlineBanking'
                        onChange={()=> handlePayment('onlineBanking')}/>Online Banking
                    </label>
                </div>
            </div>
            </div>
          )}

          {paymentSuccess && (
            <div className='paymentSuccess-overlay'>
            <div className='paymentSuccess-content'>
                <h2 className="centre">Payment Successful</h2>
                <p >Your project is now completed.</p>
                    </div>
            </div>
          )}
        </div>
    );
};
  export default ProjectListClient;