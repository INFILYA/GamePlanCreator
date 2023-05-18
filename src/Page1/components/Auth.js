import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    // console.log(auth?.currentUser?.email);

  async function signIn() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  }
  async function siqnInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  }
  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <input placeholder="Email..." type="text" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign in</button>
      <button onClick={siqnInWithGoogle}>Sign in with Google</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
