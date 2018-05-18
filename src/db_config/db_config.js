import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyBy2A392iE16WeiuavqCi8vJTHWnRgf0j0",
    authDomain: "licenta-f96d1.firebaseapp.com",
    databaseURL: "https://licenta-f96d1.firebaseio.com",
    projectId: "licenta-f96d1",
    storageBucket: "licenta-f96d1.appspot.com",
    messagingSenderId: "1044619656021"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();