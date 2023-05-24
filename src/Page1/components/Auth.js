import { auth, googleProvider } from "../../config/firebase";
import { signInWithPopup, signOut, FacebookAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { SetDate } from "./SetDate";
import { useEffect } from "react";
import { setisRegistratedUser } from "../../states/reducers/isRegistratedUserReducer";
import { setuserInfo } from "../../states/reducers/userInfoReducer";

export function Auth() {
  const dispatch = useDispatch();
  const rivalClub = useSelector((state) => state.rivalClub);
  const myClub = useSelector((state) => state.myClub);
  const isRegistratedUser = useSelector((state) => state.isRegistratedUser);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(setisRegistratedUser(JSON.parse(localStorage.getItem("isRegistratedUser"))));
    dispatch(setuserInfo(JSON.parse(localStorage.getItem("userInfo"))));
  }, [dispatch]);

  function saveUserInfo() {
    dispatch(
      setuserInfo({
        email: auth?.currentUser?.email,
        uid: auth?.currentUser?.uid,
        photoURL: auth?.currentUser?.photoURL,
        displayName: auth?.currentUser?.displayName,
      })
    );
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
      dispatch(setisRegistratedUser(true));
    } catch (err) {
      console.error(err);
    } finally {
      saveUserInfo();
    }
  }
  async function logout() {
    try {
      await signOut(auth);
      dispatch(setisRegistratedUser(false));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setuserInfo(null));
    }
  }
  async function signInWithFaceBook() {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      dispatch(setisRegistratedUser(true));
    } catch (err) {
      console.error(err);
    } finally {
      saveUserInfo();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        margin: "0 auto",
      }}
    >
      {isRegistratedUser && (
        <>
          <div style={{ display: "flex", alignItems: "center", width: 400 }}>
            <img
              src={userInfo.photoURL}
              alt=""
              style={{ margin: "0px 20px", height: 60, borderRadius: 50 }}
            />
            <h2>{userInfo.displayName}</h2>
          </div>
          <div style={{ fontSize: 40, fontWeight: 600 }}>
            {rivalClub.name} vs {myClub.name}
          </div>
        </>
      )}
      {!isRegistratedUser && <div style={{ height: 67.8, width: 400 }}></div>}
      <div className="registrPanel">
        {!isRegistratedUser && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontSize: 30, fontWeight: "bold" }}>Sign in with:</label>
            <button className="google" onClick={signInWithGoogle}></button>
            <button className="facebook" onClick={signInWithFaceBook}></button>
          </div>
        )}
        {isRegistratedUser && (
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
