import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailField, setShowEmailField] = useState(true);
  const registratedUser = auth?.currentUser?.uid !== undefined;
  const userPhoto = auth?.currentUser?.photoURL;
  const userName = auth?.currentUser?.displayName;

  async function signIn() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  }
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("You are Welcome!");
      setShowEmailField(!showEmailField);
    } catch (err) {
      console.error(err);
    }
  }
  async function logout() {
    try {
      await signOut(auth);
      alert("Please come back, We are waiting for you!");
      setShowEmailField(!showEmailField);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {registratedUser ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={userPhoto} alt="" style={{ marginRight: 20, height: 60 }} />
          <h2>Welcome, {userName}</h2>
        </div>
      ) : (
        <div style={{ height: 67.8 }}></div>
      )}
      <div className="registrPanel">
        {showEmailField && (
          <>
            <input placeholder="Email..." type="text" onChange={(e) => setEmail(e.target.value)} />
            <input
              placeholder="Password..."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign in</button>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          </>
        )}
        {!showEmailField && <button onClick={logout}>Log out</button>}
      </div>
    </div>
  );
}
