import "../css/firstPage.css";
import "../css/labels.css";
import "../css/distribution.css";
import "../css/newAttack.css";
import "../css/service.css";
import "../css/ratings.css";
import { NavLink, Outlet } from "react-router-dom";
import { FirstPage } from "./components/FirstPage";

export default function Page1() {
  return (
    <>
      <FirstPage />
      <div className="showRatings">
        <NavLink to={"/Ratings"}>Ratings</NavLink>
        <NavLink to={"/Distribution"}>Distribution</NavLink>
      </div>
      <Outlet />
    </>
  );
}
