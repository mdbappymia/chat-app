import initializedAuthentication from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setError, setIsLoading, setUser } from "../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

initializedAuthentication();
const useFirebase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const loginWithGoogle = () => {
    dispatch(setIsLoading(true));
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
      .then((result: any) => {
        console.log(result.user);
      })
      .catch((error: any) => {
        dispatch(setError(error.message));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

  // email sign in
  const signUpWithEmail = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password).then(
      (result: any) => {
        console.log(result.user);
      }
    );
  };

  // log in email
  const logInEmailPass = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then((user: any) => {
      console.log(user.user);
    });
  };

  // logout function

  const logOut = () => {
    signOut(auth).then(() => {
      dispatch(setUser({}));
    });
  };
  // manage auth user
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        dispatch(setUser(user));
        navigate("/chats");
      } else {
        dispatch(setUser({}));
        navigate("/login");
      }
      return () => unsubscribed;
    });
  }, [auth, dispatch, navigate]);

  return { loginWithGoogle, logOut, signUpWithEmail, logInEmailPass };
};

export default useFirebase;
