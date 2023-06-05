import { auth, facebookProvider, googleProvider } from "../../config/firebase";
import {
  signInWithPopup,
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

export function Auth() {
  const navigate = useNavigate();
  const [isRegistratedUser] = useAuthState(auth);
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  // const [showSignInPanel, setShowSignInPanel] = useState(false);

  useEffect(() => {
    if (isRegistratedUser) {
      // navigate("/");
    } else {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem("userEmail");
        console.log(email);
        if (!email) {
          email = window.prompt("Please provide your email");
        }
        signInWithEmailLink(auth, localStorage.getItem("userEmail"), window.location.href);
        localStorage.removeItem("userEmail");
      }
    }
  }, [isRegistratedUser, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoginLoading(true);
      await sendSignInLinkToEmail(auth, email, {
        url: "https://game-plan-creator.web.app/Auth",
        handleCodeInApp: true,
        dynamicLinkDomain: "gameplancreator.page.link",
      });
      localStorage.setItem("userEmail", JSON.stringify(email));
      alert("We have sent you link on email");
      setLoginLoading(false);
      setLoginError("");
    } catch (err) {
      console.error(err);
      setLoginLoading(false);
      setLoginError(err.message);
      alert("Sorry , account with this name already existed. Please , try again");
    }
  }
  // async function logInWithEmail(e) {
  //   e.preventDefault();
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     navigate("/");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Sorry , we cant find your account. Please , create a new one");
  //   }
  // }
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }
  async function signInWithFaceBook() {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Sorry , account with this name already existed. Please , try again");
    }
  }
  return (
    <>
      <form className="emailPanel" onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
          <label>Password:</label>
          {/* <input
            type="password"
            placeholder="Password..."
            required
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <button type="submit">{loginLoading ? "Logging you in" : "Log in"}</button>
          {loginError !== "" && <div>{loginError}</div>}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" className="google" onClick={signInWithGoogle}></button>
            <button type="button" className="facebook" onClick={signInWithFaceBook}></button>
          </div>
          <div>Dont have an account?</div>
          {/* <button
            type="button"
            className="createAccount"
            onClick={() => setShowSignInPanel(!showSignInPanel)}
          >
            Create an account
          </button> */}
        </div>
      </form>
    </>
  );
}
