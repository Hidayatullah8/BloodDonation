// // // import React, { useEffect } from 'react';
import * as firebase from 'firebase'
import 'firebase/firestore';
import { exp } from 'react-native/Libraries/Animated/src/Easing';
// // // import analytics from "@react-​native-firebase/analytics"; 
// // // import firebase from '@react-native-firebase/app';
// // // import 'firebase/storage'
// import { Alert } from 'react-native';
// import { connect } from 'react-redux';





// var firebaseConfig = {
//     apiKey: "AIzaSyBG_J899vGZ63cAbYneIY2DaaWY5Ab6l_k",
//     authDomain: "blooddonation2-c3552.firebaseapp.com",
//     databaseURL: "https://blooddonation2-c3552.firebaseio.com",
//     projectId: "blooddonation2-c3552",
//     storageBucket: "blooddonation2-c3552.appspot.com",
//     messagingSenderId: "301078219542",
//     appId: "1:301078219542:web:a568eb1c7e44aa981ade37",
//     measurementId: "G-W4T87NQDBP"
// };
// // Initialize Firebase

// firebase.initializeApp(firebaseConfig);

var firebaseConfig = {
    apiKey: "AIzaSyCMtZsUAg4pOPhzwJZeAnno1aBHZVGyoZU",
    authDomain: "blooddonationapp-1d219.firebaseapp.com",
    projectId: "blooddonationapp-1d219",
    storageBucket: "blooddonationapp-1d219.appspot.com",
    messagingSenderId: "117053512110",
    appId: "1:117053512110:web:07deabdf086e948fdcd03f",
    measurementId: "G-DGMSLTRT83"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();









// //   firebase.analytics();


// const auth = firebase.auth()
// const db = firebase.firestore()
// console.log('auth+++',auth)

function registerUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)

}

function LoginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}



    


    
//     return db.collection('UserInfo').where('fbid','==',fbid).get()

export {
    registerUser,LoginUser,firebase
}