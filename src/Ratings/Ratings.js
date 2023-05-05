import { NavLink, Outlet } from "react-router-dom";
import { RegularLabel } from "../Labels/RegularLabel";

export default function Ratings() {
  return (
    <>
      <RegularLabel value={"Ratings"} />
      <div className="showRatings">
        <NavLink to={"/Ratings/RecieversRating"}>Recievers</NavLink>
        <NavLink to={"/Ratings/OppositesRating"}>Opposites</NavLink>
        <NavLink to={"/Ratings/MiddleBlockersRating"}>MiddleBlockers</NavLink>
        <NavLink to={"/Ratings/SettersRating"}>Setters</NavLink>
      </div>
      <Outlet />
    </>
  );
}
