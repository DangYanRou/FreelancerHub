// backend/src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

router.get('/:projectId', async (req, res) => {
  try {
    const projectRef = db.collection('projects').doc(req.params.projectId);
    const doc = await projectRef.get();
    if (!doc.exists) {
      return res.status(404).send('Project not found');
    }
    res.send(doc.data());
  } catch (error) {
    res.status(500).send('Error getting project data: ' + error.message);
  }
});

module.exports = router;