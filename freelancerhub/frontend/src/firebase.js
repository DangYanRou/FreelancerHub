// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, arrayUnion, collection, getDocs, doc, setDoc  } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlH47mkhqoRCkUsEvcFV8-Cl_IxJP69Gc",
  authDomain: "freelancerhub1-b4edc.firebaseapp.com",
  projectId: "freelancerhub1-b4edc",
  storageBucket: "freelancerhub1-b4edc.appspot.com",
  messagingSenderId: "745268650319",
  appId: "1:745268650319:web:420ded40994421cf88653a",
  measurementId: "G-L2HM1KG7WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage,auth,ref, getDownloadURL  };

export const addProject = async (projectInfo) => {
  console.log('Adding project:', projectInfo);
  try {
    const user = auth.currentUser;
    const uid = user.uid;

    // Generate a new document ID
    const docRef = doc(collection(db, "projects"));
    const docID = docRef.id;

    // Add the new project with the custom document ID
    await setDoc(docRef, projectInfo);

    await setDoc(doc(db, "clients", uid), {
      createdProjects: arrayUnion(docID)
    }, { merge: true });    

    console.log("Document written with ID: ", docID);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};





