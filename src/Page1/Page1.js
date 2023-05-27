import "../css/firstPage.css";
import "../css/labels.css";
import "../css/distribution.css";
import "../css/newAttack.css";
import "../css/service.css";
import "../css/ratings.css";
import { NavLink } from "react-router-dom";
import { FirstPage } from "./components/FirstPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

export default function Page1() {
  const [isRegistratedUser] = useAuthState(auth);
  return (
    <>
      <FirstPage />
      {isRegistratedUser && (
        <div className="showRatings">
          <NavLink to={"/Ratings"}>Ratings</NavLink>
          <NavLink to={"/Distribution"}>Distribution</NavLink>
        </div>
      )}
    </>
  );
}
