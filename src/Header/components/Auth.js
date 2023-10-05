import { auth, facebookProvider, googleProvider } from "../../config/firebase";
import {
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router";
import SectionWrapper from "../../Page1/components/SectionWrapper";

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const [isRegistratedUser] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    async function signInWithEmail() {
      try {
        if (isRegistratedUser) {
          navigate("/");
        } else {
          if (isSignInWithEmailLink(auth, window.location.href)) {
            await signInWithEmailLink(
              auth,
              localStorage.getItem("userEmail"),
              window.location.href
            );
            localStorage.removeItem("userEmail");
          }
        }
      } catch (err) {
        console.log(err);
        navigate("/Auth");
      }
    }
    signInWithEmail();
  }, [isRegistratedUser, navigate, search]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoginLoading(true);
      await sendSignInLinkToEmail(auth, email, {
        url: "https://game-plan-creator.web.app/Auth",
        handleCodeInApp: true,
        dynamicLinkDomain: "gameplancreator.page.link",
      });
      localStorage.setItem("userEmail", email);
      alert("We have sent you link on email");
      setLoginLoading(false);
      setLoginError("");
    } catch (err) {
      console.error(err);
      setLoginLoading(false);
      setLoginError(err.message);
    }
  }
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
    <SectionWrapper
      content={
        <form className="emailPanel" onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="text"
              placeholder="Email..."
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button type="submit">{loginLoading ? "Logging you in" : "Log in"}</button>
            {loginError !== "" && <div>{loginError}</div>}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="button" className="google" onClick={signInWithGoogle}></button>
              <button type="button" className="facebook" onClick={signInWithFaceBook}></button>
            </div>
          </div>
        </form>
      }
    />
  );
}
