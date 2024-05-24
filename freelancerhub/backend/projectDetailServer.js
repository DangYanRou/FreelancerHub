
import { db } from '../frontend/firebase';

export const createProject = async (project) => {
  try {
    const docRef = await db.collection('projects').add(project);
    return docRef.id;
  } catch (error) {
    console.error('Error creating project: ', error);
  }
};