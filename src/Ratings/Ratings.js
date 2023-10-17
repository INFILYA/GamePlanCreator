import { NavLink, Outlet } from "react-router-dom";
import ShapeForRatings from "./ShapeForRatings";
import SectionWrapper from "../Page1/components/SectionWrapper";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { useSelector } from "react-redux";

export function MiddleBlockersRating() {
  return <ShapeForRatings amplua="MBlocker" />;
}
export function LiberosRating() {
  return <ShapeForRatings amplua="Libero" />;
}
export function OppositesRating() {
  return <ShapeForRatings amplua="Opposite" />;
}
export function SettersRating() {
  return <ShapeForRatings amplua="Setter" />;
}
export function RecieversRating() {
  return <ShapeForRatings amplua="Reciever" />;
}
export function TeamsRating() {
  return <ShapeForRatings amplua="teams" />;
}

export function Ratings() {
  const playerInfo = useSelector((state) => state.playerInfo.playerInfo);

  return (
    <article className="main-content-wrapper">
      <SectionWrapper
        className="ratings-section"
        content={
          <>
            <h1>Ratings</h1>
            {playerInfo ? (
              <PersonalInformationOfPlayer link="page1" />
            ) : (
              <>
                <div className="showRatings-wrapper">
                  <nav>
                    <NavLink to={"/Ratings/RecieversRating"}>Recievers</NavLink>
                    <NavLink to={"/Ratings/OppositesRating"}>Opposites</NavLink>
                    <NavLink to={"/Ratings/MiddleBlockersRating"}>MiddleBlockers</NavLink>
                    <NavLink to={"/Ratings/SettersRating"}>Setters</NavLink>
                    <NavLink to={"/Ratings/TeamsRating"}>Teams</NavLink>
                  </nav>
                </div>
                <div className="rating-table-wrapper">
                  <Outlet />
                </div>
              </>
            )}
          </>
        }
      />
    </article>
  );
}
