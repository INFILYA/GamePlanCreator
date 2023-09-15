import { NavLink } from "react-router-dom";
import { RowsForPersonalInfo } from "./components/RowsForPersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import Diagramm from "./components/Diagramm";
import { compare } from "../Datas/api";
import { upgradeAge } from "../StaticHelpModules/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { setInfoOfPlayer } from "../states/slices/playerInfoSlice";
import { useState } from "react";

export function PersonalInformationOfPlayer({ link }) {
  const dispatch = useDispatch();
  const [isRegistratedUser] = useAuthState(auth);
  const [showDetails, setShowDetails] = useState(false);
  const playerInfo = upgradeAge(useSelector((state) => state.playerInfo.playerInfo));
  const page1 = link === "page1";
  const service = link === "Service";
  const attack = link === "Attack";
  const libero = playerInfo.position === "Libero";
  const setter = playerInfo.position === "Setter";
  const mblocker = playerInfo.position === "MBlocker";
  const reciever = playerInfo.position === "Reciever";
  const opposite = playerInfo.position === "Opposite";
  const infosOfPlayers = Object.entries(playerInfo);
  const details = showDetails ? "Hide details" : "Show details";
  infosOfPlayers.sort((a, b) => compare(a, b));
  // По позиціям
  const attackers = [
    infosOfPlayers[1],
    infosOfPlayers[9],
    infosOfPlayers[10],
    infosOfPlayers[15],
    infosOfPlayers[20],
    infosOfPlayers[21],
  ];
  const infosOfAttackers =
    (attack && [...attackers, infosOfPlayers[18]]) ||
    (service && [...attackers, infosOfPlayers[19]]) ||
    attackers;
  const setters = [
    infosOfPlayers[1],
    infosOfPlayers[2],
    infosOfPlayers[3],
    infosOfPlayers[6],
    infosOfPlayers[9],
    infosOfPlayers[10],
  ];
  const infosOfSetters = (service && [...setters, infosOfPlayers[8]]) || setters;
  const mBlockers = [
    infosOfPlayers[1],
    infosOfPlayers[6],
    infosOfPlayers[7],
    infosOfPlayers[12],
    infosOfPlayers[17],
    infosOfPlayers[18],
  ];
  const infosOfMBlockers =
    (attack && [...mBlockers, infosOfPlayers[15]]) ||
    (service && [...mBlockers, infosOfPlayers[16]]) ||
    mBlockers;
  const infoOfLiberos = [
    infosOfPlayers[0],
    infosOfPlayers[1],
    infosOfPlayers[2],
    infosOfPlayers[5],
    infosOfPlayers[7],
    infosOfPlayers[8],
  ];
  return (
    <>
      <div className="hidden-player-information-wrapper">
        <div className="player-surname-wrapper">
          <h2>
            {playerInfo.name} №{playerInfo.number}
          </h2>
        </div>
        <div className="player-full-info-wrapper">
          <div className="player-info-content">
            <div className="player-info-data-wrapper">
              {libero &&
                infoOfLiberos.map((info, index) => (
                  <RowsForPersonalInfo name={info[0]} value={info[1]} key={index} />
                ))}
              {(reciever || opposite) &&
                infosOfAttackers.map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0]?.replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index}
                  />
                ))}
              {setter &&
                infosOfSetters.map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0]?.replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index}
                  />
                ))}
              {mblocker &&
                infosOfMBlockers.map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0]?.replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index}
                  />
                ))}
              <nav>
                {!libero && isRegistratedUser && (
                  <>
                    {!setter && <NavLink to={"/attack?playerId=" + playerInfo.id}>Attack</NavLink>}
                    <NavLink to={"/service?playerId=" + playerInfo.id}>Service</NavLink>
                  </>
                )}
                {page1 && <button onClick={() => dispatch(setInfoOfPlayer(null))}>Cancel</button>}
              </nav>
            </div>
            <div className="photo-player-wrapper">
              <div className="photo-player-container">
                <img src={playerInfo.photo} alt="" />
              </div>
            </div>
          </div>
        </div>
        {isRegistratedUser && !libero && (
          <button
            className="show-details"
            onClick={() => setShowDetails(!showDetails)}
            style={showDetails ? { backgroundColor: "orangered", color: "white" } : {}}
          >
            {details}
          </button>
        )}
        {showDetails && (
          <div className="player-diagramm-wrapper">
            {(page1 || service) && (
              <div className="row">
                <Diagramm link={"Service"} />
              </div>
            )}
            {!setter && (page1 || attack) && (
              <div className="row">
                <Diagramm link={"Attack"} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
