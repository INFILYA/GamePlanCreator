import { Route, Routes } from "react-router-dom";
import Distribution from "./Distribution/Distribution";
import Attacks from "./AttackPage/Attack";
import Service from "./AttackPage/Service";
import Page1 from "./Page1/Page1";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAllPlayers } from "./states/reducers/listOfPlayersReducer";
import { setAllTeams } from "./states/reducers/listOfTeamsReducer";
import { Auth } from "./Page1/components/Auth";
import "../src/css/newTutorial.css";

import {
  LiberosRating,
  MiddleBlockersRating,
  OppositesRating,
  Ratings,
  RecieversRating,
  SettersRating,
  TeamsRating,
} from "./Ratings/Ratings";
import { dataBase } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { compare } from "./Datas/api";
import { ENGTUTORIAL, UKRTUTORIAL } from "./StaticHelpModules/Button";
import { Tutorial } from "./Tutorial";

function Myproject() {
  const dispatch = useDispatch();
  const changeLanguage = useSelector((state) => state.changeLanguage);
  const clubsCollectionRefs = collection(dataBase, "clubs");
  const playersCollectionRefs = collection(dataBase, "players");
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    async function getCollection(collection, type) {
      try {
        const data = await getDocs(collection);
        const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const sortedList = [...list].sort((a, b) => compare(a.number, b.number));
        type === "club" ? dispatch(setAllTeams(sortedList)) : dispatch(setAllPlayers(sortedList));
      } catch (error) {
        console.error(error);
      }
    }
    getCollection(clubsCollectionRefs, "club");
    getCollection(playersCollectionRefs, "players");
    setTimeout(() => setRefreshPage(true), 500);
  }, [dispatch, playersCollectionRefs, clubsCollectionRefs]);
  const TUTORIAL = !changeLanguage ? UKRTUTORIAL : ENGTUTORIAL;
  return (
    <>
      <div className="textForTutorial">
        {TUTORIAL.map((card, index) => (
          <Tutorial text={card} key={index} />
        ))}
      </div>
      <div className="firstpage">
        {refreshPage && <Auth setRefreshPage={setRefreshPage} />}
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/Ratings" element={<Ratings />}>
            <Route path="/Ratings/RecieversRating" element={<RecieversRating />} />
            <Route path="/Ratings/OppositesRating" element={<OppositesRating />} />
            <Route path="/Ratings/MiddleBlockersRating" element={<MiddleBlockersRating />} />
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
