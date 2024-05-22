import React, { useState, useEffect } from 'react';
import '../../styles/Freelancers/FreelancerNotificationPage.css';
import NavigationBar from './NavigationBarFreelancer';
import { Link } from 'react-router-dom';
import { GrFormClose } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { useHistory } from 'react-router-use-history';
import Heading from '../../components/Heading';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button } from '@mui/material';
import { useUser } from '../../UserContext';
import { db } from "../../firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import Loading from '../Loading';


/*
Noti types
type 0 = freelancer receive invitation  priority = 2
type 1 = freelancer submitted application priority = 1
type 2 = client received application priority = 2
type 3 = client accepted application priority = 2
type 3.5 = client rejected application priority = 2
type 4 = freelancer received assignment priority = 2
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
        const notiQuery = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'), where('to', '==', user));
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
                return { ...notification, freelancerName: freelancerDoc.data().freelancerName };
              }
            }
            return notification;
          });
  
          const clientFetchPromises = notifications.map(async (notification) => {
            if (notification.clientID) {
              const clientRef = doc(db, 'clients', notification.clientID);
              const clientDoc = await getDoc(clientRef);
              if (clientDoc.exists()) {
                return { ...notification, clientName: clientDoc.data().clientName };
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

  const handleApplicationCheck = async (event, notificationId) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        isRead: true
      });
      
      history.push("/freelancers/projects-applied");//prompt to check application
    } catch (error) {
      console.error("Error updating priority: ", error);
    }
  };

  const handleInvitation = async (event, notificationId) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        isRead: true
      });
      
      history.push("/freelancers/projects-applied");//prompt to apply
    } catch (error) {
      console.error("Error updating priority: ", error);
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
      <NavigationBar />
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
        Notifications
      </Heading>
      {loading ? ( 
        <Loading />
      ) : (
        <div className="notification-container">
          {data.map(item => {

            if (item.type === 0) { //project invitation
              return (
                <Alert key={item.id} severity="info" onClick={(event) => handleInvitation(event, item.id)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have received an invitation for {item.projectName || 'the project'}</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 1) { //project applied
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleInvitation(event, item.id)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have successfully submitted an application for {item.projectName || 'the project'}</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 2) { //receive application
              return (
                <Alert key={item.id} severity="info" onClick={(event) => handleInvitation(event, item.id)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have received an application for {item.projectName || 'the project'}</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 3) { //accept application
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleInvitation(event, item.id)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have assigned {item.projectName || 'the project'} to {item.freelancerName || 'the freelancer'}</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 3.5) { //reject application
              return (
                <Alert key={item.id} severity="warning" onClick={(event) => handleInvitation(event, item.id)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have rejected the application for {item.projectName || 'the project'} from {item.freelancerName || 'the freelancer'}</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 4) { //receive assignment
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleInvitation(event, item.id)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>You have been assigned to {item.projectName || 'the project'} by {item.clientName || 'the client'}</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 4.5) { //receive rejection
              return (
                <Alert key={item.id} severity="warning" onClick={(event) => handleInvitation(event, item.id)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>Your application for {item.projectName || 'the project'} has been rejected</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 5) { //marked as completed
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleInvitation(event, item.id)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>Your have successfully marked {item.projectName || 'the project'} as completed</AlertTitle>
                  {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Alert>
              );
            }

            if (item.type === 6) { //project completeness
              return (
                <Alert key={item.id} severity="success" onClick={(event) => handleInvitation(event, item.id)} 
                variant={isRead(item.isRead)} className="notification-item" color={getPriority(item.priority)}> 
                  <AlertTitle>Your {item.projectName || 'project'} was completed</AlertTitle>
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