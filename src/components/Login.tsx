import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import useFirebase from "../hooks/useFirebase";
import { RootState } from "../redux/store/store";

const Login: FC = () => {
  const { loginWithGoogle } = useFirebase();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUpWithEmail, logInEmailPass } = useFirebase();
  const { isLoading, error } = useSelector((state: RootState) => state.users);

  console.log(isLoading);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div id="login-page">
      <div id="login-card">
        {error ? <p>{error}</p> : ""}
        <div className="login-form">
          <div className="form-label">
            <label>Email</label>
            <br />
            <label>Pass</label>
          </div>
          <div className="form-input">
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login-button-div">
              {isSignup ? (
                <>
                  <button
                    className="form-login-button"
                    onClick={() => logInEmailPass(email, password)}
                  >
                    Login
                  </button>
                  <p className="link" onClick={() => setIsSignup(false)}>
                    sign up
                  </p>
                </>
              ) : (
                <>
                  <button
                    className="form-signup-button"
                    onClick={() => signUpWithEmail(email, password)}
                  >
                    Signup
                  </button>
                  <p onClick={() => setIsSignup(true)} className="link">
                    login
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <h2>Welcome to Chat</h2>
        <div className="login-button google" onClick={loginWithGoogle}>
          <GoogleOutlined /> Sign in with Google
        </div>
        <br />
        <br />
        <div className="login-button google">
          <FacebookOutlined /> Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
