import firebase  from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

  // Initialize Firebase
  const app = firebase.initializeApp(
      {
        apiKey: "AIzaSyBI7vcQ5-B6I-LGMZAuVC_LKNUiA8c0uog",
        authDomain: "best-blog-1b17d.firebaseapp.com",
        projectId: "best-blog-1b17d",
        storageBucket: "best-blog-1b17d.appspot.com",
        messagingSenderId: "460101290933",
        appId: "1:460101290933:web:948c17814ce2c9568527fc"
      }
  );
  export const auth = app.auth();
  export const firestore = app.firestore();
  export const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
  export default app;