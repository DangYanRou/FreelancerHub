import React from 'react';
import '../../styles/AverageReviewBox.css';

function AverageReviewBox() {
  const ratings = { 5: 12, 4: 9, 3: 1, 2: 0, 1: 0 }; // Updated example ratings
  const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);
  const averageRating = Object.entries(ratings).reduce((acc, [score, count]) => acc + (score * count), 0) / totalRatings;

  return (
    <div className="container">
      <h3 className="title">Reviews</h3>
      <div className="content">
        <div className='avgNumContainer'>
          <div className="circle">
            <p className="avgNum">{averageRating.toFixed(1)}/5.0</p>
          </div>
          <p className="totalRating">{totalRatings} Ratings</p>
        </div>
        <div className="ratingBarContainer">
          {Object.entries(ratings).sort((a, b) => b[0] - a[0]).map(([score, count]) => (
            <div className="ratingBar" key={score}>
              <span className="ratingLabel">{score}</span>
              <div className="BarBase">
                <div className="BarOverlay" style={{ width: `${(count / totalRatings) * 100}%` }}></div>
              </div>
              <span className="count">{count} {count === 1 ? "rate" : "rates"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AverageReviewBox;
