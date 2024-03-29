import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Diagramm from "./components/Diagramm";
import { upgradeAge } from "../StaticHelpModules/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { setInfoOfPlayer } from "../states/slices/playerInfoSlice";
import { useState } from "react";
import { getAttackEfficency, setStyle } from "../Datas/api";
import { getServiceEfficency } from "../Datas/api";
import { getPlusMinusService } from "../Datas/api";
import { getPlusMinusAttack } from "../Datas/api";

export function PersonalInformationOfPlayer({ link }) {
  const dispatch = useDispatch();
  const [isRegistratedUser] = useAuthState(auth);
  const [showDetails, setShowDetails] = useState(true);

  const playerInfo = upgradeAge(useSelector((state) => state.playerInfo.playerInfo));
  const page1 = link === "page1";
  const service = link === "Service";
  const attack = link === "Attack";
  const libero = playerInfo.position === "Libero";
  const setter = playerInfo.position === "Setter";
  const servicePM = getPlusMinusService(playerInfo);
  const attackPM = getPlusMinusAttack(playerInfo);
  return (
    <div className="hidden-player-information-wrapper">
      <div className="player-surname-wrapper">
        <h2 onClick={() => setShowDetails(!showDetails)}>
          {playerInfo.name} №{playerInfo.number}
        </h2>
      </div>
      {showDetails && (
        <div className="player-full-info-wrapper">
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
            {page1 && (
              <div className="player-info-row-wrapper">
                <div>Team : {playerInfo.teamid}</div>
              </div>
            )}
            {service && (
              <div className="player-info-row-wrapper">
                <div>
                  Plus/Minus: <nobr style={setStyle(servicePM)}>{servicePM}</nobr>
                </div>
              </div>
            )}
            {attack && (
              <>
                <div className="player-info-row-wrapper">
                  <div>
                    Plus/Minus: <nobr style={setStyle(attackPM)}>{attackPM}</nobr>
                  </div>
                </div>
              </>
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
            <img src={playerInfo.photo} alt="" />
          </div>
          {!page1 && (
            <div className="player-diagramm-wrapper">
              {service && (
                <>
                  <div className="row">
                    <Diagramm link="Service" />
                  </div>
                  <div className="efficency-wrapper">
                    Efficency:
                    <nobr style={setStyle(getServiceEfficency(playerInfo))}>
                      &nbsp;{getServiceEfficency(playerInfo)}%
                    </nobr>
                  </div>
                </>
              )}
              {!setter && attack && (
                <>
                  <div className="row">
                    <Diagramm link="Attack" />
                  </div>
                  <div className="efficency-wrapper">
                    Efficency:
                    <nobr style={setStyle(getAttackEfficency(playerInfo))}>
                      &nbsp;{getAttackEfficency(playerInfo)}%
                    </nobr>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
