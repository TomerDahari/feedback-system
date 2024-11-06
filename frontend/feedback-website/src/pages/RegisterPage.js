// src/pages/RegisterPage.js
import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryWord, setRecoveryWord] = useState('');
  const [businessNumber, setBusinessNumber] = useState(null);

  const handleRegister = async () => {
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, password, recoveryWord }),
    });

    const data = await response.json();
    if (data.success) {
      setBusinessNumber(data.businessNumber);
      alert(`Business registered successfully! Your business number is: ${data.businessNumber}`);
    } else {
      alert(`Error: ${data.message}`);
    }
  };

  return (
    <div className="register-container">
      <h1>Register Your Business</h1>
      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recovery Word"
        value={recoveryWord}
        onChange={(e) => setRecoveryWord(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {businessNumber && <p className="business-number">Your Business Number: {businessNumber}</p>}
    </div>
  );
}

export default RegisterPage;
