import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setShowEmailField } from "../../states/reducers/showEmailFieldReducer";

export function Auth() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showEmailField = useSelector((state) => state.showEmailField);
  const registratedUser = auth?.currentUser?.uid !== undefined;
  const userPhoto = auth?.currentUser?.photoURL;
  const userName = auth?.currentUser?.displayName;
  useEffect(() => {
    dispatch(setShowEmailField(registratedUser));
  }, [dispatch, registratedUser]);
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
      dispatch(setShowEmailField(!registratedUser));
    } catch (err) {
      console.error(err);
    }
  }
  async function logout() {
    try {
      await signOut(auth);
      alert("Please come back, We are waiting for you!");
      dispatch(setShowEmailField(!registratedUser));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "blueviolet",
      }}
    >
      {registratedUser ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={userPhoto} alt="" style={{ marginRight: 20, height: 60, borderRadius: 50 }} />
          <h2>Welcome, {userName}</h2>
        </div>
      ) : (
        <div style={{ height: 67.8 }}></div>
      )}
      <div className="registrPanel">
        {!showEmailField && (
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
        {showEmailField && <button onClick={logout}>Log out</button>}
      </div>
    </div>
  );
}
