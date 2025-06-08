const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/EventRoutes');
const contactRoutes = require('./routes/ContactRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173',
  'event-frontend-git-master-rizwanas-projects-7dc3c26f.vercel.app'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://rizu:sathikbatcha@cluster0.o5nilkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api', authRoutes);
app.use('/api', eventRoutes);
app.use('/api', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
