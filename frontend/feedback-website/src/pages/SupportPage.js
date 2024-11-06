// src/pages/SupportPage.js
import React, { useState } from 'react';
import './SupportPage.css';

function SupportPage() {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [issue, setIssue] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8000/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, email, issue }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Support request sent successfully!');
    } else {
      alert(`Error: ${data.message}`);
    }
  };

  return (
    <div className="support-container">
      <h1>Support</h1>
      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Describe your issue"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Request</button>
    </div>
  );
}

export default SupportPage;
