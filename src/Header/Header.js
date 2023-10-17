import { useAuthState } from "react-firebase-hooks/auth";
import { SetDate } from "../Page1/components/inner components/SetDate";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { setInfoOfPlayer } from "../states/slices/playerInfoSlice";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegistratedUser] = useAuthState(auth);
  const rivalClub = useSelector((state) => state.rivalClub.rivalClub);
  const myClub = useSelector((state) => state.myClub.myClub);

  function openAuthWindow() {
    navigate("/Auth");
  }
  async function logout() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <header className="header">
      <div className="block">
        <NavLink to={"/"} style={{ backgroundColor: "transparent" }}>
          <button
            type="button"
            className="home"
            onClick={() => dispatch(setInfoOfPlayer(null))}
          >
            <img src="/photos/home.jpg" alt="" />
          </button>
        </NavLink>
        <img src={isRegistratedUser?.photoURL} alt="" />
        <h2>{isRegistratedUser?.displayName || isRegistratedUser?.email}</h2>
      </div>
      {(rivalClub.length !== 0 || myClub.length !== 0) && (
        <div className="matchup">
          {rivalClub.length !== 0 && <img src={rivalClub.logo} alt=""></img>}
          vs
          {myClub.length !== 0 && <img src={myClub.logo} alt=""></img>}
        </div>
      )}
      {isRegistratedUser ? (
        <div className="block" style={{ justifyContent: "end" }}>
          <SetDate />
          <button className="logout" onClick={logout}>
            <div>Log out</div>
          </button>
        </div>
      ) : (
        <div className="block" style={{ justifyContent: "end" }}>
          <SetDate />
          <button className="login" onClick={openAuthWindow}>
            <div>Log in</div>
          </button>
        </div>
      )}
    </header>
  );
}
