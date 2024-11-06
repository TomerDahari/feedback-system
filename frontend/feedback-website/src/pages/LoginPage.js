// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [businessNumber, setBusinessNumber] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryBusinessName, setRecoveryBusinessName] = useState('');
  const [recoveryPassword, setRecoveryPassword] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryOption, setRecoveryOption] = useState('businessNumber'); // סוג השחזור
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessNumber, password }),
    });

    const data = await response.json();
    if (data.success) {
      alert('Login successful!');
      navigate('/reviews', { state: { businessNumber } });
    } else {
      alert(`Error: ${data.message}`);
    }
  };


  const handleBusinessNumberRecovery = async () => {
    const response = await fetch('http://localhost:8000/recover-business-number', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName: recoveryBusinessName, password: recoveryPassword }),
    });

    const data = await response.json();
    if (data.success) {
      alert(`Your business number is: ${data.businessNumber}`);
    } else {
      alert(`Error: ${data.message}`);
    }
  };

  const handlePasswordRecovery = async () => {
    const response = await fetch('http://localhost:8000/recover-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName: recoveryBusinessName, recoveryWord: recoveryPassword }),
    });

    const data = await response.json();
    if (data.success) {
      alert(`Your password is: ${data.password}`);
    } else {
      alert(`Error: ${data.message}`);
    }
  };

  const handleRecovery = () => {
    if (recoveryOption === 'businessNumber') {
      handleBusinessNumberRecovery();
    } else {
      handlePasswordRecovery();
    }
  };

  return (
    <div className="login-container">
      <h1>Business Login</h1>
      <input
        type="text"
        placeholder="Business Number"
        value={businessNumber}
        onChange={(e) => setBusinessNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <div className="recovery-section">
        <p onClick={() => setShowRecovery(!showRecovery)} className="recovery-link">
          Forgot Password or Business Number?
        </p>
        {showRecovery && (
          <div className="recovery-form">
            <select value={recoveryOption} onChange={(e) => setRecoveryOption(e.target.value)}>
              <option value="businessNumber">Recover Business Number</option>
              <option value="password">Recover Password</option>
            </select>
            <input
              type="text"
              placeholder="Business Name"
              value={recoveryBusinessName}
              onChange={(e) => setRecoveryBusinessName(e.target.value)}
            />
            <input
              type="text"
              placeholder={recoveryOption === 'businessNumber' ? "Password" : "Recovery Word"}
              value={recoveryPassword}
              onChange={(e) => setRecoveryPassword(e.target.value)}
            />
            <button onClick={handleRecovery}>Recover</button>
          </div>
        )}
      </div>
    </div>
  );
}


export default LoginPage;
