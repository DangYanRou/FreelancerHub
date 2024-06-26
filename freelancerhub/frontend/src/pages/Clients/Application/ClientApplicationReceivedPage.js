import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-use-history';
import { useLocation } from 'react-router-dom';
import Heading from '../../../components/Heading';
import { Button, Card } from "flowbite-react";
import { db } from "../../../firebase";
import { collection, query, where, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import Loading from '../../../components/Loading';
import "../../../styles/Clients/ClientApplicationReceivedPage.css"
import { useUser } from '../../../context/UserContext';

const ClientApplicationReceivedPage = () => {
  const history = useHistory();
  const { user } = useUser();
  const location = useLocation();
  console.log(location);
  const [data, setData] = useState([]);
  const projectID = location.state.projectID;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appQuery = query(collection(db, 'proposals'), orderBy('statusState', 'desc'),
          orderBy('statusTime', 'desc'), where('projectID', '==', projectID));
        const appSnapshot = await getDocs(appQuery);
        const applications = appSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const fetchRelatedData = async (applications) => {
          const projectFetchPromises = applications.map(async (application) => {
            if (application.projectID) {
              const projectRef = doc(db, 'projects', application.projectID);
              const projectDoc = await getDoc(projectRef);
              if (projectDoc.exists()) {
                return { ...application, projectName: projectDoc.data().title };
              }
            }
            return application;
          });

          const freelancerFetchPromises = applications.map(async (application) => {
            if (application.freelancerID) {
              const freelancerRef = doc(db, 'freelancers', application.freelancerID);
              const freelancerDoc = await getDoc(freelancerRef);
              if (freelancerDoc.exists()) {
                return { ...application, freelancerName: freelancerDoc.data().freelancerName };
              }
            }
            return application;
          });

          const clientFetchPromises = applications.map(async (application) => {
            const clientRef = doc(db, 'clients', user.id);
            const clientDoc = await getDoc(clientRef);
            if (clientDoc.exists()) {
              return { ...application, clientName: clientDoc.data().username };
            }
            
            return application;
          });

          const applicationsWithProjects = await Promise.all(projectFetchPromises);
          const applicationsWithFreelancers = await Promise.all(freelancerFetchPromises);
          const applicationsWithClients = await Promise.all(clientFetchPromises);

          const allData = applicationsWithClients.map((application, index) => ({
            ...application,
            freelancerName: applicationsWithFreelancers[index].freelancerName,
            projectName: applicationsWithProjects[index].projectName,
            clientName: applicationsWithClients[index].clientName,
          }));

          return allData;
        };

        const applicationsWithAllData = await fetchRelatedData(applications);
        setData(applicationsWithAllData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
        console.log("Applications Received:", data);
      }
    };

    fetchData();
  }, [projectID, data]);

  if (loading) {
    return <Loading />;
  }

  const handleEmailClick = (emailAddress, projectName, clientName) => {
    const subject = `Regarding your application for ${projectName}`;
    const body = `Hello,\n\nI am writing to discuss the project application you submitted for ${projectName}. Please let me know when you are available to talk.\n\nBest regards, ${clientName}`;
    
    const mailToLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailToLink;
  };

  const handleProfileClick = (freelancerID) => {
    history.push('client-view-profile', { freelancerID: freelancerID });
  };

  const handleViewApplicationClick = (projectID, freelancerID) => {
    history.push("proposal-details",{proposal_key:{projectID:projectID,freelancerID:freelancerID}});
  };


    

  return (
    <div className='application-received-container p-5'>
      <Heading as="h1" className="text-center tracking-[-0.90px] md:p-5 mt-5">
        Application Received
      </Heading>
      <hr className="border-gray-700 my-8 w-[95%] mx-auto" />

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 application-card-container">
        {data.map(item => (
          <Card
            key={item.id}
            className={`w-full mx-auto p-0 application-card ${
            item.statusState >= 3 ? 'application-card-inprogress' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer application-card-name"
                  onClick={() => handleProfileClick(item.freelancerID)}
                >
                {item.fullname || 'freelancer'}
                </span>
                <span className="mt-5 text-gray-600 dark:text-gray-400 mx-2 application-card-separator">·</span> 
                <span
                  className="mt-5 text-medium text-gray-700 dark:text-gray-400 cursor-pointer application-card-email"
                  onClick={() => handleEmailClick(item.email, item.projectName, item.clientName)}
                >
                {item.email}
                </span>
              </div>
            </div>

            <hr className="border-t-1 border-gray-300 my-2 application-card-horizontal-line" />


            <p className="font-normal text-gray-700 dark:text-gray-400 application-card-bids" >
            Bids: RM {item.bids || '999999999'}
            </p>

            {item.statusState < 3 &&(
              <p className="font-normal text-gray-700 dark:text-gray-400 apllication-card-notes" >
              Notes: {item.notes || '-'}
              </p>
            )}

            {item.statusState == 3 &&(
              <p className="font-normal text-gray-700 dark:text-gray-400 apllication-card-notes" >
              Status: <b>Awaiting freelancer's acceptance of assignment</b>
              </p>
            )}

            {item.statusState == 4 &&(
              <p className="font-normal text-gray-700 dark:text-gray-400 apllication-card-notes" >
              Status: <b>In progress</b>
              </p>
            )}
            
            
            
            <Button className='application-card-button' onClick={() => handleViewApplicationClick(item.projectID, item.freelancerID)}>
              View Application
              <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientApplicationReceivedPage;