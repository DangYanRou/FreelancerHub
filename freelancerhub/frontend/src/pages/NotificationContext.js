import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-use-history';
import { useUser } from '../UserContext';
import { db } from "../firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [pathname, setPathname] = useState('');
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const notiQuery = query(collection(db, 'notifications'), orderBy('timestamp', 'desc'), where('to', '==', user), where('isPop', '==', false));
        const notiSnapshot = await getDocs(notiQuery);
        const notifications = notiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
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
    };
    fetchData();
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

  useEffect(() => {
    localStorage.setItem('pathname', pathname);
  }, [pathname]);

  const handleClick = () => {
    history.push(pathname);
  };

  const showNotification = (notification) => {
    switch (notification.type) {
      case 0:
        toast.info(`You have received an invitation for ${notification.projectName || 'the project'}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
          onClick: handleClick,
        });
        break;
      case 1:
        console.log('Item:', notification);
        toast.success(`You have successfully submitted an application for ${notification.projectName || 'the project'}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
          onClick: handleClick,
          onOpen: (event) => {
            console.log('Notification ID (onOpen):', notification.id);
            handleUpdate(event, notification.id);
          }
        });
        break;
      case 2:
        toast.info(`You have received an application for ${notification.projectName || 'the project'}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
          onClick: handleClick,
          onOpen: (event) => handleUpdate(event, notification.id)
        });
        break;
      case 3:
        toast.success(`You have assigned ${notification.projectName || 'the project'} to ${notification.freelancerName || 'the freelancer'}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
          onClick: handleClick,
        });
        break;
      case 3.5:
        toast.warning(`You have rejected the application for ${notification.projectName || 'the project'} from ${notification.freelancerName || 'the freelancer'}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
          onClick: handleClick,
        });
        break;
      case 4:
        toast.success(`You have been assigned to ${notification.projectName || 'the project'} by ${notification.clientName || 'the client'}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
          onClick: handleClick,
        });
        break;
      case 4.5:
        toast.warning(`Your application for ${notification.projectName || 'the project'} has been rejected`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
          onClick: handleClick,
        });
        break;
      case 5:
        toast.success(`Your have successfully marked ${notification.projectName || 'the project'} as completed`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
          onClick: handleClick,
        });
        break;
      case 6:
        toast.success(`Your ${notification.projectName || 'project'} was completed`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
          onClick: handleClick,
        });
        break;
      default:
        break;
    }
  };

  const handleUpdate = async (event, notificationId) => {
    try {
      console.log('Notification ID:', notificationId);
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        isPop: true
      });
    } catch (error) {
      console.error("Error updating priority: ", error);
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