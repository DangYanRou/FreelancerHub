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
import { useUser } from '../../UserContext';
import { db } from "../../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

const NotificationPage = () => {
  const { user } = useUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch notifications
        const notiQuery = query(collection(db, 'notifications'), where('freelancerId', '==', user));
        const notiSnapshot = await getDocs(notiQuery);
        const notifications = notiSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch project names
        const projectFetchPromises = notifications.map(async (notification) => {
          if (notification.projectId) {
            const projectRef = doc(db, 'projects', notification.projectId);
            const projectDoc = await getDoc(projectRef);
            if (projectDoc.exists()) {
              return { ...notification, projectName: projectDoc.data().projectName };
            }
          }
          return notification;
        });

        const notificationsWithProjects = await Promise.all(projectFetchPromises);
        setData(notificationsWithProjects);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [user]);

  const handleApplicationCheck= (event) => {
    
  };

  return (
    <div className="notification-page">
      <NavigationBar />
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
        Notifications
      </Heading>
      <p>User ID: {user}</p>
      <div className="notification-container">
        {data.map(item => {
          if (item.type === 0) {
            return (
              <Alert key={item.id} severity="success"> action={handleApplicationCheck}
                You have successfully applied for {item.projectName || 'a project'}
              </Alert>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default NotificationPage;