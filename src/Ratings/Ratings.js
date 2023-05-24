import { NavLink, Outlet } from "react-router-dom";
import ShapeForRatings from "./ShapeForRatings";

export function MiddleBlockersRating() {
  return <ShapeForRatings amplua={"MBlocker"} />;
}
export function LiberosRating() {
  return <ShapeForRatings amplua={"Libero"} />;
}
export function OppositesRating() {
  return <ShapeForRatings amplua={"Opposite"} />;
}
export function SettersRating() {
  return <ShapeForRatings amplua={"Setter"} />;
}
export function RecieversRating() {
  return <ShapeForRatings amplua={"Reciever"} />;
}
export function TeamsRating() {
  return <ShapeForRatings amplua={"teams"} />;
}

export function Ratings() {
  return (
    <>
      <h1>Ratings</h1>
      <div className="showRatings">
        <NavLink to={"/Ratings/RecieversRating"}>Recievers</NavLink>
        <NavLink to={"/Ratings/OppositesRating"}>Opposites</NavLink>
        <NavLink to={"/Ratings/MiddleBlockersRating"}>MiddleBlockers</NavLink>
        <NavLink to={"/Ratings/SettersRating"}>Setters</NavLink>
        {/* <NavLink to={"/Ratings/LiberosRating"}>Liberos</NavLink> */}
        <NavLink to={"/Ratings/TeamsRating"}>Teams</NavLink>
      </div>
      <Outlet />
    </>
  );
}
