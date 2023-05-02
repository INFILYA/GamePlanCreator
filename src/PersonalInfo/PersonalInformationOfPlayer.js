import { NavLink, useNavigate } from "react-router-dom";
import { RowsForPersonalInfo } from "./components/RowsForPersonalInfo";
import { RowsForLegendAndDiagramm } from "./components/RowsForLegend&Diagramm";
import { useDispatch } from "react-redux";
import { setInfoOfPlayer } from "../states/reducers/playerInfoReducer";
export function PersonalInformationOfPlayer({ link, player }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function setPlayerInfo(player) {
    dispatch(setInfoOfPlayer(player));
  }
  function goHome() {
    (link === "Service" || link === "Attack") && navigate("/");
    setPlayerInfo(null);
  }
  const infosOfPlayers = [];
  for (let key in player) {
    infosOfPlayers.push([key, player[key]]);
  }
  const backGrounds = [
    ["lightgreen", "Win points", "Aces"],
    ["yellow", "Left in the game", "Rec on / and -"],
    ["orange", "Attacks in block", "Rec on + and #"],
    ["orangered", "Loose points", "Failed Services"],
  ];

  function rightPercentageForDiagramm(index) {
    if (link === "Attack") {
      let totalAtt = [
        player.winPoints,
        player.leftInGame,
        player.attacksInBlock,
        player.loosePoints,
      ];
      const sumOfTotalAtt = totalAtt.reduce((a, b) => a + b, 0.001);
      const percentOfActions = totalAtt.map((att) =>
        Math.round((att / sumOfTotalAtt) * 100)
      );
      return percentOfActions[index];
    } else if (link === "Service") {
      let totalService = [
        player.aces,
        player.servicePlus,
        player.serviceMinus,
        player.serviceFailed,
      ];
      const sumOfTotalService = totalService.reduce((a, b) => a + b, 0.001);
      const percentOfActions = totalService.map((service) =>
        Math.round((service / sumOfTotalService) * 100)
      );
      return percentOfActions[index];
    }
  }
  return (
    <>
      <div className="hideIcon">
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          {player.name} №{player.number}
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
            {infosOfPlayers.slice(5, 9).map((info, index) => (
              <RowsForPersonalInfo
                name={info[0]}
                value={info[1]}
                key={index + 5}
              />
            ))}
            {link === "Service" &&
              infosOfPlayers
                .slice(18, 21)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0]}
                    value={`|${info[1].join("|")}|`}
                    key={index + 18}
                  />
                ))}
            {link === "Attack" &&
              infosOfPlayers
                .slice(11, 14)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0]}
                    value={`|${info[1].join("|")}|`}
                    key={index + 11}
                  />
                ))}

            <div className="row" style={{ justifyContent: "space-evenly" }}>
              {player.position !== "Libero" && (
                <>
                  {player.position !== "Setter" && (
                    <NavLink to={"/attack?playerId=" + player.id}>
                      Attack
                    </NavLink>
                  )}
                  <NavLink to={"/service?playerId=" + player.id}>
                    Service
                  </NavLink>
                </>
              )}
              <button onClick={() => goHome()}>Cancel</button>
            </div>
          </div>
          <img src={player.photo} alt="" className="photoPlayer" />
          {(link === "Service" || link === "Attack") && (
            <div style={{ display: "block" }}>
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: `50%`,
                  background: `conic-gradient(lightgreen 0%  ${rightPercentageForDiagramm(
                    0
                  )}%,yellow  ${rightPercentageForDiagramm(0)}%  ${
                    rightPercentageForDiagramm(0) +
                    rightPercentageForDiagramm(1)
                  }%,orange ${
                    rightPercentageForDiagramm(0) +
                    rightPercentageForDiagramm(1)
                  }% ${
                    rightPercentageForDiagramm(0) +
                    rightPercentageForDiagramm(1) +
                    rightPercentageForDiagramm(2)
                  }%,orangered  ${
                    rightPercentageForDiagramm(0) +
                    rightPercentageForDiagramm(1) +
                    rightPercentageForDiagramm(2)
                  }%)`,
                  border: "1px solid black",
                }}
              ></div>
              <div className="legend">
                {backGrounds.map((background, index) => (
                  <RowsForLegendAndDiagramm
                    style={{ backgroundColor: background[0] }}
                    label={rightPercentageForDiagramm(index)}
                    name={
                      (link === "Attack" && background[1]) ||
                      (link === "Service" && background[2])
                    }
                    key={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
