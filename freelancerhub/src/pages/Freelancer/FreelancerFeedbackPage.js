import React, { useState } from 'react';
import NavigationBarFreelancer from './NavigationBarFreelancer';
import '../../styles/Clients/FeedbackPage.css';

function FreelancerFeedbackPage() {
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');  // Manage textarea input
  const [showSubmitted, setShowSubmitted] = useState(false);

  const handleRating = (num) => {
    setRating(num);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating && feedback) {  // Check both rating and feedback are provided
      setShowSubmitted(true);
    } else {
      alert('Please provide both a rating and your feedback!');
    }
  };

  return (
    <div>
      <NavigationBarFreelancer/>
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">
          <h2>How was your experience?</h2>
          <p className="description">Let your collaborator know your feelings in this collaboration</p>
        </div>
        <p className="question">How satisfied are you in this collaboration?</p>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className={`rateNumBorder ${rating === num ? 'selected' : ''}`} 
            onClick={() => handleRating(num)}>
                <div className="rateNum">{num}</div>
            </div>
          ))}
        </div>
        {rating && <p>You have rated {rating} out of 5.</p>}
        <textarea
          className="feedback"
          placeholder="Please tell us in a few words"
          value={feedback}
          onChange={handleFeedbackChange}
         
        ></textarea>
        <button className="submitFeedbackBtn" type="submit">Submit</button>
        {showSubmitted && <div className="notification">Your feedback has been submitted!</div>}
      </form>
    </div>
  );
}

export default FreelancerFeedbackPage;
