import React, { useState, useEffect } from 'react';
import '../../../styles/ApplicationDetails.css';
import PdfPreview from '../../../components/PdfPreview';
import { useHistory } from 'react-router-use-history';
import { useLocation } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { db } from '../../../firebase';
import { collection, doc, getDoc, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import Heading from '../../../components/Heading';
import { ButtonGroup, Button } from 'flowbite-react';
import { useUser } from '../../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';

const ClientApplicationDetails = () => {
    const location = useLocation();
    console.log(location.state);
    const history = useHistory();
    const [loading, setLoading] = useState("Loading...");
    const { freelancerID, projectID } = location.state.proposal_key;
    const [proposalDetails, setProposalDetails] = useState(null);
    const { user } = useUser();
    const [projectName, setProjectName] = useState('');
    const [clientName, setClientName] = useState('');

    useEffect(() => {
        const fetchProposalDetails = async () => {
            try {
                const proposalID = `${projectID}_${freelancerID}`;
                const docRef = doc(db, 'proposals', proposalID);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const proposalData = docSnap.data();
                    setProposalDetails(proposalData);

                    const projectRef = doc(db, 'projects', proposalData.projectID);
                    const projectSnap = await getDoc(projectRef);
                    if (projectSnap.exists()) {
                        const projectData = projectSnap.data();
                        setProjectName(projectData.title);

                        console.log(user.id);
                        const clientRef = doc(db, 'clients', user.id);
                        const clientSnap = await getDoc(clientRef);
                        if (clientSnap.exists()) {
                            const clientData = clientSnap.data();
                            setClientName(clientData.username);
                        } else {
                            console.log('No such client document!');
                        }
                    } else {
                        console.log('No such project document!');
                    }
                } else {
                    console.log('No such proposal document!');
                }
            } catch (error) {
                console.error('Error fetching proposal details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProposalDetails();
    }, [freelancerID, projectID, user.id]);

    if (loading) {
        return <div><Loading text={loading} /></div>;
    }

    const handleProfileClick = (freelancerID) => {
        history.push('freelancer-temporary-profile', { freelancer: { freelancerID } });
    };

    const handleEmailClick = (emailAddress, projectName, clientName) => {
        const subject = `Regarding your application for ${projectName}`;
        const body = `Hello,\n\nI am writing to discuss the project application you submitted for ${projectName}. Please let me know when you are available to talk.\n\nBest regards, ${clientName}`;

        const mailToLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailToLink;
    };

    const handleAcceptClick = async () => {
        const isConfirmed = window.confirm("Are you sure you want to accept this application?");
        if (!isConfirmed) return;
    
        try {
            setLoading("Accepting..."); 
    
            // Update project status
            if (proposalDetails.projectID) {
                const projectRef = doc(db, "projects", proposalDetails.projectID);
                try {
                    await updateDoc(projectRef, {
                        statusState: 3,
                        freelancerID: proposalDetails.freelancerID
                    });
                    console.log("Project status updated successfully");
                } catch (error) {
                    console.error("Error updating project status: ", error);
                }
            }

            const proposalID = `${projectID}_${freelancerID}`;
            console.log("proposalID",proposalID);
            // Update Proposals
            const proposalRef = doc(db, "proposals", proposalID);
            try {
                await updateDoc(proposalRef, {
                    statusState: 3,
                });
                console.log("Proposal status updated successfully");
            } catch (error) {
                console.error("Error updating proposal status: ", error);
            }
    
            // Notify freelancer
            const notificationToFreelancerData = {
                isRead: false,
                isPop: false,
                timestamp: new Date(),
                type: 4,
                priority: 2,
                projectID: proposalDetails.projectID,
                clientID: user.id,
                to: proposalDetails.freelancerID
            };
            await addDoc(collection(db, 'notifications'), notificationToFreelancerData);
    
            // Notify client
            const notificationToClientData = {
                isRead: false,
                isPop: false,
                timestamp: new Date(),
                type: 3,
                priority: 2,
                projectID: proposalDetails.projectID,
                freelancerID: proposalDetails.freelancerID,
                to: user.id
            };
            await addDoc(collection(db, 'notifications'), notificationToClientData);
    
            setTimeout(() => {
                history.push('project-posted');
                setLoading(false); // Set loading to false after navigation
            }, 2000);
        } catch (error) {
            toast.error('Error accepting application! Please try again.');
            setLoading(false); // Set loading to false if there is an error
        }
    };

    const handleRejectClick = async () => {
        const isConfirmed = window.confirm("Are you sure you want to reject this application?");
        if (!isConfirmed) return;
    
        try {
            setLoading("Rejecting...");
            //delete application
            try {
                const proposalID = `${projectID}_${freelancerID}`;
                const proposalRef = doc(db, 'proposals', proposalID);
                await deleteDoc(proposalRef);
            } catch (error) {
                console.log("Error in deleting application!")
            }
    
            //delete cv
            if (proposalDetails.cvUrl) {
                const storage = getStorage();
                const fileRef = ref(storage, proposalDetails.cvUrl);
    
                try {
                    await deleteObject(fileRef);
                    console.log('cv deleted successfully');
                } catch (error) {
                    console.error('Error deleting cv:', error);
                }
            }
    
            //delete proposal
            if (proposalDetails.proposalUrl) {
                const storage = getStorage();
                const fileRef = ref(storage, proposalDetails.proposalUrl);
    
                try {
                    await deleteObject(fileRef);
                    console.log('proposal deleted successfully');
                } catch (error) {
                    console.error('Error deleting proposal:', error);
                }
            }
    
            //notify freelancer
            const notificationToFreelancerData = {
                isRead: false,
                isPop: false,
                timestamp: new Date(),
                type: 3.5,
                priority: 2,
                projectID: proposalDetails.projectID,
                clientID: user.id,
                to: proposalDetails.freelancerID
            };
            await addDoc(collection(db, 'notifications'), notificationToFreelancerData);
    
            //notify client
            const notificationToClientData = {
                isRead: false,
                isPop: false,
                timestamp: new Date(),
                type: 4.5,
                priority: 2,
                projectID: proposalDetails.projectID,
                freelancerID: proposalDetails.freelancerID,
                to: user.id
            };
            await addDoc(collection(db, 'notifications'), notificationToClientData);
    
            setLoading(false); // Set loading to false before navigating
            history.push('project-posted');
        } catch (error) {
            toast.error('Error rejecting application! Please try again.');
            setLoading(false); // Set loading to false if there is an error
        }
    };
    

    return (
        <div className="applicationDetailsPageContainer">
            <ToastContainer></ToastContainer>
            {proposalDetails ? (
                <div>
                    <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
                        Application
                    </Heading>
                    <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
                    <div className="applicationDetailsContainer">
                        <div className="application-left-side">
                            <form className="appicationFormReceived" style={{ marginTop: "0px" }}>
                                <label className="applicationLabel">Full Name</label>
                                <p className="applicationInputted">{proposalDetails.fullname}</p>

                                <label className="applicationLabel" htmlFor="email">Email</label>
                                <p className="applicationInputted">{proposalDetails.email}</p>

                                <label className="applicationLabel" htmlFor="bids">Bids(RM)</label>
                                <p className="applicationInputted">{proposalDetails.bids}</p>

                                <label className="applicationLabel" htmlFor="notes">Notes</label>
                                <p className="applicationInputted">{proposalDetails.notes || "-"}</p>
                            </form>

                            <ButtonGroup className="application-profile-button-group">
                                <Button className="application-profile-button"
                                    onClick={() => handleProfileClick(proposalDetails.freelancerID)}>Check Profile</Button>
                                <Button className="application-contact-button"
                                    onClick={() => handleEmailClick(proposalDetails.email, projectName, clientName)}>Contact via Email</Button>
                                <Button className="application-accept-button"
                                    onClick={() => handleAcceptClick()}>Accept</Button>
                                <Button className="application-reject-button"
                                onClick={() => handleRejectClick()}>Reject</Button>
                            </ButtonGroup>
                        </div>
                        <div className="application-middle-side">
                            {proposalDetails.cvUrl ? (
                                <div className="FilesAttachedContainer">
                                    <label className="applicationSubLabel">CV Attached</label>
                                    <PdfPreview fileUrl={proposalDetails.cvUrl} fileName={proposalDetails.cvName || 'CV'} />
                                </div>
                            ) : (
                                <div className="FilesAttachedContainer">
                                    <label className="applicationSubLabel">No CV Attached</label>
                                </div>
                            )}
                        </div>
                        <div className="application-right-side">
                            {proposalDetails.proposalUrl ? (
                                <div className="FilesAttachedContainer">
                                    <label className="applicationSubLabel">Proposal Attached</label>
                                    <PdfPreview fileUrl={proposalDetails.proposalUrl} fileName={proposalDetails.proposalName || 'Proposal'} />
                                </div>
                            ) : (
                                <div className="FilesAttachedContainer">
                                    <label className="applicationSubLabel">No Proposal Attached</label>
                                </div>
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

export default ClientApplicationDetails;