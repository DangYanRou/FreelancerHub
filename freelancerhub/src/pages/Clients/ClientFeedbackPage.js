import React from 'react';
import NavigationBarClient from './NavigationBarClient';
import '../../styles/Clients/FeedbackPage.css';


function ClientFeedbackPage() {
  return (
    <div>
      <NavigationBarClient/>
      <div className='feedbackHeader'>
        <h1>Submit Feedback</h1>
      </div>

      <div className="title">
        <h2>How was your experience?</h2>
        <p className="description">Let your collaborator know your feeling in this collaboration</p>
      </div>
        <p className="question">How satisfied are your in this collaboration?</p>
        <form>
            <div className="rating">
                <div className="rateNumBorder">
                    <div className="rateNum">1</div>
                </div>
                <div className="rateNumBorder">
                    <div className="rateNum">2</div>
                </div>
                <div className="rateNumBorder">
                    <div className="rateNum">3</div>
                </div>
                <div className="rateNumBorder">
                    <div className="rateNum">4</div>
                </div>
                <div className="rateNumBorder">
                    <div className="rateNum">5</div>
                </div>
            </div>
            <textarea className="feedback" placeholder="Please tell us in few words"></textarea>
            <button className="submitFeedbackBtn">Submit</button>
        </form>
    </div>
  );
}export default ClientFeedbackPage;