import { NavLink, useNavigate } from "react-router-dom";
import { RowsForPersonalInfo } from "./components/RowsForPersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import { setShowPersonalInfo } from "../states/reducers/showPersonalInfoReducer";
import Diagramm from "./components/Diagramm";

export function PersonalInformationOfPlayer({ link }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerInfo = useSelector((state) => state.playerInfo);

  function goHome() {
    (link === "Service" || link === "Attack") && navigate("/");
    link === "page1" && dispatch(setShowPersonalInfo(false));
  }
  function showPerson() {
    dispatch(setShowPersonalInfo(false));
  }
  const infosOfPlayers = [];
  for (let key in playerInfo) {
    infosOfPlayers.push([key, playerInfo[key]]);
  }
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
                .slice(17, 20)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0].replace(/[a-z]/g, "")}
                    value={`|${info[1].join("|")}|`}
                    key={index + 17}
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
                    <NavLink
                      to={"/attack?playerId=" + playerInfo.id}
                      onClick={() => showPerson()}
                    >
                      Attack
                    </NavLink>
                  )}
                  <NavLink
                    to={"/service?playerId=" + playerInfo.id}
                    onClick={() => showPerson()}
                  >
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
