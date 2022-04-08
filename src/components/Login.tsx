import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { FC, useState } from "react";
import useFirebase from "../hooks/useFirebase";

const Login: FC = () => {
  const { loginWithGoogle } = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUpWithEmail, logInEmailPass } = useFirebase();
  return (
    <div id="login-page">
      <div id="login-card">
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
      <div>
        <label>Email</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <label>Pass</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <div>
          <button onClick={() => logInEmailPass(email, password)}>Login</button>
          <button onClick={() => signUpWithEmail(email, password)}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
