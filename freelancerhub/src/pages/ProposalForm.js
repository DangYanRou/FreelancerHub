import React from "react";
import fileUploadImage from "../Gallery/fileupload.png"; 
import '../styles/ProposalForm.css';


export const ProposalForm = () =>{

    return (
        <div>
            <form>
                <label htmlFor="fullName">*Full Name</label>
                <input type="text" id="fullName" name="fullname"/>

                <label htmlFor="email">*Email</label>
                <input type="email" id="email" name="email"/>

                <label htmlFor="bids">*Bids(RM)</label>
                <input type="number" id="bids" name="bids"/>

                <label htmlFor="cv" className="file-upload-label">
                <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" />
                    Upload Your CV Here</label>
                <input type="file" id="cv" name="cv" className="file-upload-input" />

                <label htmlFor="proposal" className="file-upload-label">
                <img src={fileUploadImage} alt="file uploading icon" className="file-upload-icon" />
                    Upload Your Proposal Here</label>
                <input type="file" id="proposal" name="proposal" className="file-upload-input" />

                <label htmlFor="notes">Notes</label>
                <textarea id="notes" name="notes" className="longtextinput"></textarea>
                
                <button>Submit</button>
            </form>
        </div>
    )
}