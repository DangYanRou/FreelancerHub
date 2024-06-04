import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-use-history';
import { useUser } from './UserContext';
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [pathname, setPathname] = useState('');
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  const history = useHistory();
  const [loading,setLoading] = useState();

  useEffect(() => {
    if (!user) return;

    const notiQuery = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'), where('to', '==', user.id), where('isPop', '==', false));
    const unsubscribe = onSnapshot(notiQuery, async (snapshot) => {
      try {
        console.log("fetching noti...")
        const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
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
  
          const notificationsWithProjects = await Promise.all(projectFetchPromises);
          const notificationsWithFreelancers = await Promise.all(freelancerFetchPromises);
          const notificationsWithClients = await Promise.all(clientFetchPromises);
  
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
      }
    });

    return () => unsubscribe();

  }, [user, pathname, history]);

  useEffect(() => {
    // Display new notifications
    data.forEach(notification => {
      if (!displayedNotifications.includes(notification.id)) {
        showNotification(notification);
        setDisplayedNotifications(prevState => [...prevState, notification.id]);
      }
    });
  }, [data, displayedNotifications]);

  const handleUpdate = async (event, notificationId) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        isPop: true
      });
    } catch (error) {
      console.error("Error updating pop: ", error);
    }
  };

  const handleInvitation = async (event, item) => { //type=0
    try {
      setLoading(true);
      const notificationRef = doc(db, 'notifications', item.id);
      await updateDoc(notificationRef, {
        isRead: true
      });
      history.push('/freelancers/explore', { projectId: item.projectID })

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
      history.push("/freelancers/projects-applied", { projectId: item.projectID });
      
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
      history.push("/freelancers/projects-applied", { projectId: item.projectID });
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
      
      history.push("/freelancers/projects-applied", { projectId: item.projectID });
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


  const showNotification = (item) => {
    switch (item.type) {
      case 0:
          toast.info(`You have been invited to join ${item.projectName || 'a project'}`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleInvitation(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 1:
          toast.success(`Your application for ${item.projectName || 'a project'} has been submitted successfully.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleFreelanerCheckApplication(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 1:
          toast.success(`Your application for ${item.projectName || 'a project'} has been submitted successfully.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleFreelanerCheckApplication(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 2:
          toast.info(`You have received a new application for ${item.projectName || 'a project'}`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleClientApplicationView(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 3:
          toast.success(`You have assigned ${item.projectName || 'a project'} to ${item.freelancerName || 'a freelancer'}`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleClientAccept(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 3.5:
          toast.warning(`You have rejected the application for ${item.projectName || 'a project'} from ${item.freelancerName || 'a freelancer'}`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleClientReject(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 4:
          toast.success(`You have been assigned to ${item.projectName || 'a project'} by ${item.clientName || 'a client'}.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleFreelancerReceiveAssignment(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 4.1:
          toast.success(`You have accepted the assignment of ${item.projectName || 'a project'} from ${item.clientName || 'a client'}.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleFreelancerCheckProjectAssigned(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 4.1:
          toast.success(`You have accepted the assignment of ${item.projectName || 'a project'} from ${item.clientName || 'a client'}.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleFreelancerCheckProjectAssigned(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 4.2:
          toast.success(`${item.freelancerName || 'A freelancer'} has accepted your assignment for ${item.projectName || 'a project'}.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleClientCheckAssignment(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 4.3:
          toast.warning(`You have rejected the assignment of ${item.projectName || 'a project'} from ${item.clientName || 'a client'}. Click here to explore more projects that you might like.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleFreelancerRejectAssignment(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 4.4:
          toast.info(`${item.freelancerName || 'A freelancer'} has rejected your assignment for ${item.projectName || 'a project'}. Click here to assign your project to another talented freelancer.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleClientReceiveRejection(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 4.5:
          toast.warning(`Your application for ${item.projectName || 'a project'} has been rejected. Revise your proposal and click here to apply again.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleFreelancerReceiveRejection(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 5:
          toast.success(`You have successfully marked ${item.projectName || 'a project'} as completed.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleClientMarkAsDone(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      case 6:
          toast.success(`Your ${item.projectName || 'project'} has been completed.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
              onClick: (event) => handleClientMarkAsDone(event, item),
              onOpen: (event) => handleUpdate(event, item.id)
          });
          break;
      default:
          break;
    }
  };


  return (
    <NotificationContext.Provider value={{ setPathname }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}>
      </ToastContainer>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;