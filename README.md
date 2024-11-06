# Feedback System

This is a feedback management system that allows businesses to register, log in, and view feedback left by customers. Customers can also leave feedback for registered businesses.

## Features
- **Business Registration and Login**: Businesses can create accounts, receive a unique business number, and log in using their credentials.
- **Feedback Submission by Customers**: Customers can leave feedback for registered businesses, including a rating and optional order number.
- **Autocomplete for Business Names**: The feedback submission page includes autocomplete functionality for finding businesses by name.
- **View Feedback**: Business owners can view all feedback received after logging in, including ratings and comments.

## Getting Started

These instructions will help you set up the project on your local machine.

### Prerequisites
- **Node.js**: Download and install from [https://nodejs.org/](https://nodejs.org/)
- **MongoDB**: Set up a MongoDB instance, either locally or using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installation and Setup

#### 1. Clone the Repository
   ```bash
   git clone https://github.com/TomerDahari/feedback-system.git
   cd feedback-system




Backend Setup
Navigate to the backend directory:
cd backend

Install dependencies:
npm install
Configure MongoDB connection:
If using MongoDB Atlas or a remote MongoDB instance, update the MongoDB connection URL in server.js.

Start the backend server:
node server.js
The backend server will run by default on http://localhost:8000.

3. Frontend Setup
Open a new terminal window or navigate back to the main project folder:
cd ../frontend/feedback-website

Install dependencies:
npm install

Start the frontend server:
npm start
The frontend server will run by default on http://localhost:3000.



Business Registration: Register a new business by choosing a unique name and password. A business number will be assigned upon successful registration.
Login: Use the business number and password to log in and access feedback.
Submit Feedback: Customers can search for a business by name or business number, select a rating, and leave feedback.
View Feedback: Business owners can see all feedback submitted for their business after logging in.