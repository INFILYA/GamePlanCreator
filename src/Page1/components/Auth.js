import { useEffect } from "react";
import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signOut, FacebookAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setShowEmailField } from "../../states/reducers/showEmailFieldReducer";
import { SetDate } from "./SetDate";

export function Auth({ setRefreshPage }) {
  const dispatch = useDispatch();
  const rivalClub = useSelector((state) => state.rivalClub);
  const myClub = useSelector((state) => state.myClub);
  const showEmailField = useSelector((state) => state.showEmailField);
  const isRegistratedUser = auth?.currentUser?.uid !== undefined;
  const userPhoto = auth?.currentUser?.photoURL;
  const userName = auth?.currentUser?.displayName;

  useEffect(() => {
    dispatch(setShowEmailField(isRegistratedUser));
  }, [dispatch, isRegistratedUser]);

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      dispatch(setShowEmailField(!isRegistratedUser));
    } catch (err) {
      console.error(err);
    }
    setRefreshPage(false);
  }
  async function logout() {
    try {
      await signOut(auth);
      dispatch(setShowEmailField(!isRegistratedUser));
    } catch (err) {
      console.error(err);
    }
    setRefreshPage(false);
  }
  async function signInWithFaceBook() {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      dispatch(setShowEmailField(!isRegistratedUser));
    } catch (err) {
      console.error(err);
    }
    setRefreshPage(false);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        width:1666,
        margin :"auto"
      }}
    >
      {isRegistratedUser ? (
        <>
          <div style={{ display: "flex", alignItems: "center", width: 400 }}>
            <img
              src={userPhoto}
              alt=""
              style={{ margin: "0px 20px", height: 60, borderRadius: 50 }}
            />
            <h2>{userName}</h2>
          </div>
          <div style={{ fontSize: 40, fontWeight: 600 }}>
            {rivalClub.name} vs {myClub.name}
          </div>
        </>
      ) : (
        <div style={{ height: 67.8, width: 400 }}></div>
      )}
      <div className="registrPanel">
        {!showEmailField && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontSize: 30, fontWeight: "bold" }}>Sign in with:</label>
            <button className="google" onClick={signInWithGoogle}></button>
            <button className="facebook" onClick={signInWithFaceBook}></button>
          </div>
        )}
        {showEmailField && (
          <div style={{ width: 400 }}>
            <SetDate />
            <button className="logout" onClick={logout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
