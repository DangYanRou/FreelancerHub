import React, {useState, useEffect, useContext} from 'react';
import workImage from '../../../Gallery/work.png';
import noteImage from '../../../Gallery/note.png';
import { useNavigate } from "react-router-dom";
import user from '../../../Gallery/user.jpg';
import NavigationBarClients from '../../../nav/NavigationBarClient';
import Heading from '../../../components/Heading';
import { ProjectContext } from '../../../context/ProjectContext';
import { db, auth } from '../../../firebase'; 
import { collection, query, where, getDocs, getDoc, doc} from "firebase/firestore";
import EmailContext from '../../../context/ProjectInvitationContext';

// ProgressBar component to display the stages of project creation
const ProgressBar = ({ stages }) => {
    return (
      <div className="flex justify-between w-10/12 mb-8 border py-4 mx-auto">
      {stages.map((stage, index) => (
          <div key={index} className={`stage-container w-1/4 flex flex-col justify-between ${index !== stages.length - 1 ? 'border-r' : ''}`}>
          <div className="stage flex flex-col items-center px-4">
              <div className="icon w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: stage.title === 'Invite' ? '#213E60' : '#E9EBFD' }}>
                <img src={stage.title === 'Invite' ? workImage : noteImage} alt="Stage icon" />
              </div>
              <div className="title font-bold">{stage.title}</div>
              </div>

              <div className="flex items-center justify-center">{stage.step}</div>
              </div>
      ))}
    </div>
  );
};


const CreateProjectInvite= () => {
  // Define the stages of project creation
  const stages = [
    { title: 'Project Details', step: 'Step 1/5' },
    { title: 'Project Description', step: 'Step 2/5' },
    { title: 'Preferred', step: 'Step 3/5' },
    { title: 'Invite', step: 'Step 4/5' },
    { title: 'Preview', step: 'Step 5/5' },
  ];

  const { emailSubject, setEmailSubject, emailContent, setEmailContent, emailClient, setEmailClient, selectedUsers, setSelectedUsers } = useContext(EmailContext);

  const fetchFavouriteFreelancers = async () => {
    // // Fetch favourite freelancers from the database
    const favouriteFreelancers = [];
    // const user = auth.currentUser;
    // const clientID = user.uid;
    // const collectionRef = collection(db, 'favouriteFreelancer');
    // const q = query(collectionRef, where('clientID', '==', clientID));
    // const snapshot = await getDocs(q);
    // for (let docSnapshot of snapshot.docs) {
    //   const data = docSnapshot.data();
    //   if (data.uid) {
    //     const freelancerDoc = doc(db, 'freelancers', data.uid);
    //     const freelancerSnapshot = await getDoc(freelancerDoc);
    //     if (freelancerSnapshot.exists()) {
    //       const freelancerData = freelancerSnapshot.data();
    //       favouriteFreelancers.push({
    //         uid: data.uid,
    //         profilePicture: freelancerData.profilePicture,
    //         name: freelancerData.name,
    //         email: freelancerData.email,
    //         selected:false
    //       });
    //     }
    //   }
    // }
    
    return favouriteFreelancers;
  };

  // Usage
  fetchFavouriteFreelancers().then(favouriteFreelancers => {
    setUsers(favouriteFreelancers);
  });

  const navigate = useNavigate();
  
  const handlePreviousButtonClick = (event) => {
    event.preventDefault();
    navigate("/clients/post-project-preferred");
  };

  const handleNextButtonClick = (event) => {
    event.preventDefault();
    console.log(emailContent)
    navigate("/clients/post-project-preview");
  };

  const [users, setUsers] = useState([]);

  const handleUserClick = (index) => {
    const user = users[index];
    if (!selectedUsers.some(selectedUser => selectedUser.uid === user.uid)) {
      setSelectedUsers(prevSelectedUsers => {
        const newSelectedUsers = [...prevSelectedUsers, user];
        newSelectedUsers[index].selected = !newSelectedUsers[index].selected;
        console.log('Added user:', user);
        console.log('New selected users:', newSelectedUsers);
        return newSelectedUsers;
      });
    } else {
      setSelectedUsers(prevSelectedUsers => {
        const newSelectedUsers = prevSelectedUsers.filter(selectedUser => selectedUser.uid !== user.uid);
        console.log('Removed user:', user);
        console.log('New selected users:', newSelectedUsers);
        return newSelectedUsers;
      });
    }
  };

  useEffect(() => {
    console.log('Current selected users:', selectedUsers);
  }, [selectedUsers]);


  const fecthClientInfo = async () => {
    const user = auth.currentUser;
    const docRef = doc(db, "clients", user.uid);
    const docSnap = await getDoc(docRef);
    let email = '';
    if (docSnap.exists()) {
      email = docSnap.data().email;
      setEmailClient(email);
    } else {
      console.log("No such document!");
    }
  };
  
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
        <form className="flex flex-col space-y-4 p-4">
     

            <div className="flex justify-between w-8/10 m-4">
  <div className="flex flex-col w-1/2 mr-8">

 <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="projectStartTime">Subject: </label>
    <input className="flex h-[40px] w-full items-center justify-center rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 sm:w-full"
    id="subject" name="emailSubject"  onChange={(e) => setEmailSubject(e.target.value)} value={emailSubject} type="text" />
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="duration">Content: </label>
    <textarea style={{ width: '100%' }} className="flex h-[300px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 py-2"
    id="content" name="emailContent"  onChange={(e) => setEmailContent(e.target.value)} value={emailContent}></textarea>
  </div>

  <div className="flex flex-col w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="favouriteCollaborator">Favourite Collaborator: </label>
    <div className="rounded-[10px] overflow-hidden border border-solid border-gray-500 bg-white-A700 ">
    <table className="w-full">
  <tbody>
  {users.map((user, index) => (
    <tr key={index} onClick={() => handleUserClick(index)}>
  <td className={`rounded-[10px] border border-solid border-gray-500 w-4/5 m-auto my-2 p-2 flex items-center ${user.selected ? 'bg-green-200' : 'bg-red-100'} ${user.selected ? '' : 'hover:bg-gray-200'} transition-colors duration-200`}>
    <img src={user.profilePicture} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
    <span className="font-bold text-gray-700">{user.name}</span>
  </td>
</tr>
))}
  </tbody>
</table>
</div>
  </div>
    

</div>

<div className="pt-5">
<div className="flex justify-between w-8/10 m-4" >
  <div className="w-1/4">
    <button onClick={handlePreviousButtonClick} type="button" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
      Previous
    </button>
  </div>
  <div className="w-1/4">
    <button onClick={handleNextButtonClick} type="next2" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
      Next
    </button>
  </div>
</div>
</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectInvite;