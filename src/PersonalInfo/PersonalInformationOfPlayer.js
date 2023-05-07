import { NavLink, useNavigate } from "react-router-dom";
import { RowsForPersonalInfo } from "./components/RowsForPersonalInfo";
import { RowsForLegendAndDiagramm } from "./components/RowsForLegend&Diagramm";
import { useDispatch, useSelector } from "react-redux";
import { setShowPersonalInfo } from "../states/reducers/showPersonalInfoReducer";
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
  const backGrounds = [
    ["lightgreen", "Win points", "Aces and /"],
    ["yellow", "Left in the game", "Rec on ! and -"],
    ["orange", "Attacks in block", "Rec on + and #"],
    ["orangered", "Loose points", "Failed Services"],
  ];

  function rightPercentageForDiagramm(index) {
    if (link === "Attack") {
      let totalAtt = [
        playerInfo.winPoints,
        playerInfo.leftInGame,
        playerInfo.attacksInBlock,
        playerInfo.loosePoints,
      ];
      const sumOfTotalAtt = totalAtt.reduce((a, b) => a + b, 0.001);
      const percentOfActions = totalAtt.map((att) =>
        Math.round((att / sumOfTotalAtt) * 100)
      );
      return percentOfActions[index];
    } else if (link === "Service") {
      let totalService = [
        playerInfo.aces,
        playerInfo.servicePlus,
        playerInfo.serviceMinus,
        playerInfo.serviceFailed,
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
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: `50%`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 50,
                  fontWeight: "bold",
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
              >
                {link === "Attack"
                  ? playerInfo.plusMinusOnAttack >= 0
                    ? `+${playerInfo.plusMinusOnAttack}`
                    : playerInfo.plusMinusOnAttack
                  : playerInfo.plusMinusOnService >= 0
                  ? `+${playerInfo.plusMinusOnService}`
                  : playerInfo.plusMinusOnService}
              </div>
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
