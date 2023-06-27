import { NavLink } from "react-router-dom";
import { RowsForPersonalInfo } from "./components/RowsForPersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import Diagramm from "./components/Diagramm";
import { compare } from "../Datas/api";
import { upgradeAge } from "../StaticHelpModules/Button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { setInfoOfPlayer } from "../states/slices/playerInfoSlice";

export function PersonalInformationOfPlayer({ link }) {
  const dispatch = useDispatch();
  const [isRegistratedUser] = useAuthState(auth);
  const playerInfo = upgradeAge(useSelector((state) => state.playerInfo.playerInfo));
  const page1 = link === "page1";
  const service = link === "Service";
  const attack = link === "Attack";
  const libero = playerInfo.position !== "Libero";
  const setter = playerInfo.position !== "Setter";
  const mblocker = playerInfo.position !== "MBlocker";
  const reciever = playerInfo.position !== "Reciever";
  const opposite = playerInfo.position !== "Opposite";
  const infosOfPlayers = Object.entries(playerInfo);
  infosOfPlayers.sort((a, b) => compare(a, b));
  const infosOfAttackers =
    reciever && opposite
      ? [
          infosOfPlayers[1],
          infosOfPlayers[17],
          infosOfPlayers[18],
          infosOfPlayers[6],
          infosOfPlayers[7],
          infosOfPlayers[12],
        ]
      : [
          infosOfPlayers[1],
          infosOfPlayers[20],
          infosOfPlayers[21],
          infosOfPlayers[9],
          infosOfPlayers[10],
          infosOfPlayers[15],
        ];
  const infoOfLibero = [
    infosOfPlayers[0],
    infosOfPlayers[1],
    infosOfPlayers[2],
    infosOfPlayers[5],
    infosOfPlayers[7],
    infosOfPlayers[8],
  ];
  return (
    <>
      <div className="hideIcon">
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          {playerInfo.name} №{playerInfo.number}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="info">
            {libero
              ? infosOfAttackers.map((info, index) => (
                  <RowsForPersonalInfo name={info[0]} value={info[1]} key={index} />
                ))
              : infoOfLibero.map((info, index) => (
                  <RowsForPersonalInfo name={info[0]} value={info[1]} key={index} />
                ))}
            {attack &&
              isRegistratedUser &&
              mblocker &&
              setter &&
              infosOfPlayers
                .slice(18, 19)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index + 18}
                  />
                ))}
            {attack &&
              isRegistratedUser &&
              reciever &&
              opposite &&
              infosOfPlayers
                .slice(15, 16)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index + 15}
                  />
                ))}
            {service &&
              isRegistratedUser &&
              mblocker &&
              setter &&
              infosOfPlayers
                .slice(19, 20)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index + 19}
                  />
                ))}
            {service &&
              isRegistratedUser &&
              reciever &&
              opposite &&
              infosOfPlayers
                .slice(16, 17)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index + 16}
                  />
                ))}
            <div className="row" style={{ justifyContent: "space-evenly" }}>
              {libero && isRegistratedUser && (
                <>
                  {setter && <NavLink to={"/attack?playerId=" + playerInfo.id}>Attack</NavLink>}
                  <NavLink to={"/service?playerId=" + playerInfo.id}>Service</NavLink>
                </>
              )}
              {page1 && <button onClick={() => dispatch(setInfoOfPlayer(null))}>Cancel</button>}
            </div>
          </div>
          <img src={playerInfo.photo} alt="" className="photoPlayer" />
          {(service || attack) && isRegistratedUser && (
            <div style={{ display: "block" }}>
              <Diagramm link={link} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
