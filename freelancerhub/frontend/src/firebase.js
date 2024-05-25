// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChqjZ5SNRVgeTYD-LKq_Pp_WJgmhXY56M",
  authDomain: "freelancerhub-eb28a.firebaseapp.com",
  projectId: "freelancerhub-eb28a",
  storageBucket: "freelancerhub-eb28a.appspot.com",
  messagingSenderId: "112857416885",
  appId: "1:112857416885:web:651b1d63a534c8ad106afc",
  measurementId: "G-9KCL2NWNFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage,auth,ref, getDownloadURL  };





