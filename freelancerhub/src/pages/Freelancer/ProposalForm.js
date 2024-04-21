import React from "react";
import fileUploadImage from "../../Gallery/fileupload.png"; 
import '../../styles/Freelancers/ProposalForm.css';
import { useHistory } from 'react-router-use-history'
import NavigationBar from "./NavigationBarFreelancer";

export const ProposalForm = () =>{
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to submit?");
        if (isConfirmed) {
            history.push('projects-applied');
        } else {
            console.log("Submission cancelled!");
        }
    };

    return (
        <div className="proposal-form">

        <div>
            <NavigationBar />
            <h1>Proposal Submission</h1>
            <form onSubmit={handleSubmit} className="proposalForm">
                {/* Use a shared class for labels and inputs */}
                <label className="proposalLabel" htmlFor="fullName">*Full Name</label>
                <input className="proposalInput" type="text" id="fullName" name="fullname"/>

                <label className="proposalLabel" htmlFor="email">*Email</label>
                <input className="proposalInput" type="email" id="email" name="email"/>

                <label className="proposalLabel" htmlFor="bids">*Bids(RM)</label>
                <input className="proposalInput" type="number" id="bids" name="bids"/>

                <label className="proposalLabel file-upload-label">
                    <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" />
                    Upload Your CV Here
                </label>
                <input className="file-upload-input" type="file" id="cv" name="cv" />

                <label className="proposalLabel file-upload-label">
                    <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" />
                    Upload Your Proposal Here
                </label>
                <input className="file-upload-input" type="file" id="proposal" name="proposal" />

                <label className="proposalLabel" htmlFor="notes">Notes</label>
                <textarea className="longtextinput" id="notes" name="notes"></textarea>
                
                <button type="submit" className="proposalSubmitButton">Submit</button>
            </form>
        </div>
    );
};

export default ProposalForm;