import { auth, facebookProvider, googleProvider } from "../../config/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // sendSignInLinkToEmail,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignInPanel, setShowSignInPanel] = useState(false);

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
  async function signInWithEmail(e) {
    e.preventDefault();
    try {
      // await sendSignInLinkToEmail(auth, email, {
      //   // url: "https://game-plan-creator.web.app/Auth",
      //   url: "http://localhost:3000",
      //   handleCodeInApp: true,
      //   dynamicLinkDomain: "gameplancreator.page.link",
      // });
      // localStorage.setItem("userEmail", email);
      // alert("We have sent you link on email");
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Sorry , account with this name already existed. Please , try again");
    }
  }
  async function logInWithEmail(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Sorry , we cant find your account. Please , create a new one");
    }
  }
  return (
    <>
      <form className="emailPanel" onSubmit={showSignInPanel ? signInWithEmail : logInWithEmail}>
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
          <input
            type="password"
            placeholder="Password..."
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {showSignInPanel ? (
            <>
              <button type="submit">Sign in</button>
              <button type="button" onClick={() => setShowSignInPanel(!showSignInPanel)}>
                Back
              </button>
            </>
          ) : (
            <>
              <button type="submit">Log in</button>
              <button type="button" onClick={() => navigate("/")}>
                Back
              </button>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button type="button" className="google" onClick={signInWithGoogle}></button>
                <button type="button" className="facebook" onClick={signInWithFaceBook}></button>
              </div>
              <div>Dont have an account?</div>
              <button
                type="button"
                className="createAccount"
                onClick={() => setShowSignInPanel(!showSignInPanel)}
              >
                Create an account
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
