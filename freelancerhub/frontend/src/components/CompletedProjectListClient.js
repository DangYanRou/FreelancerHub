import "./styles/CompletedProjectList.css";
import React, { useEffect, useState , useRef} from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
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

  useEffect(() => {
    const fetchFeedback = async () => {
      const feedbackRef = collection(db, "feedback");
      const feedbackQuery = query(feedbackRef, where("from", "==", user.id));
      const feedbackSnapshot = await getDocs(feedbackQuery);

      feedbackSnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

      if (!feedbackSnapshot.empty) {
        const feedbackDoc = feedbackSnapshot.docs[0];
        setFeedback({
          id: feedbackDoc.id,
          ...feedbackDoc.data(),
        });
      }
    };
    fetchFeedback();
  }, [user.id]);

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
      {projects.map((project) => (
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

              {!feedback && (
                <button
                  className="feedbackBtn"
                  onClick={() =>
                    navigate("../client-feedback-page", {
                      state: { freelancerID: project.freelancerID },
                    })
                  }
                >
                  Submit feedback
                </button>
              )}
            </div>
          </div>

          {feedback && (
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
                      {feedback &&
                        feedback.timestamp &&
                        formatDistanceToNow(feedback.timestamp.toDate(), {
                          addSuffix: true,
                        })}
                    </span>
                  </div>
                  <div className="review-body">
                    <span className="review-rating">
                      Rating: {feedback.rating}/5
                    </span>
                    <p className="review-content">{feedback.feedback}</p>
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
