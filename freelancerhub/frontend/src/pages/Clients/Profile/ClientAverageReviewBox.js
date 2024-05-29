import React, { useEffect, useState } from "react";
import "../../../styles/AverageReviewBox.css";

function AverageReviewBox({ feedbacks }) {
  const [ratings, setRatings] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const computeRatings = () => {
      const newRatings = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      feedbacks.forEach((feedback) => {
        newRatings[feedback.rating]++;
      });

      setRatings(newRatings);

      const total = Object.values(newRatings).reduce((a, b) => a + b, 0);
      setTotalRatings(total);

      const average = total
        ? Object.entries(newRatings).reduce(
            (acc, [score, count]) => acc + score * count,
            0
          ) / total
        : 0;
      setAverageRating(average);
    };

    computeRatings();
  }, [feedbacks]);
  console.log("rating:",ratings)
  console.log("averageRating:",averageRating)
  console.log("totalRatings:",totalRatings)

  return (
    <div className="container">
      <h3 className="title">Reviews</h3>
      <div className="content">
        <div className="avgNumContainer">
          <div className="circle">
            <p className="avgNum">{averageRating.toFixed(1)}/5.0</p>
          </div>
          <p className="totalRating">{totalRatings} Ratings</p>
        </div>
        <div className="ratingBarContainer">
          {Object.entries(ratings)
            .sort((a, b) => b[0] - a[0])
            .map(([score, count]) => (
              <div className="ratingBar" key={score}>
                <span className="ratingLabel">{score}</span>
                <div className="BarBase">
                  <div
                    className="BarOverlay"
                    style={{ width: `${totalRatings ? (count / totalRatings) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="count">
                  {count} {(count === 1 || count === 0) ? "rate" : "rates"}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AverageReviewBox;
