import { Route, Routes } from "react-router-dom";
import Distribution from "./Distribution/Distribution";
import Attacks from "./AttackPage/Attack";
import Service from "./AttackPage/Service";
import Page1 from "./Page1/Page1";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
import { setUserVersion } from "./states/reducers/userVersionReducer";

function Myproject() {
  const dispatch = useDispatch();
  const changeLanguage = useSelector((state) => state.changeLanguage);
  const isShowedTutorial = useSelector((state) => state.isShowedTutorial);
  const clubsCollectionRefs = collection(dataBase, "clubs");
  const playersCollectionRefs = collection(dataBase, "players");
  const currentVersion = collection(dataBase, "versionChecker");
  const userVersion = JSON.parse(localStorage.getItem("userVersion")) || null;
  useEffect(() => {
    async function checkVersionOfData() {
      try {
        const data = await getDocs(currentVersion);
        const list = data.docs.map((doc) => doc.data());
        const adminVersion = list[0].currentVersion;
        dispatch(setUserVersion(adminVersion));
        if (adminVersion === userVersion) {
          dispatch(setAllTeams(JSON.parse(localStorage.getItem("clubs"))));
          dispatch(setAllPlayers(JSON.parse(localStorage.getItem("players"))));
          console.log(`Versions are equal ${userVersion} = ${adminVersion}`);
          return;
        }
        if (adminVersion !== userVersion) {
          localStorage.setItem("userVersion", JSON.stringify(adminVersion));
          getTeams();
          getPlayers();
          console.log(`Versions are not equal ${userVersion} != ${adminVersion}`);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
    async function getPlayers() {
      try {
        const data = await getDocs(playersCollectionRefs);
        const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const sortedPlayers = [...list].sort((a, b) => compare(a.number, b.number));
        dispatch(setAllPlayers(sortedPlayers));
        localStorage.setItem("players", JSON.stringify(sortedPlayers));
      } catch (error) {
        console.error(error);
      }
    }
    async function getTeams() {
      try {
        const data = await getDocs(clubsCollectionRefs);
        const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const sortedTeams = [...list].sort((a, b) => compare(a.number, b.number));
        dispatch(setAllTeams(sortedTeams));
        localStorage.setItem("clubs", JSON.stringify(sortedTeams));
      } catch (error) {
        console.error(error);
      }
    }
    checkVersionOfData();
  }, [dispatch, playersCollectionRefs, clubsCollectionRefs, currentVersion, userVersion]);
  const TUTORIAL = !changeLanguage ? UKRTUTORIAL : ENGTUTORIAL;
  return (
    <>
      {!isShowedTutorial && (
        <div className="textForTutorial">
          {TUTORIAL.map((card, index) => (
            <Tutorial text={card} key={index} />
          ))}
        </div>
      )}
      <div className="firstpage">
        <Auth />
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
