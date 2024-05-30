import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-use-history';
import { useLocation } from 'react-router-dom';
import { db } from '../../../firebase';
import { doc, getDoc,collection,addDoc,updateDoc } from 'firebase/firestore';
import '../../../styles/ApplicationDetails.css';
import Loading from '../../../components/Loading';
import PdfPreview from '../../../components/PdfPreview';
import Heading from '../../../components/Heading';
import {Button,ButtonGroup } from 'flowbite-react';
import NavigationBarFreelancer from '../../../nav/NavigationBarFreelancer';
import ConfirmationDialog from '../../../components/ConfirmationDialog';

const ApplicationDetails = () => {
    const [proposalDetails, setProposalDetails] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const { freelancerID, projectID } = location.state.proposal_key;
    const [loading, setLoading] = useState(true);
    const [proposalID, setProposalID] = useState(null);
    const [currency, setCurrency] =useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    useEffect(() => {
        const fetchProposalDetails = async () => {
            try {
                const proposalID = `${projectID}_${freelancerID}`;
                setProposalID(proposalID);
                const docRef = doc(db, 'proposals', proposalID);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProposalDetails(docSnap.data());

                    const projectRef = doc(db, 'projects', proposalDetails.projectID);
                    const projectSnap = await getDoc(projectRef);

                    if (projectSnap.exists()) {
                        const projectData = projectSnap.data();
                        setCurrency(projectData.currencyInput);

                    }else {
                        console.log('No such project document!');
                    }
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

    const handleAcceptAssignment = (event) => {
        setConfirmationOpen(true);
    };

    const handleConfirmAssignment = async () => {
        try {
            // Notify freelancer
            const notificationToFreelancerData = {
                isRead: false,
                isPop: false,
                timestamp: new Date(),
                type: 4.1,
                priority: 1,
                projectID: proposalDetails.projectID,
                clientID: proposalDetails.clientID,
                to: proposalDetails.freelancerID
            };
            await addDoc(collection(db, 'notifications'), notificationToFreelancerData);
    
            // Notify client
            const notificationToClientData = {
                isRead: false,
                isPop: false,
                timestamp: new Date(),
                type: 4.2,
                priority: 1,
                projectID: proposalDetails.projectID,
                freelancerID: proposalDetails.freelancerID,
                to: proposalDetails.clientID
            };
            await addDoc(collection(db, 'notifications'), notificationToClientData);

            //update project
            const projectRef = doc(db, 'projects',proposalDetails.projectID);
            await updateDoc(projectRef, { statusState: 3, freelancerID:proposalDetails.freelancerID });

            //update proposal
            const proposal_key = `${proposalDetails.projectID}_${proposalDetails.freelancerID}`
            const proposalRef = doc(db, 'proposals',proposal_key);
            await updateDoc(proposalRef, { statusState: 3 });

        } catch (error) {
          console.error("Error updating priority: ", error);
        } finally {
          setConfirmationOpen(false);
        }
      };
    
      const handleCancelAssignment = () => {
        setConfirmationOpen(false);
      };

    



    return (
        <div className="applicationDetailsPageContainer">
            {proposalDetails ? (
                <div>
                    <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
                        Application
                    </Heading>

                    <ConfirmationDialog
                        open={confirmationOpen}
                        onClose={handleCancelAssignment}
                        onConfirm={handleConfirmAssignment}
                        message="Are you sure you want to accept this assignment?"
                    />

                    <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
                    <div className="applicationDetailsContainer">
                        <div className="application-left-side" >
                            <form className="appicationFormReceived" style={{marginTop:"0px"}}>
                                <label className="applicationLabel" >Full Name</label>
                                <p className="applicationInputted">{proposalDetails.fullname}</p>

                                <label className="applicationLabel" htmlFor="email">Email</label>
                                <p className="applicationInputted">{proposalDetails.email}</p>

                                <label className="applicationLabel" htmlFor="bids">Bids({currency})</label>
                                <p className="applicationInputted">{proposalDetails.bids}</p>

                                <label className="applicationLabel" htmlFor="notes">Notes</label>
                                <p className="applicationInputted">{proposalDetails.notes || "-"}</p>

                                {proposalDetails.statusState == 2.5 && (
                                    <ButtonGroup className='application-profile-button-group' onClick={(event)=>handleAcceptAssignment()}>
                                        <Button className='application-accept-button'>Accept Assignment</Button>
                                    </ButtonGroup>
                                )}
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