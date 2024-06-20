import * as firebase from "firebase/app"
import { getAuth } from 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBLdvySPiBo-AlBhEMe7zd-b1bo-02mJOs",
  authDomain: "moneymanager-ab035.firebaseapp.com",
  projectId: "moneymanager-ab035",
  storageBucket: "moneymanager-ab035.appspot.com",
  messagingSenderId: "1092352956175",
  appId: "1:1092352956175:web:808ea75c0718cbd830507a",
  measurementId: "G-YYM2Q8CL1P"
};

let app
if(firebase.getApps().length < 1){
    app = firebase.initializeApp(firebaseConfig)
}else{
    
}

const auth = getAuth(app)
export {auth}
