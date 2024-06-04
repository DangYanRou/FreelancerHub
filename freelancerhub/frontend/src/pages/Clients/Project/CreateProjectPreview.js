import React,{useContext, useState, useEffect} from 'react';
import workImage from '../../../Gallery/work.png';
import noteImage from '../../../Gallery/note.png';
import { useNavigate } from "react-router-dom";
import '../../../styles/Clients/CreateProjectPreview.css';
import Heading from '../../../components/Heading';
import { ProjectContext } from '../../../context/ProjectContext';
import { auth, db } from '../../../firebase';
import { collection, setDoc,  arrayUnion, getDoc,doc, query, where, getDocs, addDoc } from "firebase/firestore";
import Loading from '../../../components/Loading';
import ConfirmationDialog from '../../../components/ConfirmationDialog';



// ProgressBar component to display the stages of project creation
const ProgressBar = ({ stages }) => {
  return (
    <div className="flex justify-between w-10/12 mb-8 border py-4 mx-auto">
      {stages.map((stage, index) => (
        <div key={index} className={`stage-container w-1/4 flex flex-col justify-between ${index !== stages.length - 1 ? 'border-r' : ''}`}>
        <div className="stage flex flex-col items-center px-4">
            <div className="icon w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stage.title === 'Preview' ? '#213E60' : '#E9EBFD' }}>
              <img src={stage.title === 'Preview' ? workImage : noteImage} alt="Stage icon" />
            </div>
            <div className="title font-bold">{stage.title}</div>
            </div>

            <div className="flex items-center justify-center">{stage.step}</div>
          </div>
      ))}
    </div>
  );
};





const CreateProjectPreview = () => {

  //edit here to navigate to posted part
  const handlePreviousButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/post-project-preferred");
  };

  // Define the stages of project creation
  const stages = [
    { title: 'Project Details', step: 'Step 1/4' },
    { title: 'Project Description', step: 'Step 2/4' },
    { title: 'Preferred', step: 'Step 3/4' },
    { title: 'Preview', step: 'Step 4/4' }
  ];

  const [projectInfo, setProjectInfo] = useContext(ProjectContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const navigate = useNavigate();

  const freelancerid = selectedUsers.map(user => user.uid);
  function clearContext() {
    setProjectInfo({}); // or set to initial state
  }

  const handlePostClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    const user=auth.currentUser;
    if(user){

      const docRef = doc(db, "clients", user.uid);
      const docSnap = await getDoc(docRef);
      let name='';
      if (docSnap.exists()) {
        name = docSnap.data().name || null; // If `name` is `undefined`, use `null` instead
      } else {
        console.log("No such document!");
      }
      const projectInfoWithClient={
        ...projectInfo,
        clientID:user.uid,
        client: name,
      };
    
    console.log('addProject:', addProject);
    console.log('projectInfo:', projectInfoWithClient);
    console.log('navigate:', navigate);
    console.log('handlePostClick called');
    addProject(projectInfoWithClient)
    .then((projectRef) => {
        // alert('Project posted successfully!');
        const projectID = projectRef.id;
        console.log('Project ID:', projectID);
        // Use map to create an array of promises
        const promises = freelancerid.map(id => {
          if(id.length > 0){

            const notificationToFreelancerData = {
                isRead: false,
                isPop: false,
                timestamp: new Date(),
                type: 0,
                priority: 2,
                projectID: projectID,
                clientID: user.uid,
                to: id
            };
            console.log('Notification UID:', id);
          
            // Return the promise from addDoc
            return addDoc(collection(db, 'notifications'), notificationToFreelancerData);
    }});
      
        // Use Promise.all to wait for all promises to complete
        return Promise.all(promises);
    })
    .then(() => {
        console.log('Notification added successfully!');
        navigate('/clients/project-posted');
        setProjectInfo({
          title: '',
          minInput: '',
          maxInput: '',
          location: '',
          description: '',
          category: '',
          workPlace: '',
          currencyInput: 'MYR',
          date: null,
          workload: '',
          duration: '',
          durationUnit: 'day(s)',
          preferredQualification: '',
          jobResponsibilities: [],
          preferredSkills: [],
          keywords: [],
          statusState: 1,
          postedTime: new Date()
        });
    }).finally(() => {
      setLoading(false);
      setProjectInfo({
        title: '',
        minInput: '',
        maxInput: '',
        location: '',
        description: '',
        category: '',
        workPlace: '',
        currencyInput: 'MYR',
        date: null,
        workload: '',
        duration: '',
        durationUnit: 'day(s)',
        preferredQualification: '',
        jobResponsibilities: [],
        preferredSkills: [],
        keywords: [],
        statusState: 1,
        postedTime: new Date()
      });
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
} else {
    console.log('No user is signed in');
}
  };

  const addProject = async (projectInfo) => {
    console.log('Adding project:', projectInfo);
    try {
      const user = auth.currentUser;
      const uid = user.uid;
  
      // Generate a new document ID
      const docRef = doc(collection(db, "projects"));
      const docID = docRef.id;
  
      // Add the new project with the custom document ID
      await setDoc(docRef, projectInfo);
  
      await setDoc(doc(db, "clients", uid), {
        createdProjects: arrayUnion(docID)
      }, { merge: true });    
  
      console.log("Document written with ID: ", docID);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchFavouriteFreelancers = async () => {
    try {
      const user = auth.currentUser;
      const clientID = user.uid;
      const collectionRef = collection(db, 'favouriteFreelancer');
      const q = query(collectionRef, where('clientID', '==', clientID));
      const snapshot = await getDocs(q);
      const favouriteFreelancers = [];

      for (let docSnapshot of snapshot.docs) {
        const data = docSnapshot.data();
        if (data.uid) {
          const freelancerDoc = doc(db, 'freelancers', data.uid);
          const freelancerSnapshot = await getDoc(freelancerDoc);
          
          if (freelancerSnapshot.exists() ) {
            const freelancerData = freelancerSnapshot.data();
            // Check if the freelancer is already in the array
            const isFreelancerInArray = favouriteFreelancers.some(freelancer => freelancer.uid === data.uid);
            if(!isFreelancerInArray){
            favouriteFreelancers.push({
              uid: data.uid,
              profilePicture: freelancerData.profilePicture,
              name: freelancerData.name,
              email: freelancerData.email,
              selected:false
            })};
          }
        }
      }
      setLoading(false);
      return favouriteFreelancers;
    } catch (error) {
      console.error('Error fetching favourite freelancers: ', error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavouriteFreelancers().then(favouriteFreelancers => {
      setUsers(favouriteFreelancers);
    });
  }, []);

  
  const handleUserClick = (index) => {
    const updatedUsers = users.map((user, idx) => {
      if (idx === index) {
        return { ...user, selected: !user.selected };
      }
      return user;
    });
    setUsers(updatedUsers);

    const selectedUser = updatedUsers[index];
    if (selectedUser.selected) {
      setSelectedUsers([...selectedUsers, selectedUser]);
    } else {
      setSelectedUsers(selectedUsers.filter(user => user.uid !== selectedUser.uid));
    }
  };

    useEffect(() => {
      console.log('Current selected users:', selectedUsers);
    }, [selectedUsers]);

  // const HandleConfirmationOpen = () => {
  //   setConfirmationOpen(true);
  // };


  // const handleCancelSubmission = async (event) => {
  //   setConfirmationOpen(false);
  // };


    if (loading) {
      return <Loading />;
    }

  return (
    <div className="flex flex-col items-start justify-center">
           <Heading as="h1" className="ml-[25px] tracking-[-0.90px] md:p-5 mt-5">
                      Create Project
          </Heading>

           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[93%] mx-auto" />
      <ProgressBar stages={stages} />
      <div style={{ backgroundColor: '#69ACC2' }} className="w-screen max-w-full h-8/10">
        <div className="bg-white w-4/5 rounded-md my-12 mx-auto text-left">
        <form className="flex flex-col space-y-4 p-6">

          <div className="flex justify-left mr-8 ml-8 mt-8 mb-2 w-8/10">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold " htmlFor="subject">Subject: </label>
              <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">{projectInfo.title}</p>
            </div>
          </div>
          <div className="flex justify-between w-8/10 m-8">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="workplace">Workplace: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">{projectInfo.workPlace}</p>
 <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="workplace">Category: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">{projectInfo.category}</p>
  </div>
  <div className="w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="location">Location: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="duration">{projectInfo.location}</p>
  </div>
</div>
<div className="m-8 w-8/10">
  <div className="w-full">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Project Description: </label>
    <div className="w-full rounded-[10px] bg-white-A700 px-5 sm:w-full py-2 whitespace-normal" id="projectDescriptionSHow">
      <p>{projectInfo.description}</p>
</div>
            </div>
          </div>
          <div className="flex justify-between w-8/10 m-8">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Project Start Time: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
  id="startTimePreview">{projectInfo.date ? projectInfo.date.toLocaleDateString() : ''}</p>
   <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Duration: </label>
    <div className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full"
 id="durationPreview">{projectInfo.duration}
   <div>
    <label className="font ml-10">{projectInfo.durationUnit}</label>
  </div>
 </div>
 <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Budget: </label>
 <div className="flex justify-between h-[40px] w-full items-center rounded-[10px] bg-white-A700 px-5 sm:w-full" id="budgetPreview">
  <div>
    <label className="font-bold mr-2">Min:</label>
    <span>{projectInfo.minInput}</span>
  </div>
  <div>
    <label className="font-bold mr-2">Max:</label>
    <span>{projectInfo.maxInput}</span>
  </div>
  <div>
    <label className="font-bold mr-2">{projectInfo.currencyInput}</label>
  </div>
</div>
  </div>
  <div className="w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">Workload: </label>
    <p className="flex h-[40px] w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full py-2"
 id="workload">{projectInfo.workload}</p>
  </div>
</div>

<div className="flex justify-left m-8 w-8/10">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Project Responsibilities: </label>
              <div className="w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full py-2 whitespace-normal"
 id="responsibilityShow">
<div className="flex">
{projectInfo.jobResponsibilities.map((responsibilities, index) => (
      <div key={index} className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
        <span>#{responsibilities}</span>
      </div>
    ))}
</div> </div>
            </div>
          </div>

          <div className="flex justify-left m-8 w-8/10">
            <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">Preferred Qualification: </label>
            <div className="w-full items-center justify-left rounded-[10px] bg-white-A700 px-5 sm:w-full py-2 whitespace-normal" id="qualificationShow">
            <p>{projectInfo.preferredQualification}</p>

</div>
</div>
          </div>

          <div className="flex justify-between w-8/10 m-8">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Preferred Skill: </label>
    <div className="flex">
    {projectInfo.preferredSkills.map((skill, index) => (
      <div key={index} className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
        <span>{skill}</span>
      </div>
    ))}

</div>
 <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Keyword: </label>
<div className="flex">
{projectInfo.keywords.map((keyword, index) => (
      <div key={index} className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
        <span>#{keyword}</span>
      </div>
    ))}
</div>
 
  </div>
  <div className="w-1/2">
    
  </div>
</div>
<div className="flex flex-col w-1/2 m-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="favouriteCollaborator">Send Project Invitation: </label>
    <p className="text-gray-800 text-xs italic mb-3">Select your favourite collaborator from the dropdown list.</p>
    <div className="rounded-[10px] overflow-hidden border border-solid border-gray-500 bg-white-A700 ">
    {users.length > 0 ? (
  <table className="w-full">
    <tbody>
      {users.map((user, index) => (
        <tr key={index} onClick={() => handleUserClick(index)}>
          <td className={`rounded-[10px] border border-solid border-gray-500 w-4/5 m-auto my-2 p-2 flex items-center ${user.selected ? 'bg-[#0496C7]' : 'bg-gray-200'} ${user.selected ? '' : 'hover:bg-[#04BADE]'} transition-colors duration-200`}>
            <img src={user.profilePicture} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
            <span className="font-bold text-gray-700">{user.name}</span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="text-center text-gray-700 py-4">No favourite collaborators</p>
)}
</div>
  </div>

<div className="pt-5">
<div className="flex justify-between w-8/10 m-8" >
  <div className="w-1/4">
    <button onClick={handlePreviousButtonClick} type="button" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
      Previous
    </button>
  </div>
  <div className="w-1/4">
    <button onClick={handlePostClick} type="postProject" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
      Post
    </button>
  </div>
</div>
</div>

          </form>
        </div>
      </div>
      {/* <ConfirmationDialog
        open={confirmationOpen}
        message="Are you sure you want to add this project?"
        onConfirm={handlePostClick}
        onCancel={handleCancelSubmission}
      /> */}
    </div>
  );
};

export default CreateProjectPreview;