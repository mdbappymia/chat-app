import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializedAuthentication = () => {
  return initializeApp(firebaseConfig);
};

export default initializedAuthentication;
