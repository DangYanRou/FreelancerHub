import React from "react";

export const ProposalForm = () =>{
    return (
        <div>
            <form>
                <label htmlFor="Full Name">Full Name</label>
                <input type="text" id="fullName" name="fullname"/>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"/>

                <label htmlFor="cv" className="file-upload-label">
                    Upload Your CV Here</label>
                <input type="file" id="cv" name="cv" className="file-upload-input" />

                <label htmlFor="proposal" className="file-upload-label">Upload Your Proposal Here</label>
                <input type="file" id="proposal" name="proposal" className="file-upload-input" />

                <label htmlFor="bids">Bids(RM)</label>
                <input type="number" id="bids" name="bids"/>

                <button>Submit</button>
            </form>
        </div>
    )
}