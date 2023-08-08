import "../css/firstPage.css";
import "../css/distribution.css";
import "../css/newAttack.css";
import "../css/service.css";
import "../css/ratings.css";
import { NavLink } from "react-router-dom";
import { FirstPage } from "./components/FirstPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../states/slices/playerInfoSlice";

export default function Page1() {
  const dispatch = useDispatch();
  const [isRegistratedUser] = useAuthState(auth);
  const rivalClub = useSelector((state) => state.rivalClub.rivalClub);
  const showRivalClub = rivalClub.length !== 0;

  return (
    <>
      <FirstPage />
      {showRivalClub && isRegistratedUser && (
        <div className="showRatings" style={{ marginTop: -70 }}>
          <NavLink to={"/Ratings"} onClick={() => dispatch(setInfoOfPlayer(null))}>
            Ratings
          </NavLink>
          <NavLink to={"/Distribution"}>Distribution</NavLink>
        </div>
      )}
    </>
  );
}
