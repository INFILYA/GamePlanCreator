import { NavLink, useNavigate } from "react-router-dom";
import { RowsForPersonalInfo } from "./components/RowsForPersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import Diagramm from "./components/Diagramm";
import { setInfoOfPlayer } from "../states/reducers/playerInfoReducer";
import { compare } from "../Datas/api";

export function PersonalInformationOfPlayer({ link }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => state.playerInfo);
  console.log(playerInfo);
  function goHome() {
    navigate("/");
    dispatch(setInfoOfPlayer(null));
  }

  const infosOfPlayers = Object.entries(playerInfo);
  infosOfPlayers.sort((a, b) => compare(a, b));
  const infosOfAttackers = [
    infosOfPlayers[1],
    infosOfPlayers[17],
    infosOfPlayers[18],
    infosOfPlayers[6],
    infosOfPlayers[7],
    infosOfPlayers[12],
  ];
  const infoOfLibero = [
    infosOfPlayers[0],
    infosOfPlayers[1],
    infosOfPlayers[2],
    infosOfPlayers[5],
    infosOfPlayers[7],
    infosOfPlayers[8],
  ];
  console.log(infosOfPlayers);
  return (
    <>
      <div className="hideIcon">
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          {playerInfo.name} №{playerInfo.number}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="info">
            {playerInfo.position !== "Libero"
              ? infosOfAttackers.map((info, index) => (
                  <RowsForPersonalInfo name={info[0]} value={info[1]} key={index} />
                ))
              : infoOfLibero.map((info, index) => (
                  <RowsForPersonalInfo name={info[0]} value={info[1]} key={index} />
                ))}
            {link === "Attack" &&
              infosOfPlayers
                .slice(2, 5)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/[a-z]/g, "")}
                    value={`|${info[1].join("|")}|`}
                    key={index + 2}
                  />
                ))}
            {link === "Attack" &&
              infosOfPlayers
                .slice(15, 16)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index + 15}
                  />
                ))}
            {link === "Service" &&
              infosOfPlayers
                .slice(22, 25)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/[a-z]/g, "")}
                    value={`|${info[1].join("|")}|`}
                    key={index + 22}
                  />
                ))}
            {link === "Service" &&
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
              {playerInfo.position !== "Libero" && (
                <>
                  {playerInfo.position !== "Setter" && (
                    <NavLink to={"/attack?playerId=" + playerInfo.id}>Attack</NavLink>
                  )}
                  <NavLink to={"/service?playerId=" + playerInfo.id}>Service</NavLink>
                </>
              )}
              <button onClick={() => goHome()}>Cancel</button>
            </div>
          </div>
          <img src={playerInfo.photo} alt="" className="photoPlayer" />
          {(link === "Service" || link === "Attack") && (
            <div style={{ display: "block" }}>
              <Diagramm link={link} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
