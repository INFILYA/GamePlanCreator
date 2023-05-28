import { auth, googleProvider } from "../../config/firebase";
import {
  signInWithPopup,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailPanel, setShowEmailPanel] = useState(false);
  const [showSignInPanel, setShowSignInPanel] = useState(false);

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  }
  async function signInWithFaceBook() {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  }
  async function signInWithEmail(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert("Sorry , account with this name already existed. Please , try again");
    } finally {
      setShowEmailPanel(false);
      setShowSignInPanel(!showSignInPanel);
      navigate("/");
    }
  }
  async function logInWithEmail(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert("Sorry , we cant find your account. Please , create a new one");
    } finally {
      setShowEmailPanel(!showEmailPanel);
      navigate("/");
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
