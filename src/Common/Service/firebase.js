import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCTn7_zJHb-zpQEiq0UhwTXzoVhpJkIpE0",
    authDomain: "monotest-70db1.firebaseapp.com",
    projectId: "monotest-70db1",
    storageBucket: "monotest-70db1.appspot.com",
    messagingSenderId: "170966934623",
    appId: "1:170966934623:web:e04ac3bb44e346b1afe7ea"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);



export default firebaseApp.firestore();