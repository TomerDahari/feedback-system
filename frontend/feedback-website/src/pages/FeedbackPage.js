import React, { useState } from 'react';
import './FeedbackPage.css';


function FeedbackPage() {
  const [businessName, setBusinessName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [businessNumber, setBusinessNumber] = useState('');


  const handleSubmit = async () => {
    // בדיקה אם ה-businessNumber ריק או לא מספר
    if (!businessNumber || isNaN(businessNumber)) {
      alert('Please select a valid business from the suggestions.');
      return;
    }

    const responseCheck = await fetch(`http://localhost:8000/businesses/check?businessNumber=${businessNumber}`);
    const dataCheck = await responseCheck.json();

    if (!dataCheck.exists) {
      alert('Business does not exist. Please check the business number.');
      return;
    }

    // המשך לשמור את הביקורת אם העסק קיים
    const response = await fetch('http://localhost:8000/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, businessNumber, orderNumber, rating, feedbackText }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Feedback submitted successfully!');
      setBusinessName('');
      setOrderNumber('');
      setRating(0);
      setFeedbackText('');
      setSuggestions([]);
    } else {
      alert(`Error: ${data.message}`);
    }
  };


  const handleBusinessNameChange = async (e) => {
    const value = e.target.value;
    setBusinessName(value);

    if (value.length > 0) {
      const response = await fetch(`http://localhost:8000/businesses?q=${value}`);
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };


  const selectSuggestion = (suggestion) => {
    setBusinessName(`${suggestion.businessName} - ${suggestion.businessNumber}`);
    setBusinessNumber(suggestion.businessNumber); // שמירה של מספר העסק
    setSuggestions([]);
  };

  return (
    <div className="feedback-container">
      <h1>Submit Feedback</h1>
      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={handleBusinessNameChange}
      />
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => selectSuggestion(suggestion)}
          >
            {suggestion.businessName} - {suggestion.businessNumber}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Order Number (optional)"
        value={orderNumber}
        onChange={(e) => setOrderNumber(e.target.value)}
      />
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Write your feedback"
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}


export default FeedbackPage;
