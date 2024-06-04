import React, { useState } from "react";
import "../../../styles/Clients/FeedbackPage.css";
import { db, auth } from '../../../firebase';
import { collection, addDoc, serverTimestamp, FieldValue } from 'firebase/firestore';
import { useUser } from '../../../context/UserContext';
import { useLocation , useNavigate } from 'react-router-dom';
import Loading from "../../../components/Loading";

function ClientFeedbackPage() {
  const user = auth.currentUser;
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState(""); // Manage textarea input
  const [showSubmitted, setShowSubmitted] = useState(false);
  const location = useLocation();
  const freelancerId = location.state.freelancerID;
  const projectId = location.state.projectID;
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);

 console.log('freelancerid =' , freelancerId);
  const handleRating = (num) => {
    setRating(num);
   
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rating && feedback) {
      setShowSubmitted(true);
  
      try {
        setLoading("submitting");
        await addDoc(collection(db, "feedback"), {
          from: user.uid,
          to: freelancerId,
          rating: rating,
          feedback: feedback,
          projectID: projectId,
          timestamp: serverTimestamp(),
        });
        console.log("Feedback submitted!");
        navigate('/clients/project-completed'); 
      } catch (error) {
        console.error("Error submitting feedback: ", error);
      }finally{
        setLoading(false);
      }
    } else {
      alert("Please provide both a rating and your feedback!");
    }
  };

  return (
    <div className="FeedbackPage">
      {loading && <Loading text={loading}/>}
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          <h2>How was your experience?</h2>
          <p className="description">
            Let your collaborator know your feelings in this collaboration
          </p>
        </div>
        <p className="question">How satisfied are you in this collaboration?</p>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`rateNumBorder ${rating === num ? "active" : ""}`}
              onClick={() => setRating(num)}
            >
              <div className="rateNum">{num}</div>
            </div>
          ))}
        </div>
        {rating && (
          <p className="ratedNoti">You have rated {rating} out of 5.</p>
        )}
        <textarea
          className="feedback"
          placeholder="Please tell us in a few words"
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
        <button className="submitFeedbackBtn" type="submit">
          Submit
        </button>
        {showSubmitted && (
          <div className="notification">Your feedback has been submitted!</div>
        )}
      </form>
    </div>
  );
}

export default ClientFeedbackPage;
