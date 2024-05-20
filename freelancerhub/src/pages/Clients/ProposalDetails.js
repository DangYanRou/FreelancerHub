import React from 'react';
import NavigationBarClient from './NavigationBarClient';
import '../../styles/Clients/ProposalDetails.css';
import { useState } from 'react';
import PdfPreview from '../PdfPreview'; // Import the PdfPreview component
import ClientProfile from './ClientProfile';
import { useHistory } from 'react-router-use-history';

const ProposalDetails = () => {
    const [proposalsDetails, setProposalDetails] = useState ([
        { 
          Name: "My Name", 
          email: 'myemail@email.com', 
          tel: '0123456789',
          bids: 2500, 
          notes: "NothingNothingNothingNothingNothingNothingNothingNothingNothingNothingNothingNothing",
          cv: require("../../Gallery/Minimalist White and Grey Professional Resume.pdf"),
          proposal: require("../../Gallery/WIF2003 Project Proposal - Team 11.pdf")
        }
    ]);

    const history = useHistory();

    const handleProfileClick = () => {
        history.push('/clients/freelancer-temporary-profile');
    };

    const handleAccept = () => {
        if (window.confirm('Are you sure you want to accept this proposal?')) {
            history.push('/clients/proposal-received');
        }
    };

    const handleReject = () => {
        if (window.confirm('Are you sure you want to reject this proposal?')) {
            history.push('/clients/proposal-received');
            // remove proposal from the list, will do later
        }
    };

    return (
        <div>
            <NavigationBarClient />
            <div className="proposalDetailsPageContainer">
                <div className="left-side">
                    {proposalsDetails.map((proposalDetail, index) => (
                        <form className="proposalFormReceived" key={index}>
                            <label className="proposalLabel" htmlFor="fullName">Full Name</label>
                            <text className="proposalInputted">{proposalDetail.Name}</text>

                            <label className="proposalLabel" htmlFor="email">Email</label>
                            <text className="proposalInputted">{proposalDetail.email}</text>

                            <label className="proposalLabel" htmlFor="bids">Bids(RM)</label>
                            <p className="proposalInputted">{proposalDetail.bids}</p>

                            <label className="proposalLabel" htmlFor="notes">Notes</label>
                            <text className="proposalInputted">{proposalDetail.notes}</text>

                            <button onClick={handleProfileClick} className="proposalButton">Check Profile</button>
                            <button onClick={handleAccept} className="proposalButton">Accept</button>
                            <button onClick={handleReject} className="proposalRejectButton">Reject</button>


                        </form>
                    ))}
                </div>
                <div className="right-side">
                    {proposalsDetails.map((proposalDetail, index) => (
                        <form className="proposalFormReceived" key={index}>
                            <label className="proposalLabel" htmlFor="bids">Files Attached</label>
                            {proposalDetail.cv !== "" || proposalDetail.proposal !== "" ? (
                                <div>
                                    {proposalDetail.cv !== "" && (
                                        <>
                                            <div className="FilesAttachedContainer">
                                                <label className="proposalSubLabel" htmlFor="proposal">CV</label>
                                                <a className="linkToFileSubmitted" href={proposalDetail.cv} target="_blank" rel="noopener noreferrer">
                                                    <PdfPreview fileUrl={proposalDetail.cv} fileName="Minimalist Professional Resume.pdf" />
                                                </a>
                                            </div>
                                        </>
                                    )}
                                    {proposalDetail.proposal !== "" && (
                                        <>
                                            <div className="FilesAttachedContainer">
                                                <label className="proposalSubLabel" htmlFor="proposal">Proposal</label>
                                                <a className="linkToFileSubmitted" href={proposalDetail.proposal} target="_blank" rel="noopener noreferrer">
                                                    <PdfPreview fileUrl={proposalDetail.proposal} fileName="WIF2003 Project Proposal - Team 11.pdf" />
                                                </a>
                                            </div>
                                        </>
                                    )}
                            </div>
                        ) : (
                            <div className="FilesAttachedContainer">No files attached</div>
                        )}
                        </form>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProposalDetails;