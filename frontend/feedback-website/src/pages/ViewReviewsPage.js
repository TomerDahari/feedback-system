import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ViewReviewsPage.css';

function ViewReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const location = useLocation();
  const businessNumber = location.state?.businessNumber; // קבלת מספר העסק מהפרמטרים שהועברו מההתחברות

  useEffect(() => {
    if (businessNumber) {
      fetch(`http://localhost:8000/reviews/${businessNumber}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setReviews(data);
          } else {
            setReviews([]);
          }
        })
        .catch(error => console.error('Error fetching reviews:', error));
    }
  }, [businessNumber]);

  return (
    <div className="reviews-container">
      <h1>Business Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <p><strong>Order Number:</strong> {review.orderNumber || 'N/A'}</p>
            <p><strong>Date:</strong> {review.date}</p>
            <p><strong>Rating:</strong> {'★'.repeat(review.rating)}</p>
            <p>{review.feedbackText}</p>
          </div>
        ))
      ) : (
        <p>No reviews available for this business.</p>
      )}
    </div>
  );
}

export default ViewReviewsPage;
