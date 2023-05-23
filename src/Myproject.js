import { Route, Routes } from "react-router-dom";
import Distribution from "./Distribution/Distribution";
import Attacks from "./AttackPage/Attack";
import Service from "./AttackPage/Service";
import Page1 from "./Page1/Page1";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setAllPlayers } from "./states/reducers/listOfPlayersReducer";
import { setAllTeams } from "./states/reducers/listOfTeamsReducer";
import { Auth } from "./Page1/components/Auth";
import "../src/css/tutorial.css";

import {
  LiberosRating,
  MiddleBlockersRating,
  OppositesRating,
  Ratings,
  RecieversRating,
  SettersRating,
  TeamsRating,
} from "./Ratings/Ratings";
import { auth, dataBase } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { compare } from "./Datas/api";
import { Button } from "./StaticHelpModules/Button";

function Myproject() {
  const dispatch = useDispatch();
  const clubsCollectionRefs = collection(dataBase, "clubs");
  const playersCollectionRefs = collection(dataBase, "players");
  const [refreshPage, setRefreshPage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [changeLanguage, setChangeLanguage] = useState(false);
  const isRegistratedUser = auth?.currentUser?.uid !== undefined;
  // const user = auth?.currentUser?.displayName;

  useEffect(() => {
    async function getCollection(collection, type) {
      try {
        const data = await getDocs(collection);
        const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const sortedList = [...list].sort((a, b) => compare(+a.id, +b.id));
        type === "club" ? dispatch(setAllTeams(sortedList)) : dispatch(setAllPlayers(sortedList));
      } catch (error) {
        console.error(error);
      }
    }
    getCollection(clubsCollectionRefs, "club");
    getCollection(playersCollectionRefs, "players");
    setTimeout(() => setRefreshPage(true), 500);
  }, [dispatch, playersCollectionRefs, clubsCollectionRefs]);
  function hideTutorial() {
    setShowTutorial(!showTutorial);
  }

  return (
    <>
      <div className="firstpage">
        {showTutorial && !isRegistratedUser && (
          <div className="grab">
            <div className="tutorial">
              <div className="changeLanguage">
                <button
                  onClick={() => setChangeLanguage(true)}
                  style={changeLanguage ? { backgroundColor: "gold" } : null}
                >
                  Eng
                </button>
                <button
                  onClick={() => setChangeLanguage(false)}
                  style={!changeLanguage ? { backgroundColor: "gold" } : null}
                >
                  Ukr
                </button>
              </div>
              {!changeLanguage ? (
                <>
                  <h1>Вітаю!</h1>
                  <span></span>
                  <div className="exit">
                    <Button onClick={hideTutorial} value={"Розпочати роботу"} className="exit" />
                  </div>
                </>
              ) : (
                <>
                  <h1>Welcome!</h1>
                  <span></span>
                  <div className="exit">
                    <Button onClick={hideTutorial} value={"Start Working"} className="exit" />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
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
