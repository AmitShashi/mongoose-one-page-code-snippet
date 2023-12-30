const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

const url = 'mongodb+srv://.................................................mongodb.net'; //replace url
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let db;
client.connect().then(() => {
  db = client.db('mynotebook'); //replace db name
  console.log('Connected to MongoDB');
});

// CRUD Routes

// Fetch all documents
app.get('/api/data', async (req, res) => {
  try {
    const collection = db.collection('notes'); // replace collection/table name
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add more routes as needed...

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
