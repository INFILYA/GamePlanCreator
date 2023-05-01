import "../cssData/firstPage.css";
import "../cssData/labels.css";
import "../cssData/distribution.css";
import "../cssData/newAttack.css";
import "../cssData/service.css";
import "../cssData/diagramm.css";
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
      <div className="showDistribution">
        <NavLink to={"/Distribution"}>Distribution</NavLink>
      </div>
      <Outlet />
    </>
  );
}
