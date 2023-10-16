import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Diagramm from "./components/Diagramm";
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
  const details = showDetails ? "Hide details" : "Show details";
  return (
    <div className="hidden-player-information-wrapper">
      <div className="player-surname-wrapper">
        <h2>
          {playerInfo.name} №{playerInfo.number}
        </h2>
      </div>
      <div className="player-full-info-wrapper">
        <div className="player-info-content">
          <div className="player-info-data-wrapper">
            <div className="player-info-row-wrapper">
              <div>Age: {playerInfo.age}</div>
            </div>
            <div className="player-info-row-wrapper">
              <div>Dominant hand: {playerInfo.hand}</div>
            </div>
            <div className="player-info-row-wrapper">
              <div>Height: {playerInfo.height}</div>
            </div>
            <div className="player-info-row-wrapper">
              <div>Reach: {playerInfo.reach}</div>
            </div>
            <div className="player-info-row-wrapper">
              <div>Position: {playerInfo.position}</div>
            </div>
            {service && (
              <div className="player-info-row-wrapper">
                <div>Service Plus : {playerInfo?.plusMinusOnService}</div>
              </div>
            )}
            {attack && (
              <div className="player-info-row-wrapper">
                <div>Attack Plus : {playerInfo?.plusMinusOnAttack}</div>
              </div>
            )}
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
              <Diagramm link="Service" />
            </div>
          )}
          {!setter && (page1 || attack) && (
            <div className="row">
              <Diagramm link="Attack" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
