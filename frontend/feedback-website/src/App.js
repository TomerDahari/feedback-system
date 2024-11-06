// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import FeedbackPage from './pages/FeedbackPage';
import ViewReviewsPage from './pages/ViewReviewsPage';
import SupportPage from './pages/SupportPage';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/reviews" element={<ViewReviewsPage />} /> {/* שינוי נתיב לדף הביקורות */}
        <Route path="/support" element={<SupportPage />} />
      </Routes>
    </Router>
  );
}


export default App;
