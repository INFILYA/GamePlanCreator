import { Route, Routes } from "react-router-dom";
import Distribution from "./Distribution/Distribution";
import Attacks from "./AttackPage/Attack";
import Service from "./AttackPage/Service";
import Page1 from "./Page1/Page1";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Auth } from "./Header/components/Auth";
import "../src/css/newTutorial.css";
import "../src/css/newHeader.css";
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
import { ENGTUTORIAL, UKRTUTORIAL } from "./StaticHelpModules/textForTutorial";
import { Tutorial } from "./Tutorial";
import { setUserVersion } from "./states/slices/userVersionSlice";
import { setisShowedTutorial } from "./states/slices/isShowedTutorialSlice";
import { Header } from "./Header/Header";
import { setAllPlayers } from "./states/slices/listOfPlayersSlice";
import { setAllTeams } from "./states/slices/listOfTeamsSlice";

function Myproject() {
  const dispatch = useDispatch();
  const changeLanguage = useSelector((state) => state.changeLanguage.changeLanguage);
  const isShowedTutorial = useSelector((state) => state.isShowedTutorial.isShowedTutorial);
  const userVersion = JSON.parse(localStorage.getItem("userVersion")) || null;

  useEffect(() => {
    async function checkVersionOfData() {
      try {
        const data = await getDocs(collection(dataBase, "versionChecker"));
        const list = data.docs.map((doc) => doc.data());
        const adminVersion = list[0].currentVersion;
        dispatch(setUserVersion(adminVersion));
        if (adminVersion === userVersion) {
          dispatch(setAllPlayers(JSON.parse(localStorage.getItem("players"))));
          dispatch(setAllTeams(JSON.parse(localStorage.getItem("clubs"))));
          console.log(`Versions of DATA are equal ${userVersion} = ${adminVersion}`);
          return;
        }
        if (adminVersion !== userVersion) {
          dispatch(setisShowedTutorial(false));
          localStorage.setItem("isShowedTutorial", JSON.stringify(false));
          localStorage.setItem("userVersion", JSON.stringify(adminVersion));
          getTeams();
          getPlayers();
          console.log(`Versions of DATA are not equal ${userVersion} != ${adminVersion}`);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
    async function getPlayers() {
      try {
        const data = await getDocs(collection(dataBase, "players"));
        const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setAllPlayers(list));
        localStorage.setItem("players", JSON.stringify(list));
      } catch (error) {
        console.error(error);
      }
    }
    async function getTeams() {
      try {
        const data = await getDocs(collection(dataBase, "clubs"));
        const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const sortedTeams = [...list].sort((a, b) => compare(a.number, b.number));
        dispatch(setAllTeams(sortedTeams));
        localStorage.setItem("clubs", JSON.stringify(sortedTeams));
      } catch (error) {
        console.error(error);
      }
    }
    checkVersionOfData();
  }, [dispatch, userVersion]);
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
        <Header />
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/Auth" element={<Auth />} />
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
