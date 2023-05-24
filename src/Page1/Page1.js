import "../css/firstPage.css";
import "../css/labels.css";
import "../css/distribution.css";
import "../css/newAttack.css";
import "../css/service.css";
import "../css/ratings.css";
import { NavLink } from "react-router-dom";
import { FirstPage } from "./components/FirstPage";
import { useSelector } from "react-redux";

export default function Page1() {
  const isRegistratedUser = useSelector((state) => state.isRegistratedUser);
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
