import { Route, Routes } from "react-router-dom";
import Distribution from "./Distribution/Distribution";
import Attacks from "./AttackPage/Attack";
import Service from "./AttackPage/Service";
import Page1 from "./Page1/Page1";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPlayers } from "./states/reducers/listOfPlayersReducer";
import { fetchTeams } from "./states/reducers/listOfTeamsReducer";
import {
  LiberosRating,
  MiddleBlockersRating,
  OppositesRating,
  Ratings,
  RecieversRating,
  SettersRating,
  TeamsRating,
} from "./Ratings/Ratings";

function Myproject() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchTeams());
  }, [dispatch]);
  return (
    <>
      <div className="firstpage">
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/Ratings" element={<Ratings />}>
            <Route
              path="/Ratings/RecieversRating"
              element={<RecieversRating />}
            />
            <Route
              path="/Ratings/OppositesRating"
              element={<OppositesRating />}
            />
            <Route
              path="/Ratings/MiddleBlockersRating"
              element={<MiddleBlockersRating />}
            />
            <Route path="/Ratings/SettersRating" element={<SettersRating />} />
            <Route path="/Ratings/LiberosRating" element={<LiberosRating />} />
            <Route path="/Ratings/TeamsRating" element={<TeamsRating />} />
          </Route>
          <Route path="/Distribution" element={<Distribution />} />
          <Route path="/attack" element={<Attacks />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </div>
    </>
  );
}

export default Myproject;
