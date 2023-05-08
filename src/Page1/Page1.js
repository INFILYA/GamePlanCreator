import "../css/firstPage.css";
import "../css/labels.css";
import "../css/distribution.css";
import "../css/newAttack.css";
import "../css/service.css";
import "../css/ratings.css";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { fetchPlayers } from "../states/reducers/listOfPlayersReducer";
import { fetchTeams } from "../states/reducers/listOfTeamsReducer";
import { useDispatch } from "react-redux";
import { FirstPage } from "./components/FirstPage";

export default function Page1() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchTeams());
  }, [dispatch]);
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
