import "./styles/CompletedProjectList.css";
import React, { useEffect, useState , useRef} from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc,onSnapshot } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { getDocs, query, where } from "firebase/firestore";
import { useUser } from "../context/UserContext";

const CompletedProjectListClient = ({ projects }) => {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState({});
  const [hover, setHover] = useState({});
  const { user } = useUser();
  const [feedback, setFeedback] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const feedbackRef = useRef(null);
  const [feedbackMaxHeight, setFeedbackMaxHeight] = useState({});

  const toggleFavourite = (projectId) => {
    setFavourites((prev) => ({
      ...prev,
      [projectId]: !prev[projectId], // Toggle true/false upon click
    }));
  };

  const toggleFeedback = (projectId) => {
    setShowFeedback((prev) => {
      const newState = { ...prev, [projectId]: !prev[projectId] };
      if (newState[projectId]) {
        setFeedbackMaxHeight((prevMaxHeight) => ({
          ...prevMaxHeight,
          [projectId]: `${feedbackRef.current.scrollHeight}px`,
        }));
      }
      return newState;
    });
  };

   //sort projects
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.completedDate && b.completedDate) {
      return b.completedDate.toDate() - a.completedDate.toDate();
    } else if (a.completedDate) {
      return -1; // a has a completedDate, but b doesn't, so a goes first
    } else if (b.completedDate) {
      return 1; // b has a completedDate, but a doesn't, so b goes first
    } else {
      return 0; // neither a nor b have a completedDate, so they're considered equal
    }
  });

  //fetch feedback
  useEffect(() => {
    const feedbackRef = collection(db, "feedback");
    const unsubscribes = []; 
  
    projects.forEach((project) => {
      const feedbackQuery = query(feedbackRef, where("from", "==", user.id), where ("projectID", "==", project.id));
      
      // Set up a real-time listener
      const unsubscribe = onSnapshot(feedbackQuery, (snapshot) => {
        if (!snapshot.empty) {
          const feedbackDoc = snapshot.docs[0];
          // Store the feedback in the state using the project ID as the key
          setFeedback(prev => ({
            ...prev,
            [project.id]: {
              id: feedbackDoc.id,
              ...feedbackDoc.data(),
            },
          }));
        }
      });
  
      unsubscribes.push(unsubscribe); // Store the unsubscribe function
    });
  
    // Return a cleanup function that calls all the unsubscribe functions
    return () => {
      unsubscribes.forEach(unsubscribe => unsubscribe());
    };
  }, [user.id, projects]);

  console.log("Your Feedback = " , feedback);

  const addFavouriteFreelancer = async (freelancerID, clientID) => {
    const freelancerRef = doc(db, "freelancers", freelancerID);
    const freelancerSnap = await getDoc(freelancerRef);

    if (freelancerSnap.exists()) {
      const freelancerData = freelancerSnap.data();

      const favouriteFreelancerRef = doc(collection(db, "favouriteFreelancer"));
      await setDoc(favouriteFreelancerRef, {
        ...freelancerData,
        clientID,
      });
    } else {
      console.log("No such freelancer!");
    }
  };

  return (
    <div className="jl-centered-container">
      {sortedProjects.map((project) => (
        <div className="card" key={project.id}>
          <h2>{project.title}</h2>
          <a href="#" className="hover-profileLink">
            {project.client}
          </a>
          <p id="category">{project.category}</p>
          <p>
            <FaLocationDot className="icon-style" />
            {project.location}
          </p>
          <p>
            <MdOutlineAttachMoney size={20} className="icon-style2" />
            {project.minInput}-{project.maxInput} {project.currencyInput}
            /project
          </p>
          <p>
            <BiTimeFive size={20} className="icon-style2" />
            {project.duration} {project.durationUnit}
          </p>
          <p className="apply-status">{project.status}</p>
          <div className="bottom-row">
            <p style={{ flexGrow: 1 }}>
              Completed on:{" "}
              <span className="complete-date">
                {project.completedDate
                  ? project.completedDate.toDate().toLocaleDateString("en-GB")
                  : "N/A"}
              </span>
            </p>
            <div className="buttonContainer">
              <button
                className="favouriteBtn"
                onClick={() => {
                  toggleFavourite(project.id);
                  addFavouriteFreelancer(
                    project.freelancerID,
                    project.clientID
                  );
                }}
                onMouseEnter={() =>
                  setHover((prev) => ({ ...prev, [project.id]: true }))
                }
                onMouseLeave={() =>
                  setHover((prev) => ({ ...prev, [project.id]: false }))
                }
                style={{
                  backgroundColor: favourites[project.id]
                    ? "#4CAF50"
                    : "#69acc2",
                  color: hover[project.id] ? "#213e60" : "#fff",
                  transition: "color 0.3s ease",
                }}
              >
                {favourites[project.id] ? (
                  <div className="favourite-collaborator">
                    <span className="icon-text">
                      <AiOutlineCheckCircle /> Favourite Collaborator
                    </span>
                  </div>
                ) : (
                  "+ Favourite Collaborator"
                )}
              </button>

              {!feedback[project.id] && (
                <button
                  className="feedbackBtn"
                  onClick={() =>
                    navigate("../client-feedback-page", {
                      state: { freelancerID: project.freelancerID , projectID: project.id},
                    })
                  }
                >
                  Submit feedback
                </button>
              )}
            </div>
          </div>

          {feedback[project.id] && (
            <>
              <div
                className="feedback-toggle"
                onClick={() => toggleFeedback(project.id)}
              >
                <span>View your feedback</span>
                {showFeedback[project.id] ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </div>

              <div
                ref={feedbackRef}
                className="review-container"
                style={{
                  maxHeight: showFeedback[project.id]
                    ? feedbackMaxHeight[project.id]
                    : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease-in-out",
                }}
              >
                <div className="review-card">
                  <div className="review-header">
                    <h3>Your feedback</h3>
                    <span className="review-date">
                      {feedback[project.id] &&
                        feedback[project.id].timestamp &&
                        formatDistanceToNow(feedback[project.id].timestamp.toDate(), {
                          addSuffix: true,
                        })}
                    </span>
                  </div>
                  <div className="review-body">
                    <span className="review-rating">
                      Rating: {feedback[project.id].rating}/5
                    </span>
                    <p className="review-content">{feedback[project.id].feedback}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompletedProjectListClient;
