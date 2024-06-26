import React, { useState, useEffect } from "react";
import "../../../styles/Clients/ClientProfile.css";
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
import { formatDistanceToNow } from "date-fns";

const ClientProfileReviews = ({ feedbacks }) => {
  const [feedbacksWithUserNames, setFeedbacksWithUserNames] = useState([]);

  const fetchUserName = async (uid) => {
    const userSnapshot = await getDocs(
      query(collection(db, "clients"), where("uid", "==", uid))
    );
    if (!userSnapshot.empty) {
      return userSnapshot.docs[0].data().username;
    }
    return "no username found";
  };

  useEffect(() => {
    const fetchUserNames = async () => {
      const updatedFeedbacks = await Promise.all(
        feedbacks.map(async (feedback) => {
          const name = await fetchUserName(feedback.from);
          return { ...feedback, userName: name };
        })
      );
      setFeedbacksWithUserNames(updatedFeedbacks);
    };
    fetchUserNames();
  }, [feedbacks]);

  return (
    <div className="reviews-container">
      {feedbacksWithUserNames.length > 0 ? (
       feedbacksWithUserNames
        .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
        .map((feedback, index) => (
          <div className="review-card" key={feedback.id}>
            <div className="review-header">
              <h3>{feedback.userName}</h3>
              <span className="review-date">
                {formatDistanceToNow(feedback.timestamp.toDate(), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="review-body">
              <div className="review-rating">
                <p>Rating : {feedback.rating} / 5</p>
              </div>
              <p>{feedback.feedback}</p>
            </div>
          </div>
        ))
      ) : ( 
        <div className="no-reviews">
          <h2>No reviews available</h2>
        </div>
      )}
    </div>
  );
};
export default ClientProfileReviews;
