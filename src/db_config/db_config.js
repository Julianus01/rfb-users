import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyD5LC1MlVI15NbEZ64UHV5QrfLh42LyTI4",
    authDomain: "rfb-users.firebaseapp.com",
    databaseURL: "https://rfb-users.firebaseio.com",
    projectId: "rfb-users",
    storageBucket: "rfb-users.appspot.com",
    messagingSenderId: "369120240986"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();