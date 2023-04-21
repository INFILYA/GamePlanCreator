import { NavLink } from "react-router-dom";
import { RowsForPersonalInfo } from "./Rows/RowsForPersonalInfo";
import { RowsForLegendAndDiagramm } from "./Rows/RowsForLegend&Diagramm";
export function PersonalInformationOfPlayer({ player, onClick, link }) {
  const infosOfPlayer = [];
  for (let key in player) {
    infosOfPlayer.push([key, player[key]]);
  }
  const backGrounds = [
    ["lightgreen", "Win points", "Aces"],
    ["yellow", "Left in the game", "Rec on / and -"],
    ["orange", "Attacks in block", "Rec on + and #"],
    ["orangered", "Loose points", "Failed Services"],
  ];
  let totalAtt = [
    player.winPoints,
    player.leftInGame,
    player.attacksInBlock,
    player.loosePoints,
  ];
  let totalService = [
    player.aces,
    player.servicePlus,
    player.serviceMinus,
    player.serviceFailed,
  ];
  console.log(`info => ${totalService}`);
  function rightPercentageForDiagramm(index) {
    if (link === "Attack") {
      const sumOfTotalAtt = totalAtt.reduce((a, b) => a + b, 0.001);
      const percentOfActions = totalAtt.map((att) =>
        Math.round((att / sumOfTotalAtt) * 100)
      );
      return percentOfActions[index];
    } else if (link === "Service") {
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
            {infosOfPlayer.slice(1, 4).map((info, index) => (
              <RowsForPersonalInfo
                name={info[0]}
                value={info[1]}
                key={index + 1}
              />
            ))}
            {infosOfPlayer.slice(5, 9).map((info, index) => (
              <RowsForPersonalInfo
                name={info[0]}
                value={info[1]}
                key={index + 5}
              />
            ))}
            {link === "Service" &&
              infosOfPlayer
                .slice(18, 21)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0]}
                    value={`|${info[1].join("|")}|`}
                    key={index + 17}
                  />
                ))}
            {link === "Attack" &&
              infosOfPlayer
                .slice(11, 14)
                .map((info, index) => (
                  <RowsForPersonalInfo
                    name={info[0]}
                    value={`|${info[1].join("|")}|`}
                    key={index + 10}
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
              <button onClick={onClick}>Cancel</button>
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
