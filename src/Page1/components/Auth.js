import { auth, googleProvider } from "../../config/firebase";
import {
  signInWithPopup,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { SetDate } from "./SetDate";
import { useEffect, useState } from "react";
import { setuserInfo } from "../../states/reducers/userInfoReducer";
import { useAuthState } from "react-firebase-hooks/auth";
// import { deleteUser } from "firebase/auth";

export function Auth() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailPanel, setShowEmailPanel] = useState(false);
  const rivalClub = useSelector((state) => state.rivalClub);
  const myClub = useSelector((state) => state.myClub);
  const userInfo = useSelector((state) => state.userInfo);
  const [isRegistratedUser] = useAuthState(auth);

  useEffect(() => {
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
    } catch (err) {
      console.error(err);
    } finally {
      saveUserInfo();
    }
  }
  async function logout() {
    try {
      // await deleteUser(isRegistratedUser);
      await signOut(auth);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setuserInfo(null));
      setShowEmailPanel(false);
    }
  }
  async function signInWithFaceBook() {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    } finally {
      saveUserInfo();
    }
  }
  async function signInWithEmail(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    } finally {
      saveUserInfo();
      setShowEmailPanel(false);
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
              src={userInfo?.photoURL}
              alt=""
              style={{ margin: "0px 20px", height: 60, borderRadius: 50 }}
            />
            <h2>{userInfo?.displayName || userInfo?.email}</h2>
          </div>
          {rivalClub.length === 0 ? (
            <div className="matchup">
              <div>Choose rival team</div>
            </div>
          ) : (
            <div className="matchup">
              <img src={rivalClub.logo} alt=""></img>
              vs
              {myClub.length !== 0 && <img src={myClub.logo} alt=""></img>}
            </div>
          )}
        </>
      )}
      {!isRegistratedUser && <div style={{ height: 80, width: 400 }}></div>}
      <div className="registrPanel">
        {!isRegistratedUser && (
          <div style={{ display: "flex", alignItems: "center" }}>
            {showEmailPanel && (
              <form className="emailPanel" onSubmit={signInWithEmail}>
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
                  <button type="submit">Sign in</button>
                  <button onClick={() => setShowEmailPanel(!showEmailPanel)}>Back</button>
                  <div></div>
                </div>
              </form>
            )}
            {!showEmailPanel && (
              <>
                <label style={{ fontSize: 30, fontWeight: "bold" }}>Sign in with:</label>
                <button
                  className="email"
                  onClick={() => setShowEmailPanel(!showEmailPanel)}
                ></button>
                <button className="google" onClick={signInWithGoogle}></button>
                <button className="facebook" onClick={signInWithFaceBook}></button>
              </>
            )}
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
