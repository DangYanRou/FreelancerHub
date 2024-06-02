const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore();

router.post('/', async (req, res) => {
  try {
    const { proposalData, notifications } = req.body;
    const { projectID, freelancerID } = proposalData;
    const docId = `${projectID}_${freelancerID}`;
    await db.collection('proposals').doc(docId).set(proposalData);

    for (const notification of notifications) {
      await db.collection('notifications').add(notification);
    }

    res.send('Proposal submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting proposal: ' + error.message);
  }
});

module.exports = router;