const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Schema } = mongoose;
// Initialize express app
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());

// Mongoose schema and model
const NotesSchema = new Schema({
  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },
  title:{
      type: String,
      required: true
  },
  description:{
      type: String,
      required: true, 
  },
  tag:{
      type: String,
      default: "General"
  },
});

const noteURL = mongoose.model('notes', NotesSchema);

// MongoDB URI and connection

const mongoURI = 'mongodb+srv://amit:amit@cluster0.6nkx33w.mongodb.net/mynotebook'; // Replace with your MongoDB connection string

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.error("Failed to connect to MongoDB:", err));

// API endpoint to get all products
app.get('/api/notes', async (req, res) => {
  try {
    const notess = await noteURL.find();
    console.log("res.json(notess)::::"+notess)
    res.json(notess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

