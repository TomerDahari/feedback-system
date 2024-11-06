// src/pages/HomePage.js
import React from 'react';
import './HomePage.css'; // קובץ ה-CSS של דף הבית

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to the Feedback Website</h1>
      <p>
        Our platform is designed to help businesses grow and improve by listening to their customers. 
        We provide a simple and effective way for customers to share their experiences and for businesses 
        to receive valuable, constructive feedback.
      </p>
      <p>
        Businesses can register on our site to receive feedback and learn from their customers' suggestions 
        and critiques. Our goal is to create a supportive environment where businesses can understand their 
        strengths and areas for improvement, leading to better service and happier customers.
      </p>
      <p>
        Customers, on the other hand, can easily leave their feedback, whether it’s praise or a suggestion 
        for improvement, helping to shape the future of the businesses they care about.
      </p>
      <div className="home-image">
        {/* אפשר להוסיף תמונה יפה של עסקים וקבלת ביקורות */}
      </div>
    </div>
  );
}


export default HomePage;
