import { useAuthState } from "react-firebase-hooks/auth";
import { SetDate } from "../Page1/components/SetDate";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const [isRegistratedUser] = useAuthState(auth);
  const rivalClub = useSelector((state) => state.rivalClub);
  const myClub = useSelector((state) => state.myClub);

  function openAuthWindow() {
    navigate("/Auth");
  }
  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }
  return (
    <div className="header">
      <div className="block">
        <img
          src={isRegistratedUser?.photoURL}
          alt=""
          style={{ margin: "0px 20px", height: 60, borderRadius: 50 }}
        />
        <h2>{isRegistratedUser?.displayName || isRegistratedUser?.email}</h2>
      </div>
      {rivalClub.length !== 0 && (
        <div className="matchup">
          <img src={rivalClub.logo} alt=""></img>
          vs
          {myClub.length !== 0 && <img src={myClub.logo} alt=""></img>}
        </div>
      )}
      {isRegistratedUser ? (
        <div className="block">
          <SetDate />
          <button className="logout" onClick={logout}>
            Log out
          </button>
        </div>
      ) : (
        <div className="block">
          <SetDate />
          <button className="login" onClick={openAuthWindow}>
            Log in
          </button>
        </div>
      )}
    </div>
  );
}
