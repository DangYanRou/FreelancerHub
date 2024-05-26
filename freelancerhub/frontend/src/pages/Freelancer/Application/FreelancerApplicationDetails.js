import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-use-history';
import { useLocation } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import '../../../styles/ApplicationDetails.css';
import Loading from '../../../components/Loading';
import PdfPreview from '../../../components/PdfPreview';
import Heading from '../../../components/Heading';
const ApplicationDetails = () => {
    const [proposalDetails, setProposalDetails] = useState(null);
    const history = useHistory();
    const location = useLocation();
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
        <div className="applicationDetailsPageContainer">
            {proposalDetails ? (
                <div>
                    <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
                        Application
                    </Heading>
                    <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
                    <div className="applicationDetailsContainer">
                        <div className="application-left-side" >
                            <form className="appicationFormReceived" style={{marginTop:"0px"}}>
                                <label className="applicationLabel" >Full Name</label>
                                <p className="applicationInputted">{proposalDetails.fullname}</p>

                                <label className="applicationLabel" htmlFor="email">Email</label>
                                <p className="applicationInputted">{proposalDetails.email}</p>

                                <label className="applicationLabel" htmlFor="bids">Bids(RM)</label>
                                <p className="applicationInputted">{proposalDetails.bids}</p>

                                <label className="applicationLabel" htmlFor="notes">Notes</label>
                                <p className="applicationInputted">{proposalDetails.notes || "-"}</p>
                            </form>
                        </div>
                        <div className="application-middle-side">
                            {proposalDetails.cvUrl ? (
                                <>
                                <div className="FilesAttachedContainer">
                                <label className="applicationSubLabel">CV Attached</label>
                                    <PdfPreview fileUrl={proposalDetails.cvUrl} fileName={proposalDetails.cvName || 'CV'} />
                                </div>
                                </>
                            ):(
                                <>
                                <div className="FilesAttachedContainer">
                                <label className="applicationSubLabel">No CV Attached</label>
                                </div>
                                </>
                            )}

                        </div>
                        <div className="application-right-side">
                            {proposalDetails.proposalUrl ? (
                                <>
                                <div className="FilesAttachedContainer">
                                    <label className="applicationSubLabel">Proposal Attached</label>
                                    <PdfPreview fileUrl={proposalDetails.proposalUrl} fileName={proposalDetails.proposalName || 'Proposal'} />
                                </div>
                                </>
                            ):(
                                <>
                                <div className="FilesAttachedContainer">
                                    <label className="applicationSubLabel">No Proposal Attached</label>
                                </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p>No proposal details found.</p>
            )}
        </div>
    );
};

export default ApplicationDetails;