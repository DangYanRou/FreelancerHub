import React,{useContext, useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import '../../../styles/Clients/CreateProjectPreview.css';
import Heading from '../../../components/Heading';
import { ProjectContext } from '../../../context/ProjectContext';
import { auth, db } from '../../../firebase';
import { collection, getDoc,doc, docRef, query, where, getDocs, addDoc,updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { categories,workloadOptions } from '../../../components/ProjectOptions.js';
import { IoMdClose } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import Loading from '../../../components/Loading';
import ConfirmationDialog from '../../../components/ConfirmationDialog.js';
import '../../../styles/Clients/EditProject.css';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';


const CreateProjectPreview = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useContext(ProjectContext);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  console.log(projectInfo);
  const [subjectError, setSubjectError] = useState('');
  const [minError, setMinError] = useState('');
  const [maxError, setMaxError] = useState('');
  const [jobCateError, setJobCateError] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [locationResults, setLocationResults] = useState([]);
    const locationInputRef = useRef(null);
    const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const freelancerid = selectedUsers.map(user => user.uid);

  const workPlace = [
    'Select a Workplace',
    'Onsite',
    'Remote',
    'Hybrid',
    'Other'
  ];
  const durationUnits = ['day(s)', 'week(s)', 'month(s)', 'year(s)'];

  const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoiY2hpbnh0IiwiYSI6ImNsd3l0enBndTAwY2kyaXIydTZzbTc0MHYifQ.mCHFL_hvwi_U8THCTnUDjQ' });

  const HandleGeoChange = (event) => {
    const { value } = event.target;
  
    handleInputChange(event);
  
    if (value.length >= 1) {
      geocodingClient
        .forwardGeocode({
          query: value,
          autocomplete: true,
          limit: 5,
        })
        .send()
        .then((response) => {
          const { features } = response.body;
          setLocationResults(features);
          setLocationError(null);
        })
        .catch((error) => {
          console.error(error);
          setLocationError('Error fetching location suggestions');
          setLocationResults([]);
        });
    } else {
      setLocationResults([]);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setProjectInfo((prevProject) => ({
      ...prevProject,
      location: suggestion.place_name,
    }));
    setLocationResults([]);
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLocationResults([]);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  const handlePostClick = async (event) => {
    setLoading(true);
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.error('User is not authenticated');
      setLoading(false);
      return;
    }

    const docRef = doc(db, "clients", user.uid);

    let isValid = true;
      
    if (!projectInfo.title) {
      setSubjectError('Project name is required');
      isValid = false;
    } else {
      setSubjectError('');
    }
  
    if (!projectInfo.minInput) {
      setMinError('Min input is required');
      isValid = false;
    } else {
      setMinError('');
    }
  
    if (!projectInfo.maxInput) {
      setMaxError('Max input is required');
      isValid = false;
    } else {
      setMaxError('');
    }
  
    if (!projectInfo.location) {
      setLocationError('Location input is required');
      isValid = false;
    } else {
      setLocationError('');
    }

    if (!projectInfo.category) {
        setJobCateError('Job Category is required');
        isValid = false;
      } else {
        setJobCateError('');
      }

      if (isValid) {
        const projectRef = doc(db, 'projects', projectId);
        console.log('VALIDING!');

        try {
            await updateDoc(projectRef, projectInfo);
            const projectID = projectRef.id;
            console.log('Project updated successfully!',projectID);

            if (user) {
                const promises = freelancerid.map(freelancerid => {
                    const notificationToFreelancerData = {
                        isRead: false,
                        isPop: false,
                        timestamp: new Date(),
                        type: 0,
                        priority: 2,
                        projectID: projectID,
                        clientID: user.uid,
                        to: freelancerid
                    };
                    console.log('Notification UID:', freelancerid);
                    return addDoc(collection(db, 'notifications'), notificationToFreelancerData);
                });

                await Promise.all(promises);
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
                          } else {
                console.error('User is not defined');
                setLoading(false);
            }
        } catch (error) {
            console.error("Error updating document: ", error);
            setLoading(false);
            return;
        } finally {
            setLoading(false);
        }
    } else {
        window.alert('All fields must be filled!');
        setLoading(false);
    }
};

function clearContext() {
  setProjectInfo({}); // or set to initial state
}

const handleInputChange = (event) => {
    setProjectInfo(prevProject => ({
      ...prevProject,
      [event.target.name]: event.target.value,
      
    }));
  };

  const handleDateChange = (date) => {
    setProjectInfo({
      ...projectInfo,
      date: date || null,
    });
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
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchFavouriteFreelancers().then(favouriteFreelancers => {
        setUsers(favouriteFreelancers);
      });
    }
  }, [auth.currentUser]);
  
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

    useEffect(() => {
        const fetchProject = async () => {
          const projectRef = doc(db, 'projects', projectId);
          const projectSnap = await getDoc(projectRef);
      
          if (projectSnap.exists()) {
            const data = projectSnap.data();
            // Convert the date field to a Date object
            if (data.date) {
                data.date = data.date.toDate();
              } else {
                console.log('Date is null');
                data.date = null; // or set it to a default value
              }            setProjectInfo(prevState => ({ ...prevState, ...data }));
            
          } else {
            console.log('No such document!');
          }
        };
      
        fetchProject();
      }, [projectId]);
    

const [responsibilities, setResponsibilities] = useState('');

const handleResKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const value = event.target.value.trim();
    if(value && !projectInfo.jobResponsibilities.includes(value)) {
      setProjectInfo({
        ...projectInfo,
        jobResponsibilities: [...projectInfo.jobResponsibilities, value],
      });
    }
    setResponsibilities('');
  }
};

const handleResDelete = (ResToDelete) => {
  if (projectInfo.jobResponsibilities) {
    setProjectInfo({
      ...projectInfo,
      jobResponsibilities: projectInfo.jobResponsibilities.filter(responsibility => responsibility !== ResToDelete),
    });
  }
};

const [preferredSkills, setSkillInput] = useState('');

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const value = event.target.value.trim();
    if (value && !projectInfo.preferredSkills.includes(value)) {
      setProjectInfo({
        ...projectInfo,
        preferredSkills: [...projectInfo.preferredSkills, value],
      });
    }
    setSkillInput('');
  }
};

const handleDelete = (skillToDelete) => {
  if (projectInfo.preferredSkills) {
    setProjectInfo({
      ...projectInfo,
      preferredSkills: projectInfo.preferredSkills.filter(skill => skill !== skillToDelete),
    });
  }
};

const [keywordsInput, setKeywordsInput] = useState('');

const handleKeywordKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const value = event.target.value.trim();
    if(value && !projectInfo.keywords.includes(value)) {
      setProjectInfo({
        ...projectInfo,
        keywords: [...projectInfo.keywords, value],
      });
  }
  setKeywordsInput('');
}
};

const handleKeywordDelete = (keywordToDelete) => {
  setProjectInfo({
    ...projectInfo,
    keywords: projectInfo.keywords.filter(keyword => keyword !== keywordToDelete),
  });};

  if(loading){
    return <Loading />
  }

  const HandleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };


  const handleCancelSubmission = async (event) => {
    setConfirmationOpen(false);
  };

  return (
    <div className="flex flex-col items-start justify-center">
          <Heading as="h1" className="ml-[25px] tracking-[-0.90px] md:p-5 mt-5">
             Edit Project
          </Heading>
           <hr className="border-gray-700 my-8 w-[93%] mx-auto" />
      <div style={{ backgroundColor: '#69ACC2' }} className="w-screen max-w-full h-8/10">
        <div className="bg-white w-4/5 rounded-md my-12 mx-auto text-left">
        <form className="flex flex-col space-y-4 p-4">

          <div className="flex justify-left mt-4 ml-4 mr-4 w-8/10">
            <div className="w-full">
              <label className="block text-gray-700 text-sm font-bold" htmlFor="subject">Subject: </label>
              <input required style={{ width: '100%' }} className="flex h-[40px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
               id="projectName" name="title" type="text" value={projectInfo.title} onChange={handleInputChange} />
               {subjectError && <p className="text-red-500 text-xs italic">{subjectError}</p>}
            </div>
          </div>
          <div className="flex justify-between w-8/10 m-4">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="workplace">Workplace: </label>
    <select className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="workplace" name="workPlace" onChange={handleInputChange} value={projectInfo.workPlace}>
  {workPlace.map((workPlaceSelect, index) => (
    index === 0 
    ? <option key={index} value="" >{workPlaceSelect}</option>
    : <option key={index} value={workPlaceSelect} >{workPlaceSelect}</option>
  ))}
</select>
 <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Category: </label>
 <select required className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
id="projectCategory" name="category" value={projectInfo.category} onChange={handleInputChange}>
  <option value="">Select a category</option>
  {categories.map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ))}
</select>
    {jobCateError && <p className="text-red-500 text-xs italic">{jobCateError}</p>}

  </div>
  <div className="w-1/2 ">
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="location">Location: </label>
    <input
        ref={locationInputRef}
        required
        className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
        id="locationInput"
        name="location"
        type="text"
        value={projectInfo.location}
        onChange={HandleGeoChange}
      />
      {locationError && <p className="text-red-500 text-xs italic">{locationError}</p>}
      <div className="relative" ref={dropdownRef}>
      {locationResults && locationResults.length > 0 && (
          <ul className="border border-gray-500 bg-white rounded mt-2 absolute z-10 w-full">
            {locationResults.map((result) => (
              <li
                key={result.id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(result)}
              >
                {result.place_name}
              </li>
            ))}
          </ul>
        )}
        </div>
  </div>
</div>
<div className="m-4 w-8/10">
  <div className="w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobDescription">Job Description: </label>
                <textarea style={{ width: '100%' }} className="flex h-[200px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 pt-2"
                id="jobDescription" name="description" value={projectInfo.description} onChange={handleInputChange}></textarea>
            </div>
          </div>
          <div className="flex justify-between w-8/10 m-4">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Project Start Time: </label>
    <DatePicker
  required
  selected={projectInfo.date ? new Date(projectInfo.date) : null}
  onChange={handleDateChange}
  dateFormat="dd/MM/yyyy"
  placeholderText='dd/mm/yyyy'
  className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
/>
    <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="duration">Duration: </label>
    <div className="flex items-center">
      <input className="flex h-[40px] w-3/5 items-center justify-center rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 sm:w-full"
        id="durationEdit" name="duration" value={projectInfo.duration} onChange={handleInputChange} type="text" />
      <select className="flex h-[40px] w-2/5 ml-4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
        id="durationUnitEdit" name="durationUnit" onChange={handleInputChange} value={projectInfo.durationUnit} >
        {durationUnits.map((unit, index) => (
          <option key={index} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
 <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Budget: </label>
 <div className="flex justify-between h-[40px] w-full items-center rounded-[10px] bg-white-A700 px-5 sm:w-full" id="budgetPreview">
  <div className="flex items-center">
    <label className="font-bold mr-2">Min:</label>
    <input required className="flex h-[40px] w-2/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="min" name="minInput" type="number" min="0"  value={projectInfo.minInput} onChange={handleInputChange}/>
      {minError && <p className="pl-2 text-red-500 text-xs italic">{minError}</p>}
  </div>
  <div className="flex items-center">
    <label className="font-bold mr-2">Max:</label>
    <input required className="flex h-[40px] w-2/4 items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
 id="max" name="maxInput" type="number" min="0"  value={projectInfo.maxInput} onChange={handleInputChange} />
      {maxError && <p className="pl-2 text-red-500 text-xs italic"> {maxError}</p>}
  </div>
  <div className="flex items-center w-1/3 select-div">
    <select required className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
      id="currency" name="currencyInput" onChange={handleInputChange} value={projectInfo.currencyInput} >
      <option value="MYR">MYR</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="JPY">JPY</option>
      <option value="CNY">CNY</option>
    </select>
  </div>
</div>
  </div>
  <div className="w-1/2">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workload">Workload: </label>
    <select className="flex h-[40px] w-full items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5"
     id="workload" name="workload" onChange={handleInputChange} value={projectInfo.workload} >
       {workloadOptions.map((workloadOptions, index) => (
        index===0
        ? <option key={index} value="" >{workloadOptions}</option>
        : <option key={index} value={workloadOptions}>
          {workloadOptions}
        </option>
      ))}
    </select>
  </div>
</div>

<div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="responsibilities">
        Job Responsibilities:
      </label>
      <input style={{ width: '100%' }} className="flex h-[40px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 py-2"
        value={responsibilities}
        onChange={e => setResponsibilities(e.target.value)}
        onKeyDown={handleResKeyDown}
        placeholder="Type a responsibility and press Enter"
      />
      <div className="flex flex-wrap">
        {projectInfo.jobResponsibilities.map((responsibilities, index) => (
          <div key={index} className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
            <span>#{responsibilities}</span>
            <button 
              type="button"
              onClick={() => handleResDelete(responsibilities)} 
              className="ml-1 cursor-pointer font-bold items-center"
              style={{ background: 'none', border: 'none' }}
            >
              <IoMdClose />
            </button>
          </div>
        ))}
      </div>
            </div>
          </div>

          <div className="flex justify-left m-4 w-8/10">
            <div className="w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobDescription">Preferred Qualification: </label>
                <textarea style={{ width: '100%' }} className="flex h-[100px] items-center justify-center self-stretch rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 py-2"
                id="qualification" name="preferredQualification" onChange={handleInputChange} value={projectInfo.preferredQualification}></textarea>

</div>
          </div>

          <div className="flex justify-between w-8/10 m-4">
  <div className="w-1/2 mr-8">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractType">Preferred Skill: </label>
    <input 
      className="flex h-[40px] w-full items-center justify-center rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 sm:w-full"
      id="preferredSkills"
      value={preferredSkills}
      onChange={e => setSkillInput(e.target.value)}
        type="text" 
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter"
        />
    <div className="flex flex-wrap">
    {projectInfo.preferredSkills.map((skill, index) => (
  <div key={index} className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
    <span>#{skill}</span>
    <button 
      type="button"
      onClick={() => handleDelete(skill)} 
      className="ml-1 cursor-pointer font-bold items-center"
      style={{ background: 'none', border: 'none' }}
    >
      <IoMdClose />
    </button>
  </div>
))}
</div>
 
 <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="workplace">Keyword: </label>
 <input 
      className="flex h-[40px] w-full items-center justify-center rounded-[10px] border border-solid border-gray-500 bg-white-A700 px-5 sm:w-full"
      id="keywords" 
      value={keywordsInput}
      onChange={e => setKeywordsInput(e.target.value)}
      type="text" 
      onKeyDown={handleKeywordKeyDown}
      placeholder="Type a keyword and press Enter"
    />
    <div className="flex flex-wrap">
      {projectInfo.keywords.map((keyword, index) => (
        <div key={index} className="m-1 bg-blue-200 text-blue-700 p-1 rounded flex items-center justify-center">
          <span>#{keyword}</span>
          <button 
            type="button"
            onClick={() => handleKeywordDelete(keyword)} 
            className="ml-1 cursor-pointer font-bold items-center"
            style={{ background: 'none', border: 'none' }}
          >
            <IoMdClose />
          </button>
        </div>
      ))}
    </div>
 
  </div>
  <div className="w-1/2">
    
  </div>
</div>
<div className="flex flex-col w-1/2">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="favouriteCollaborator">Favourite Collaborator: </label>
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
<div className="flex justify-between w-8/10 m-4" >
  <div className="w-1/4">

  </div>
  <div className="w-1/4">
    <button onClick={handlePostClick} type="postProject" className="w-full bg-[#213E60] hover:bg-[#69ACC2] text-white font-bold py-2 px-4 rounded-lg">
      Edit
    </button>
  </div>
</div>
</div>

          </form>
        </div>
      </div>
        {/* <ConfirmationDialog
        open={confirmationOpen}
        message="Are you sure you want to edit this project?"
        onConfirm={handlePostClick}
        onCancel={handleCancelSubmission}
      /> */}
      {/* {isDialogOpen && (
    <div className="edittedSuccess-overlay">
        <div className="edittedSuccess-content">
            <h2>Project edited successfully!</h2>
            <button onClick={() => setIsDialogOpen(false)}>Close</button>
        </div>
    </div>
)} */}
    </div>
    
  );
};

export default CreateProjectPreview;