import "../css/firstPage.css";
import "../css/labels.css";
import "../css/distribution.css";
import "../css/newAttack.css";
import "../css/service.css";
import "../css/ratings.css";
import { NavLink } from "react-router-dom";
import { FirstPage } from "./components/FirstPage";
import { auth } from "../config/firebase";

export default function Page1() {
  const registratedUser = auth?.currentUser?.uid !== undefined;

  return (
    <>
      <FirstPage />
      <div className="showRatings">
        {registratedUser && <NavLink to={"/Ratings"}>Ratings</NavLink>}
        <NavLink to={"/Distribution"}>Distribution</NavLink>
      </div>
    </>
  );
}
