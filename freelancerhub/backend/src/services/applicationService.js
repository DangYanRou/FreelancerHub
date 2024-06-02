const admin = require('firebase-admin');
const db = admin.firestore();

async function submitApplication(proposalData, notifications) {
  const { projectID, freelancerID } = proposalData;
  const docId = `${projectID}_${freelancerID}`;
  try {
    await db.collection('proposals').doc(docId).set(proposalData);

    for (const notification of notifications) {
      await db.collection('notifications').add(notification);
    }

    return 'Application submitted successfully';
  } catch (error) {
    throw new Error('Error submitting application: ' + error.message);
  }
}

module.exports = {
  submitApplication
};