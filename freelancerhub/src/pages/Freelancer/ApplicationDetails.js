import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-use-history';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase'; // Make sure to import your Firebase config
import { doc, getDoc } from 'firebase/firestore';
import NavigationBarClient from './NavigationBarFreelancer';
import '../../styles/Freelancers/ApplicationDetails.css';
import Loading from '../Loading';
import PdfPreview from '../PdfPreview';

const ApplicationDetails = () => {
    const [proposalDetails, setProposalDetails] = useState(null);
    const history = useHistory();
    const location = useLocation();
    console.log(location)
    const { freelancerID, projectID } = location.state.proposal_key;
    const [loading, setLoading] = useState(true);
    const [proposalID, setProposalID] = useState(null);

    useEffect(() => {
        const fetchProposalDetails = async () => {
            try {
                const proposalID = `${projectID}_${freelancerID}`;
                setProposalID(proposalID);
                const docRef = doc(db, 'proposals', proposalID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProposalDetails(docSnap.data());
                } else {
                    console.log('No such document!');
                }

            } catch (error) {
                console.error('Error fetching proposal details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProposalDetails();
    }, [freelancerID, projectID, proposalDetails]);

    if (loading) {
        return <div><Loading text='Loading...' /></div>;
    }

    return (
        <div>
            <NavigationBarClient />
            <h1 className='applicationDetailsH1'>Application Submitted</h1>
            <div className="proposalDetailsPageContainer">
                <div className="left-side">
                    <form className="proposalFormReceived">
                        <label className="proposalLabel" htmlFor="fullName">Full Name</label>
                        <p className="proposalInputted">{proposalDetails.fullname}</p>

                        <label className="proposalLabel" htmlFor="email">Email</label>
                        <p className="proposalInputted">{proposalDetails.email}</p>

                        <label className="proposalLabel" htmlFor="bids">Bids(RM)</label>
                        <p className="proposalInputted">{proposalDetails.bids}</p>

                        <label className="proposalLabel" htmlFor="notes">Notes</label>
                        <p className="proposalInputted">{proposalDetails.notes}</p>
                    </form>
                </div>
                <div className="right-side">
                    <form className="proposalFormReceived">
                        <label className="proposalLabel">Files Attached</label>

                        {!proposalDetails.cvUrl && !proposalDetails.proposalUrl &&( 
                            <div className="FilesAttachedContainer">
                                <label className="proposalSubLabel" htmlFor="proposal">No File Attached</label>
                            </div>
                            
                        )}

                        {proposalDetails.cvUrl && (
                            <div className="FilesAttachedContainer">
                                <label className="proposalSubLabel" htmlFor="proposal">CV</label>
                                <PdfPreview fileUrl={proposalDetails.cvUrl} fileName={proposalDetails.cvName || 'CV'} />
                            </div>         
                        )}

                        {proposalDetails.proposalUrl && (
                            <div className="FilesAttachedContainer">
                                <label className="proposalSubLabel" htmlFor="proposal">Proposal</label>
                                <PdfPreview fileUrl={proposalDetails.proposalUrl} fileName={proposalDetails.proposalName || 'Proposal'} />
                                </div>
                        )}
                            
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetails;