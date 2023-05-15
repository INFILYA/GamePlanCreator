import { NavLink, useNavigate } from "react-router-dom";
import { RowsForPersonalInfo } from "./components/RowsForPersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import Diagramm from "./components/Diagramm";
import { setInfoOfPlayer } from "../states/reducers/playerInfoReducer";

export function PersonalInformationOfPlayer({ link }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => state.playerInfo);

  function goHome() {
    navigate("/");
    dispatch(setInfoOfPlayer(null));
  }
  const infosOfPlayers = Object.entries(playerInfo);
  return (
    <>
      <div className="hideIcon">
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          {playerInfo.name} №{playerInfo.number}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="info">
            {infosOfPlayers.slice(1, 4).map((info, index) => (
              <RowsForPersonalInfo
                name={info[0]}
                value={info[1]}
                key={index + 1}
              />
            ))}
            {infosOfPlayers.slice(5, 8).map((info, index) => (
              <RowsForPersonalInfo
                name={info[0]}
                value={info[1]}
                key={index + 5}
              />
            ))}
            {link === "Service" &&
              playerInfo.position !== "Setter" &&
              infosOfPlayers
                .slice(22, 24)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index + 22}
                  />
                ))}
            {link === "Service" &&
              playerInfo.position !== "Setter" &&
              infosOfPlayers
                .slice(19, 22)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/[a-z]/g, "")}
                    value={`|${info[1].join("|")}|`}
                    key={index + 19}
                  />
                ))}
            {link === "Service" &&
              playerInfo.position === "Setter" &&
              infosOfPlayers
                .slice(13, 15)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/plusMinusOn/g, "+/- ")}
                    value={info[1]}
                    key={index + 13}
                  />
                ))}
            {link === "Service" &&
              playerInfo.position === "Setter" &&
              infosOfPlayers
                .slice(10, 13)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/[a-z]/g, "")}
                    value={`|${info[1].join("|")}|`}
                    key={index + 10}
                  />
                ))}
            {link === "Attack" &&
              infosOfPlayers
                .slice(13, 15)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0]
                      .replace(/plusMinusOn/g, "+/- ")
                      .replace(/percentOf/g, "% ")}
                    value={info[1]}
                    key={index + 13}
                  />
                ))}
            {link === "Attack" &&
              infosOfPlayers
                .slice(10, 13)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/[a-z]/g, "")}
                    value={`|${info[1].join("|")}|`}
                    key={index + 10}
                  />
                ))}
            <div className="row" style={{ justifyContent: "space-evenly" }}>
              {playerInfo.position !== "Libero" && (
                <>
                  {playerInfo.position !== "Setter" && (
                    <NavLink to={"/attack?playerId=" + playerInfo.id}>
                      Attack
                    </NavLink>
                  )}
                  <NavLink to={"/service?playerId=" + playerInfo.id}>
                    Service
                  </NavLink>
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
