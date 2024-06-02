const admin = require('firebase-admin');
const db = admin.firestore();

async function getProjectById(projectId) {
  try {
    const projectRef = db.collection('projects').doc(projectId);
    const doc = await projectRef.get();
    if (!doc.exists) {
      throw new Error('Project not found');
    }
    return doc.data();
  } catch (error) {
    throw new Error('Error getting project: ' + error.message);
  }
}

//add your function here


module.exports = {
  getProjectById,
};