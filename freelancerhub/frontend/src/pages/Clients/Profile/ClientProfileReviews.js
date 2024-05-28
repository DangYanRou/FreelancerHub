import React from "react";
import "../../../styles/Clients/ClientProfile.css";

function ClientProfileReviews() {
  const reviews = [
    {
      name: "Agnes",
      feedback: "Nice Work! Keep it up",
      rating: 5,
      timestamp: "2021-10-10",
    },
    {
      name: "Bill Gates",
      feedback:
        "Very responsive and work is completed on time. Definitely will work with you again soon!",
      rating: 4,
      timestamp: "2021-12-01",
    },
  ];

  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <div className="review-card" key={index}>
          <div className="review-header">
            <h3>{review.name}</h3>
            <span className="review-date">{review.timestamp}</span>
          </div>
          <div className="review-body">
            <div className="review-rating">
              <p>
              Rating : {review.rating} / 5
              </p>
            </div>
            <p>{review.feedback}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClientProfileReviews;
