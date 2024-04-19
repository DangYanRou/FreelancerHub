import React from "react";
import fileUploadImage from "../../Gallery/fileupload.png"; 
import '../../styles/Freelancers/ProposalForm.css';
import { useHistory } from 'react-router-use-history'
import NavigationBar from "./NavigationBarFreelancer";


export const ProposalForm = () =>{
    const history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault();
        const isConfirmed = window.confirm("Are you sure you want to submit?");
        if (isConfirmed) {
            history.push('projects-applied')
        } else {
            console.log("Submission cancelled!");
        }
    }

    return (
        <div>
            <NavigationBar></NavigationBar>
            <h1>Proposal Submission</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">*Full Name</label>
                <input type="text" id="fullName" name="fullname"/>

                <label htmlFor="email">*Email</label>
                <input type="email" id="email" name="email"/>

                <label htmlFor="bids">*Bids(RM)</label>
                <input type="number" id="bids" name="bids"/>

                <label htmlFor="cv" className="file-upload-label">
                    <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" />
                    Upload Your CV Here
                </label>
                <input type="file" id="cv" name="cv" className="file-upload-input" />

                <label htmlFor="proposal" className="file-upload-label">
                    <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" />
                    Upload Your Proposal Here
                </label>
                <input type="file" id="proposal" name="proposal" className="file-upload-input" />

                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" className="longtextinput"></textarea>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ProposalForm;