const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');

// Initialize environment variables
dotenv.config();

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH);
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = admin.firestore();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const projectRoutes = require('./src/routes/projectRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');
const filesRoutes = require('./src/routes/filesRoutes');

// Use routes
app.use('/projects', projectRoutes);
app.use('/applications', applicationRoutes);
app.use('/files',filesRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});