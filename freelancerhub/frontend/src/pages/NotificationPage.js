import React, { useState, useEffect } from 'react';
import '../styles/NotificationPage.css';
import { useHistory } from 'react-router-use-history';
import Heading from '../components/Heading';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useUser } from '../context/UserContext';
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import Loading from '../components/Loading';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import ConfirmationDialog from '../components/ConfirmationDialog';


/*
Noti types
type 0 = freelancer receive invitation  priority = 2
type 1 = freelancer submitted application priority = 1
type 2 = client received application priority = 2
type 3 = client accepted application priority = 2
type 3.5 = client rejected application priority = 2
type 4 = freelancer received assignment priority = 2
type 4.1 = freelancer accept assignment priority = 1
type 4.2 = notify client that freelancer accept assignment priority = 1
type 4.3 = freelancer reject assignment priority = 1
type 4.4 = notify client that freelancer reject assignment priority = 1
type 4.5 = freelancer received rejection priority = 2
type 5 = client marked project as completed priority = 1
type 6 = freelancer reveiced project completeness priority = 1
*/

const NotificationPage = () => {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notiQuery = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'), where('to', '==', user.id));
        const notiSnapshot = await getDocs(notiQuery);
        const notifications = notiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
        // Fetch related data (projects, freelancers, clients) in parallel
        const fetchRelatedData = async (notifications) => {
          const projectFetchPromises = notifications.map(async (notification) => {
            if (notification.projectID) {
              const projectRef = doc(db, 'projects', notification.projectID);
              const projectDoc = await getDoc(projectRef);
              if (projectDoc.exists()) {
                return { ...notification, projectName: projectDoc.data().title };
              }
            }
            return notification;
          });
  
          const freelancerFetchPromises = notifications.map(async (notification) => {
            if (notification.freelancerID) {
              const freelancerRef = doc(db, 'freelancers', notification.freelancerID);
              const freelancerDoc = await getDoc(freelancerRef);
              if (freelancerDoc.exists()) {
                return { ...notification, freelancerName: freelancerDoc.data().name };
              }
            }
            return notification;
          });
  
          const clientFetchPromises = notifications.map(async (notification) => {
            if (notification.clientID) {
              const clientRef = doc(db, 'clients', notification.clientID);
              const clientDoc = await getDoc(clientRef);
              if (clientDoc.exists()) {
                return { ...notification, clientName: clientDoc.data().name };
              }
            }
            return notification;
          });
  
          // Wait for all fetches to complete
          const notificationsWithProjects = await Promise.all(projectFetchPromises);
          const notificationsWithFreelancers = await Promise.all(freelancerFetchPromises);
          const notificationsWithClients = await Promise.all(clientFetchPromises);
  
          // Merge all data
          const allData = notificationsWithClients.map((notification, index) => ({
            ...notification,
            freelancerName: notificationsWithFreelancers[index].freelancerName,
            projectName: notificationsWithProjects[index].projectName
          }));
  
          return allData;
        };
  
        const notificationsWithAllData = await fetchRelatedData(notifications);
        setData(notificationsWithAllData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
        console.log(data);
      }
    };
    fetchData();
  }, [user]);

  const handleInvitation = async (event, item) => { //type=0
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      
      //prompt freelancer to apply the project invited, call
      //item.projectID to get projectID
      //item.clientID to get clientID
      //item.to to get freelancerID

    } catch (error) {
      console.error("Error updating priority: ", error);
    }
    finally{
      setLoading(false);
    }
  };
  
  const handleFreelanerCheckApplication = async (event, item) => { //type=1
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      history.push("/freelancers/project-applied")
      
      //prompt freelancer with the card that contains the view application
      //and cancel applictaion button, call
      //item.projectID to get projectID
      //item.clientID to get clientID
      //item.to to get freelancerID
    } catch (error) {
      console.error("Error updating priority: ", error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleClientApplicationView = async (event, item) => { //type=2
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });

      history.push("/clients/proposal-details",{proposal_key:{projectID:item.projectID, freelancerID:item.freelancerID}});
    } catch (error) {
      console.error("Error updating priority: ", error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleClientAccept = async (event, item) => { //type=3
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      history.push("/clients/proposal-details",{proposal_key:{projectID:item.projectID, freelancerID:item.freelancerID}});
    } catch (error) {
      console.error("Error updating priority: ", error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleClientReject = async (event, item) => { //type=3.5
    try {
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      
      history.push("/clients/proposal-received",{projectID:item.projectID});
    } catch (error) {
      console.error("Error updating priority: ", error);
    }
  };

  const handleFreelancerReceiveAssignment = async (event, item) => { //type=4
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });

      history.push("/freelancers/application",{proposal_key:{projectID:item.projectID,freelancerID:item.to}});
    } catch (error) {
      console.error("Error updating priority: ", error);
    }finally{
      setLoading(false);
    }
  };


  const handleFreelancerCheckProjectAssigned = async (event, item) => { //type=4.1
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      history.push("/freelancers/projects-applied",{selectedProjectId:{projectID:item.projectID}});
      //prompt freelancer with the card that contains the status bar, call
      //item.projectID to get projectID
      //item.clientID to get clientID
      //item.to to get freelancerID
    } catch (error) {
      console.error("Error updating priority: ", error);
    }finally{
      setLoading(false);
    }
  };

  const handleClientCheckAssignment = async (event, item) => { //type=4.2
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      
      history.push("/clients/proposal-received",{proposal_key:{projectID:item.projectID, freelancerID:item.freelancerID}});
    } catch (error) {
      console.error("Error updating priority: ", error);
    }finally{
      setLoading(false);
    }
  };

  const handleFreelancerRejectAssignment = async (event, item) => { //type=4.3
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      
      history.push("/freelancers/explore");
    } catch (error) {
      console.error("Error updating priority: ", error);
    }finally{
      setLoading(false);
    }
  };

  const handleClientReceiveRejection = async (event, item) => { //type=4.4
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      
      history.push("/clients/proposal-received",{proposal_key:{projectID:item.projectID, freelancerID:item.freelancerID}});//prompt to check application
    } catch (error) {
      console.error("Error updating priority: ", error);
    }finally{
      setLoading(false);
    }
  };

  const handleFreelancerReceiveRejection = async (event, item) => { //type=4.5
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      
      history.push("/freelancers/project-applied")
      //prompt freelancer with the card that contains the apply button, call
      //item.projectID to get projectID
      //item.clientID to get clientID
      //item.to to get freelancerID
    } catch (error) {
      console.error("Error updating priority: ", error);
    }finally{
      setLoading(false);
    }
  };

  const handleClientMarkAsDone = async (event, item) => { //type=5
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });

      history.push("/clients/project-completed");
    } catch (error) {
      console.error("Error updating priority: ", error);
    }finally{
      setLoading(false);
    }
  };

  const handleFreelancerDone = async (event, item) => { //type=6
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });

      history.push("/freelancers/project-completed-page");
    } catch (error) {
      console.error("Error updating priority: ", error);
    }finally{
      setLoading(false);
    }
  };

  
  
  const getPriority = (priority) => {
    return priority === 1 ? 'info' : 'warning';
  };

  const isRead = (isRead) => {
    return isRead ? 'outlined' : 'standard';
  };

  return (
    <div className="notification-page">
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
        Notifications
      </Heading>
      <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
      {loading ? ( 
        <Loading />
      ) : (
        <div className="notification-container">
          
          {data.map(item => {

            if (item.type === 0) { //project invitation
              return (
                <Alert key={item.id} severity="info" onClick={(event) => handleInvitation(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have been invited to join <b>{item.projectName || 'a project'}. </b></AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 1) { //project applied
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleFreelanerCheckApplication(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>Your application for <b>{item.projectName || 'a project'}</b> has been submitted successfully.</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 2) { //receive application
              return (
                <Alert key={item.id} severity="info" onClick={(event) => handleClientApplicationView(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have received a new application for <b>{item.projectName || 'a project'}.</b></AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 3) { //accept application
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleClientAccept(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have assigned <b>{item.projectName || 'a project'}</b> to <b>{item.freelancerName || 'a freelancer'}.</b></AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 3.5) { //reject application
              return (
                <Alert key={item.id} severity="warning" onClick={(event) => handleClientReject(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have rejected the application for <b>{item.projectName || 'a project'}</b> from <b>{item.freelancerName || 'a freelancer'}</b>. Click here to assign your project to other freelancers.</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 4) { //receive assignment
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleFreelancerReceiveAssignment(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have been assigned to <b>{item.projectName || 'a project'}</b> by <b>{item.clientName || 'a client'}</b>.</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 4.1) { //accept assignment(freelancer)
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleFreelancerCheckProjectAssigned(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have accepted the assignment of <b>{item.projectName || 'a project'}</b> from <b>{item.clientName || 'a client'}.</b></AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 4.2) { //accept assignment (client)
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleClientCheckAssignment(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle><b>{item.freelancerName || 'A freelancer'}</b> has accepted your assignment for <b>{item.projectName || 'a project'}.</b></AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 4.3) { //reject assignment (freelancer)
              return (
                <Alert key={item.id} severity="warning" onClick={(event) => handleFreelancerRejectAssignment(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have rejected the assignment of <b>{item.projectName || 'a project'}</b> from <b>{item.clientName || 'a client'}</b>. Click here to explore more projects that you might like.</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 4.4) { //reject assignment (client)
              return (
                <Alert key={item.id} severity="info" onClick={(event) => handleClientReceiveRejection(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle><b>{item.freelancerName || 'A freelancer'}</b> has rejected your assignment for <b>{item.projectName || 'a project'}</b>. Click here to assign your project to another talented freelancer.</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 4.5) { //receive rejection
              return (
                <Alert key={item.id} severity="warning" onClick={(event) => handleFreelancerReceiveRejection(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>Your application for <b>{item.projectName || 'a project'}</b> has been rejected. Revise your proposal and click here to apply again.</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 5) { //marked as completed
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleClientMarkAsDone(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have successfully marked <b>{item.projectName || 'a project'}</b> as completed.</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 6) { //project completeness
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleFreelancerDone(event, item)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>Your <b>{item.projectName || 'project'}</b> has been completed.</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default NotificationPage;