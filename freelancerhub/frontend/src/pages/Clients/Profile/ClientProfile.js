import React, { useState, useEffect } from "react";
import logo from "../../../Gallery/default-user.jpeg";
import "../../../styles/Clients/ClientProfile.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import ProjectListClient from "../../../components/ProjectListClient";
import AverageReviewBox from "./ClientAverageReviewBox";
import Review from "./ClientProfileReviews";
import { Link } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import {
  doc,
  getDocs,
  setDoc,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../../../components/Loading";

const ClientProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const location = useLocation();
  const clientID = location.state?.clientID;

  //Profile Navigation
  const [showAbout, setShowAbout] = useState(true);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [newInterest, setNewInterest] = useState("");
  const [projects, setProjects] = useState([]);
  const { user } = useUser();
  const [profile, setProfile] = useState({
    location: "",
    companySize: "",
    address: "",
    phone: "",
    about: "",
    profilePicture: logo,
    interests: [],
    companies: [],
  });
  const [formData, setFormData] = useState({ ...profile });

  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyImage, setNewCompanyImage] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user || clientID) {
          const uid = clientID || user?.uid;

          const q = query(collection(db, "clients"), where("uid", "==", uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setProfile({
              ...userData,
              profilePicture: userData.profilePicture || logo,
              name: userData.name,
              username: userData.username,
              interests: userData.interests || [],
              companies: userData.companies || [],
            });
            setFormData({
              ...userData,
              profilePicture: userData.profilePicture || logo,
              name: userData.name,
              username: userData.username,
              interests: userData.interests || [],
              companies: userData.companies || [],
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
        }
      } catch (error) {
        console.error("User is not logged in");
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = query(
          collection(db, "projects"),
          where("clientID", "==", user.id)
        );
        console.log("client:" + user.id); // Use the correct method for collection reference
        const snapshot = await getDocs(projectsRef); // Fetch the documents
        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user.id]);

  const handleProfileNavClick = (section) => {
    switch (section) {
      case "about":
        setShowAbout(true);
        setShowCompanies(false);
        setShowProjects(false);
        setShowReviews(false);
        break;
      case "affiliatedCompanies":
        setShowAbout(false);
        setShowCompanies(true);
        setShowProjects(false);
        setShowReviews(false);
        break;
      case "projectPosted":
        setShowAbout(false);
        setShowCompanies(false);
        setShowProjects(true);
        setShowReviews(false);
        break;
      case "reviews":
        setShowAbout(false);
        setShowCompanies(false);
        setShowProjects(false);
        setShowReviews(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

    if (user) {
      const docRef = doc(db, "clients", user.uid);
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
        setDoc(docRef, sanitizedFormData, { merge: true }); // Use merge to update the document
        setProfile(sanitizedFormData);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating document: ", error);
      } finally {
        setLoading(false);
      }

      const updatedProfile = {
        ...profile,
        aboutDescription: sanitizedFormData.aboutDescription,
      };
      setProfile(updatedProfile);
      setIsEditing(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleAddInterest = () => {
    if (newInterest.trim() !== "") {
      const updatedInterests = [...formData.interests, newInterest];
      setFormData((prevData) => ({
        ...prevData,
        interests: updatedInterests,
      }));
      updateInterestsInDatabase(updatedInterests);
      setNewInterest("");
    } else {
      alert("Interest cannot be empty!");
    }
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = formData.interests.map((interest, i) =>
      i === index ? value : interest
    );
    setFormData({ ...formData, interests: updatedInterests });
    updateInterestsInDatabase(updatedInterests);
  };

  const handleRemoveInterest = (index) => {
    const updatedInterests = formData.interests.filter((_, i) => i !== index);
    setFormData({ ...formData, interests: updatedInterests });
    updateInterestsInDatabase(updatedInterests);
  };

  const updateInterestsInDatabase = async (updatedInterests) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const docRef = doc(db, "clients", user.uid);
        await setDoc(docRef, { interests: updatedInterests }, { merge: true });
        // Update the profile state after updating the database
        setProfile((prevProfile) => ({
          ...prevProfile,
          interests: updatedInterests,
        }));
      } catch (error) {
        console.error("Error updating interests: ", error);
      }
    }
  };

  const handleAddCompany = () => {
    if (newCompanyName.trim() === "") {
      alert("Company name cannot be empty!");
      return;
    }
    const newCompany = {
      name: newCompanyName,
      image: newCompanyImage ? URL.createObjectURL(newCompanyImage) : null,
    };

    setFormData((prevData) => ({
      ...prevData,
      companies: [...prevData.companies, newCompany], // Add the new company to the existing companies array
    }));
    setCompanies([...companies, newCompany]);
    setNewCompanyName("");
    setNewCompanyImage(null);
    updateCompaniesInDatabase([...(formData.companies || []), newCompany]);
  };

  const handleRemoveCompany = (index) => {
    if (formData.companies) {
      const updatedCompanies = formData.companies.filter((_, i) => i !== index);
      setFormData({ ...formData, companies: updatedCompanies });
      updateCompaniesInDatabase(updatedCompanies);
    }
  };

  const updateCompaniesInDatabase = async (updatedCompanies) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const docRef = doc(db, "clients", user.uid);
        await setDoc(docRef, { companies: updatedCompanies }, { merge: true });
        setProfile((prevProfile) => ({
          ...prevProfile,
          companies: updatedCompanies,
        }));
      } catch (error) {
        console.error("Error updating companies: ", error);
      }
    }
  };

  if (loading) {
    return <Loading />; // Add your spinner or loading message here
  }

  const ProjectModal = ({ isOpen, onClose, project }) => {
    if (!isOpen || !project) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="jl-view-project-header">View Project</h2>
            <button className="jl-close-btn" onClick={onClose}>
              <GrFormClose />
            </button>
          </div>
          <ProjectDetails project={project} />
        </div>
      </div>
    );
  };
  const ProjectDetails = ({ project }) => {
    if (!project) return null;
    const formattedDate = project.date
      ? format(project.date.toDate(), "dd/MM/yyyy")
      : "";

    return (
      <div className="project-details">
        <h2 id="detail-title">{project.title}</h2>
        <Link
          to="/freelancers/client-temporary-profile"
          className="hover-profileLink"
        >
          {project.client}
        </Link>
        <p id="category">{project.category}</p>
        <p>
          <FaLocationDot className="icon-style" />
          {project.location}
        </p>
        <p>
          <MdOutlineAttachMoney size={20} className="icon-style2" />
          {project.minInput}-{project.maxInput} {project.currencyInput}/project
        </p>
        <p>
          <BiTimeFive size={20} className="icon-style2" />
          {project.duration} {project.durationUnit}
        </p>
        <p>Starting from: {formattedDate}</p>
        <h3 id="about-the-project">About the Project:</h3>
        <p>{project.description}</p>
        <div>
          <h3 id="key-requirement">Job Responsibilities:</h3>
          <ul className="list">
            {(project.jobResponsibilities ?? []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <h3 id="preferredQualification">Preferred Qualification:</h3>
        <p>{project.preferredQualification}</p>
        <div>
          <h3 id="key-requirement">Preferred Skills:</h3>
          <ul className="list">
            {(project.preferredSkills ?? []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="ClientProfile">
      <div className="client_content">
        <div className="upperProfile">
          <div className="profileCard">
            <div className="pic_container">
              {isEditing ? (
                <>
                  <img
                    src={formData.profilePicture}
                    alt="profile picture"
                  ></img>
                  <input
                    style={{ display: "block", paddingLeft: "30px" }}
                    type="file"
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <img src={profile.profilePicture} alt="profile picture"></img>
              )}
            </div>
            <div className="profile_text" style={{ width: 400 }}>
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
                    <label htmlFor="companySize">Company Size</label>
                    <input
                      type="text"
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
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
                  {!formData.name ? (
                    <h2 className="no_details">No details added</h2>
                  ) : (
                    <div className="name-location">
                      <h2 className="name">{formData.name}</h2>
                      <div className="location">
                        <FaMapMarkerAlt className="markerIcon" />
                        {!formData.location ? (
                          <h2 className="no_details">No details added</h2>
                        ) : (
                          <span>{formData.location}</span>
                        )}
                      </div>
                    </div>
                  )}
                  <p style={{ color: "grey" }}>Username: {formData.username}</p>
                  {!formData.companySize && !formData.phone ? (
                    <h2 className="no_details">No details added</h2>
                  ) : (
                    <>
                      {formData.companySize ? ( // No need for && here
                        <p className="job">
                          Company Size: {formData.companySize}
                        </p>
                      ) : null}{" "}
                      {/* Optional: Render nothing if companySize is falsy */}
                      <p className="address" style={{ fontSize: 14 }}>
                        {formData.address}
                      </p>
                      {formData.phone ? ( // No need for && here
                        <p className="phone" style={{ fontSize: 14 }}>
                          Phone: {formData.phone}
                        </p>
                      ) : null}{" "}
                      {/* Optional: Render nothing if phone is falsy */}
                    </>
                  )}
                </>
              )}
            </div>
            {!isEditing && !clientID && (
              <button onClick={handleEditClick}>
                <MdOutlineModeEdit /> Edit Profile
              </button>
            )}
            {isEditing && (
              <button type="submit" form="profileForm">
                Save
              </button>
            )}
            {isEditing && (
              <button type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            )}
          </div>
        </div>
        <div className="rateContainer">
          <div className="rate">
            <AverageReviewBox feedbacks={feedbacks} />
          </div>
        </div>
      </div>
      <div className="lowerProfile">
        <nav className="profileNav">
          <div className="navigation">
            <ul className="nav-links">
              <li>
                <a href="#about" onClick={() => handleProfileNavClick("about")}>
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="#affiliatedCompanies"
                  onClick={() => handleProfileNavClick("affiliatedCompanies")}
                >
                  Affiliated Companies
                </a>
              </li>
              <li>
                <a
                  href="#projectPosted"
                  onClick={() => handleProfileNavClick("projectPosted")}
                >
                  Project Posted
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={() => handleProfileNavClick("reviews")}
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="Card2">
          <div id="about" style={{ display: showAbout ? "block" : "none" }}>
            <p className="about_text">Get To Know More</p>
            <h2 className="title">About Me</h2>
            {isEditing ? (
              <form id="card2Form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="aboutDescription">
                    Share more about yourself
                  </label>
                  <textarea
                    id="aboutDescription"
                    name="aboutDescription"
                    value={formData.aboutDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="clientAbout_details">
                  <h3 style={{ fontSize: 20, fontWeight: 500 }}>Interest</h3>
                  <div className="interest_container"></div>
                  <div className="form-group">
                    {formData.interests.map((interest, index) => (
                      <div key={index} className="interest-item">
                        <input
                          type="text"
                          value={interest}
                          onChange={(e) =>
                            handleInterestChange(index, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <div className="interest-item">
                      <input
                        type="text"
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                      />
                      <button type="button" onClick={handleAddInterest}>
                        Add Interest
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <div className="about_container">
                  {!profile.aboutDescription ? (
                    <h2 className="no_details" style={{ textAlign: "center" }}>
                      Edit now
                    </h2>
                  ) : (
                    <p>{profile.aboutDescription}</p>
                  )}
                </div>
                <div className="clientAbout_details">
                  <h3 style={{ fontSize: 20, fontWeight: 500 }}>Interest</h3>
                  {profile.interests.length === 0 ? (
                    <h2 className="no_details">No interest added</h2>
                  ) : (
                    <div className="interest_container">
                      {(profile.interests || []).map((interest, index) => (
                        <div key={index} className="interest_details">
                          <h3 className="interest_name">{interest}</h3>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            id="affiliatedCompanies"
            style={{ display: showCompanies ? "block" : "none" }}
          >
            <h2 className="title">Affiliated Companies</h2>
            <div className="projects_container">
              {isEditing ? (
                <div>
                  <p style={{ textAlign: "center" }}>
                    You can only add up to 3 companies.
                  </p>
                  {(formData.companies ?? []).map((company, index) => (
                    <div key={index} className="about_details">
                      <div className="btn_container">
                        <img src={company.image} alt={company.name} />
                      </div>
                      <h4 className="company_name" style={{ fontWeight: 500 }}>
                        {company.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveCompany(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {formData.companies.length < 3 && (
                    <div className="add_company_form">
                      <input
                        style={{ marginLeft: "60px" }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewCompanyImage(e.target.files[0])}
                      />
                      <input
                        type="text"
                        value={newCompanyName}
                        onChange={(e) => setNewCompanyName(e.target.value)}
                        placeholder="Enter company name"
                      />
                      <button type="button" onClick={handleAddCompany}>
                        Add Company
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="companiesDisplay">
                  {formData.companies.length === 0 ? (
                    <h2 className="no_details" style={{ textAlign: "center" }}>
                      No company added
                    </h2>
                  ) : (
                    <div>
                      {(formData.companies ?? []).map((company, index) => (
                        <div key={index} className="about_details">
                          <div className="btn_container">
                            <img src={company.image} alt={company.name} />
                          </div>
                          <h4
                            className="company_name"
                            style={{ fontWeight: 500 }}
                          >
                            {company.name}
                          </h4>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            id="projectPosted"
            style={{ display: showProjects ? "block" : "none" }}
          >
            <h2 className="title">Project Posted</h2>
            <ProjectListClient
              projects={projects}
              onProjectClick={handleProjectClick}
            />
            <ProjectModal
              isOpen={selectedProject !== null}
              onClose={handleCloseModal}
              project={selectedProject}
            />
          </div>
          <div id="reviews" style={{ display: showReviews ? "block" : "none" }}>
            <h2 className="title">Reviews</h2>
            <Review feedbacks={feedbacks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
