const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://tomerdahari18:tomerdahari18@cluster0.nmcwv.mongodb.net/feedback_system?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Could not connect to MongoDB:', error));


// Business model
const businessSchema = new mongoose.Schema({
  businessName: String,
  password: String,
  recoveryWord: String,
  businessNumber: Number,
});
const Business = mongoose.model('Business', businessSchema);


// הגדרת ה-schema של ביקורת כולל מספר העסק ושם העסק
const feedbackSchema = new mongoose.Schema({
    businessNumber: Number,
    businessName: String,   
    orderNumber: String,
    rating: Number,
    feedbackText: String,
    date: String,
  });
  const Feedback = mongoose.model('Feedback', feedbackSchema);
  

// Support request model
const supportRequestSchema = new mongoose.Schema({
  businessName: String,
  email: String,
  issue: String,
});
const SupportRequest = mongoose.model('SupportRequest', supportRequestSchema);

// Generate unique business number
function generateBusinessNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}


// Register a new business
app.post('/register', async (req, res) => {
  const { businessName, password, recoveryWord } = req.body;
  const businessNumber = generateBusinessNumber();
  const newBusiness = new Business({ businessName, password, recoveryWord, businessNumber });
  await newBusiness.save();
  res.json({ success: true, businessNumber });
});


// Business login
app.post('/login', async (req, res) => {
  const { businessNumber, password } = req.body;
  const business = await Business.findOne({ businessNumber: parseInt(businessNumber), password });
  if (business) {
    res.json({ success: true, businessNumber });
  } else {
    res.json({ success: false, message: 'Invalid business number or password' });
  }
});


// Submit feedback
app.post('/feedback', async (req, res) => {
    const { businessName, businessNumber, orderNumber, rating, feedbackText, date } = req.body;

    // בדוק אם העסק קיים לפי מספר העסק
    const business = await Business.findOne({ businessNumber: parseInt(businessNumber) });

    if (!business) {
        return res.json({ success: false, message: 'Business does not exist.' });
    }

    // אם העסק קיים, המשך לשמור את הביקורת
    const feedback = new Feedback({
        businessName,
        businessNumber,
        orderNumber,
        rating,
        feedbackText,
        date: date || new Date().toISOString().split('T')[0],
    });
    await feedback.save();
    res.json({ success: true });
});


app.get('/businesses/check', async (req, res) => {
    const { businessNumber } = req.query;
    const business = await Business.findOne({ businessNumber: parseInt(businessNumber) });

    if (business) {
        res.json({ exists: true });
    } else {
        res.json({ exists: false });
    }
});


// Support request
app.post('/support', async (req, res) => {
  const { businessName, email, issue } = req.body;
  const supportRequest = new SupportRequest({ businessName, email, issue });
  await supportRequest.save();
  res.json({ success: true });
});


// Get reviews for a specific business
app.get('/reviews/:businessNumber', async (req, res) => {
    const businessNumber = parseInt(req.params.businessNumber);

    // חיפוש ביקורות לפי מספר העסק
    const businessReviews = await Feedback.find({ businessNumber: businessNumber });
    
    if (businessReviews.length > 0) {
      console.log("Found reviews:", businessReviews);
      res.json(businessReviews);
    } else {
      res.json({ message: "No reviews available for this business." });
    }
});


// Recover business number by business name and password
app.post('/recover-business-number', async (req, res) => {
  const { businessName, password } = req.body;
  const business = await Business.findOne({ businessName, password });
  if (business) {
    res.json({ success: true, businessNumber: business.businessNumber });
  } else {
    res.json({ success: false, message: 'Business name or password incorrect' });
  }
});


// Recover password by business name and recovery word
app.post('/recover-password', async (req, res) => {
  const { businessName, recoveryWord } = req.body;
  const business = await Business.findOne({ businessName, recoveryWord });
  if (business) {
    res.json({ success: true, password: business.password });
  } else {
    res.json({ success: false, message: 'Business name or recovery word incorrect' });
  }
});


// Search businesses by part of name or number
app.get('/businesses', async (req, res) => {
  const query = req.query.q;
  
  const businesses = await Business.find({
    $or: [
      { businessName: { $regex: new RegExp(query, 'i') } },
      { businessNumber: parseInt(query) || -1 }
    ]
  });
  
  res.json(businesses);
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
