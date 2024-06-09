import React, { useState, useEffect } from 'react';
import "../../../styles/Freelancers/FreelancerProfile.css";
import logo from "../../../Gallery/default-user.jpeg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineModeEdit, MdSchool, MdVerified } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import AverageReviewBox from "./FreelancerAverageReviewBox";
import Heading from '../../../components/Heading';
import { doc, getDocs, setDoc, collection, where, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from '../../../components/Loading';
import Review from "./FreelancerProfileReviews";
import ProjectsCompleted from "../Project/ProjectCompletedPage"
import { useLocation } from 'react-router-dom';

const FreelancerProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  //Retrieve UserType
  const storedUserData = localStorage.getItem("user");
  const userData = JSON.parse(storedUserData);
  const userType = userData.type;
  console.log("User type:", userType);

  //Profile Navigation
  const [showAbout, setShowAbout] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showButton, setShowButton] = useState(true);
  
  const [profile, setProfile] = useState({
    location: "",
    job: "",
    phone: "",
    about: "",
    profilePicture: logo,
    skills: [],
    educations: [],
  });
  const [formData, setFormData] = useState({ ...profile });

  //YR nav used
  const location = useLocation();
  const freelancerID = location.state?.freelancerID;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user || freelancerID) {
          const uid = freelancerID || user?.uid;
          console.log("uid,", uid);

          const q = query(collection(db, "freelancers"), where("uid", "==", uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setProfile({
              ...userData,
              username: userData.username,
              profilePicture: userData.profilePicture || logo,
              skills: userData.skills || [],
              educations: userData.educations || [],
            });
            setFormData({
              ...userData,
              username: userData.username,
              profilePicture: userData.profilePicture || logo,
              skills: userData.skills || [],
              educations: userData.educations || [],
            });

            //fetch feedbacks
            const feedbacksCollection = collection(db, "feedback");
            const feedbacksQuery = query(
              feedbacksCollection,
              where("to", "==", uid)
            );
            const feedbacksSnapshot = await getDocs(feedbacksQuery);
            const feedbacksData = feedbacksSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setFeedbacks(feedbacksData);
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("User is not logged in");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [freelancerID]);

  const handleProfileNavClick = (section) => {
    if (section === 'about') {
      setShowAbout(true);
      setShowProjects(false);
      setShowReviews(false);

      if(userType==="client"){
        setShowButton(false);
        console.log("User type:", userType);
      }
    }
    else if (section === 'projects') {
      setShowAbout(false);
      setShowProjects(true);
      setShowReviews(false);
      if(userType==="client"){
        setShowButton(false);
        console.log("User type:", userType);
      }
    }
    else if (section === 'reviews') {
      setShowAbout(false);
      setShowProjects(false);
      setShowReviews(true);
      if(userType==="client"){
        setShowButton(false);
        console.log("User type:", userType);
      }
    }
    else
      return;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Update profile in Firestore
    const auth = getAuth();
    const user = auth.currentUser;

    // Validation for skills
    for (const skill of formData.skills) {
      if (!skill.name || !skill.level) {
        alert('Please fill out all fields for skills.');
        setLoading(false);
        return;
      }
    }
    if (user) {
      const docRef = doc(db, "freelancers", user.uid);
      // Sanitize formData to remove any undefined fields
      const sanitizedFormData = { ...formData };

      // Remove any fields that are undefined
      for (const key in sanitizedFormData) {
        if (sanitizedFormData[key] === undefined) {
          delete sanitizedFormData[key];
        }
      }

      // Log the sanitized formData to check for any remaining issues
      console.log("Sanitized formData: ", sanitizedFormData);

      try {
        setDoc(docRef, sanitizedFormData, { merge: true });
        setProfile(sanitizedFormData);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(profile); // Revert the changes by resetting the form data to the original profile
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddEducation = () => {
    const lastEducation = formData.educations[formData.educations.length - 1];
    if (lastEducation === '') {
      alert("Please fill in your education!");
    } else {
      setFormData({
        ...formData,
        educations: [...formData.educations, ''],
      });
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = formData.educations.filter((_, i) => i !== index);
    setFormData({ ...formData, educations: updatedEducations });
  };

  const updateEducationInDatabase = async (updatedEducation) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const docRef = doc(db, "freelancers", user.uid);
        await setDoc(docRef, { educations: updatedEducation }, { merge: true });
        // Update the profile state after updating the database
        setProfile((prevProfile) => ({ ...prevProfile, educations: updatedEducation }));
      } catch (error) {
        console.error("Error updating education: ", error);
      }
    }
  };

  const handleEducationChange = (index, value) => {
    const updatedEducation = formData.educations.map((education, i) =>
      i === index ? value : education
    );
    setFormData({ ...formData, educations: updatedEducation });
    updateEducationInDatabase(updatedEducation);
  };

  const handleAddSkill = () => {
    // Check if the last skill in the list is empty
    const lastSkill = formData.skills[formData.skills.length - 1];

    if (lastSkill && !lastSkill.name) {
      alert('Please fill out the name of the current skill before adding a new one.');
      return;
    }

    // Add the new skill
    const newSkill = { name: '', level: '' };
    setFormData({
      ...formData,
      skills: [...formData['skills'], newSkill],
    });
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData['skills'].filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="FreelancerProfile">
          <Heading as="h1" className="tracking-[-0.90px]" style={{ fontSize: '26px', marginLeft: '40px' }}>Profile</Heading>
  
           {/* Line divider */}
           <hr className="border-gray-700 my-8 w-[95%] mx-auto" />
      <div className="content">
        <div className='leftProfile'>
          <div className='profile'>
            <div className="pic_container">
            {isEditing ? (
              <>
              <img src={formData.profilePicture} alt="profile picture"></img>
              <input style={{display: "block", paddingLeft: "30px"}} type="file" onChange={handleFileChange} />
              </>
            ) : (
              <img src={profile.profilePicture} alt="profile picture"></img>
            )}
            </div>
            <div className="profile_text" style={{textAlign:"center"}}>
              {isEditing ? (
                <form id="profileForm" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="job">Job</label>
                    <input
                      type="text"
                      id="job"
                      name="job"
                      value={formData.job}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              ) : (
                <>
                {!profile.name? (
                  <h2 className='no_details' >No details added</h2>
                ) : (
                  <div className="name-location" style={{alignContent:"center",justifyContent:"center"}}>
                    <h2 className="name">{profile.name}</h2>
                    <div className="location">
                      <FaMapMarkerAlt className="markerIcon" />
                      <span>{profile.location}</span>
                    </div>
                  </div>
                )}         
              <p style={{color:"grey"}}>Username: {profile.username}</p>
                  <p className="job">{profile.job}</p>
                  <p className="address" style={{ fontSize: 14 }}>
                    {profile.address}
                  </p>
                  {!profile.phone? (
                    <h2 className='no_details' >No details added</h2>
                  ) : (
                    <p className="phone" style={{ fontSize: 14 }}>
                      Phone: {profile.phone}
                    </p>
                  )}
                </>
              )}
            </div>
            {!isEditing && showButton && !freelancerID &&(
              <button onClick={handleEditClick}>
                <MdOutlineModeEdit/>Edit Profile</button>
            )}
            {isEditing && (
              <button type="submit" form="profileForm">Save</button>
            )}
            {isEditing && (
              <button type="button" onClick={handleCancelClick}>Cancel</button>
            )}
          </div>
          <div className='rating'>
            <div className="rate"><AverageReviewBox feedbacks={feedbacks}/></div>
          </div>
        </div>
        <div className='lowerProfile'>
          <nav className='profileNav'>
              <div className="navigation">
                  <ul className="nav-links">
                    <li><a href="#about" onClick={() => handleProfileNavClick('about')}>About Me</a></li>
                    <li><a href="#projects" onClick={() => handleProfileNavClick('projects')}>Projects</a></li>
                    <li><a href="#reviews" onClick={() => handleProfileNavClick('reviews')}>Reviews</a></li>
                  </ul>
              </div>
          </nav>
          <div className='Card2'>
            <div id="about" style={{ display: showAbout ? 'block' : 'none' }}>
              <p className='about_text'>Get To Know More</p>
              <h2 className='title'>About Me</h2>
              {isEditing ? (
                <form onSubmit={handleFormSubmit}>
                  <label htmlFor="aboutDescription">Share more about yourself</label>
                  <textarea
                    id="aboutDescription"
                    name="aboutDescription"
                    value={formData.aboutDescription}
                    onChange={handleInputChange}
                  />
                  <div className='about_container'>
                    <div id= "education_entry" className='about_details'>
                      <MdSchool className='aboutIcon' /><h3>Education</h3>
                      {formData.educations.map((education, index) => (
                        <div key={index}>
                          <input
                            type="text"
                            value={education}
                            onChange={(e) => handleEducationChange(index, e.target.value)}
                          />
                          <button className="add_education" type="button" onClick={() => handleRemoveEducation(index)}>Remove</button>
                        </div>
                      ))}
                      <button type="button" onClick={handleAddEducation}>Add Education</button>
                    </div>
                    <div className='about_details'>
                      <GrAchievement className='aboutIcon' /><h3>Skills</h3>
                        <div className='experience_content'>
                          {formData.skills && formData.skills.map((skill, index) => (
                            <div key={index} className='experience_description'>
                              <MdVerified className='verifiedIcon' />
                              <input
                                type="text"
                                value={skill.name}
                                placeholder="Skill"
                                onChange={(e) => {
                                  const updatedSkills = [...formData.skills];
                                  updatedSkills[index].name = e.target.value;
                                  setFormData({ ...formData, skills: updatedSkills });
                                }}
                              />
                              <input
                                type="text"
                                value={skill.level}
                                placeholder='Level'
                                onChange={(e) => {
                                  const updatedSkills = [...formData.skills];
                                  updatedSkills[index].level = e.target.value;
                                  setFormData({ ...formData, skills: updatedSkills });
                                }}
                              />
                              <button type="button" onClick={() => handleRemoveSkill(index)}>Remove</button>
                            </div>
                          ))}
                          <button type="button" onClick={() => handleAddSkill()}>Add Skill</button>
                        </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  {!profile.aboutDescription? (
                    <h2 className='no_details' style={{textAlign:"center"}}>Edit now</h2>
                  ) : (
                    <p>{profile.aboutDescription}</p>
                  )}
                  <div className='about_container'>
                  <div className='about_details'>
                    <MdSchool className='aboutIcon' /><h3>Education</h3>
                    {profile.educations.length === 0 ? (
                      <h2 className='no_details'>No Education added</h2>
                    ) : (
                      profile.educations.map((education, index) => (
                          <p key={index} className='education_text'>{education}</p>
                      ))
                  )}
                  </div>
                  <div id="experience_box" className='about_details'>
                  <GrAchievement className='aboutIcon' /><h3>Skills</h3>
                  <div className='experience_column'>
                  {profile.skills.length === 0 ? (
                      <h2 className='no_details'>No Skills added</h2>
                    ) : (
                      <div className='experience_content'>
                        {formData.skills && formData.skills.map((skill, index) => (
                          <div key={index} className='experience_description'>
                            <MdVerified className='verifiedIcon' />
                            <p>{skill.name}</p>
                            <p className='experience_detail'>{skill.level}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                  </div>
                </div>
              )}
            </div>
            <div id="projects" style={{ display: showProjects ? 'block' : 'none' }}>
              <p className='projects_text'>Browse My Recents</p>
              <ProjectsCompleted/>
            </div> 
            <div
              id="reviews"
              style={{ display: showReviews ? "block" : "none" }}
            >
              <h2 className="title">Reviews</h2>
              <Review feedbacks={feedbacks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreelancerProfile;
