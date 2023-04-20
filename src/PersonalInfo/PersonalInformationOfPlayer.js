import { NavLink } from "react-router-dom";
export function PersonalInformationOfPlayer({ player, onClick, style, link }) {
  function countRightPercentageForDiagramm(index) {
    let totalAtt = [
      player.winPoints,
      player.leftInGame,
      player.attacksInBlock,
      player.loosePoints,
    ];
    const sumOfTotalAtt = totalAtt.reduce((a, b) => a + b, 0.001);
    const percentOfActions = totalAtt.map((player) =>
      Math.round((player / sumOfTotalAtt) * 100)
    );
    return percentOfActions[index];
  }
  return (
    <>
      <div className="hideIcon" style={style}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          {player.name} №{player.number}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="info">
            <div className="row">
              <div>Age:</div>
              <div>{player.age}</div>
            </div>
            <div className="row">
              <div>Height:</div>
              <div>{player.height}</div>
            </div>
            <div className="row">
              <div>Weight:</div>
              <div>{player.weight}</div>
            </div>
            <div className="row">
              <div>Hand:</div>
              <div>{player.hand}</div>
            </div>
            <div className="row">
              <div>Reach:</div>
              <div>{player.reach}</div>
            </div>
            <div className="row">
              <div>Position:</div>
              <div>{player.position}</div>
            </div>
            {link === "Attack" && (
              <>
                {player.position === "Opposite" ? (
                  <>
                    <div className="row">
                      <div>Attack zone 1:</div>
                      <div>|{player.attackZone1.join("|")}|</div>
                    </div>
                    <div className="row">
                      <div>Attack zone 2:</div>
                      <div>|{player.attackZone2.join("|")}|</div>
                    </div>
                    <div className="row">
                      <div>Attack zone 4:</div>
                      <div>|{player.attackZone4.join("|")}|</div>
                    </div>
                  </>
                ) : null}
                {player.position === "Reciever" ? (
                  <>
                    <div className="row">
                      <div>Attack zone 2:</div>
                      <div>|{player.attackZone2.join("|")}|</div>
                    </div>
                    <div className="row">
                      <div>Attack zone 4:</div>
                      <div>|{player.attackZone4.join("|")}|</div>
                    </div>
                    <div className="row">
                      <div>Attack pipe:</div>
                      <div>|{player.attackPipe.join("|")}|</div>
                    </div>
                  </>
                ) : null}
                {player.position === "MBlocker" ? (
                  <>
                    <div className="row">
                      <div>Attack K1:</div>
                      <div>|{player.attackK1.join("|")}|</div>
                    </div>
                    <div className="row">
                      <div>Attack KC:</div>
                      <div>|{player.attackKC.join("|")}|</div>
                    </div>
                    <div className="row">
                      <div>Attack K7:</div>
                      <div>|{player.attackK7.join("|")}|</div>
                    </div>
                  </>
                ) : null}
              </>
            )}
            {link === "Service" && (
              <>
                <div className="row">
                  <div>Service from zone 1:</div>
                  <div>|{player.serviceZone1.join("|")}|</div>
                </div>
                <div className="row">
                  <div>Service from zone 6:</div>
                  <div>|{player.serviceZone6.join("|")}|</div>
                </div>
                <div className="row">
                  <div>Service from zone 5:</div>
                  <div>|{player.serviceZone5.join("|")}|</div>
                </div>
              </>
            )}
            <div className="row">
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
          {player.position !== "Setter" && link === "Attack" && (
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: `50%`,
                  background: `conic-gradient(lightgreen 0%  ${countRightPercentageForDiagramm(
                    0
                  )}%,yellow  ${countRightPercentageForDiagramm(0)}%  ${
                    countRightPercentageForDiagramm(0) +
                    countRightPercentageForDiagramm(1)
                  }%,orange ${
                    countRightPercentageForDiagramm(0) +
                    countRightPercentageForDiagramm(1)
                  }% ${
                    countRightPercentageForDiagramm(0) +
                    countRightPercentageForDiagramm(1) +
                    countRightPercentageForDiagramm(2)
                  }%,orangered  ${
                    countRightPercentageForDiagramm(0) +
                    countRightPercentageForDiagramm(1) +
                    countRightPercentageForDiagramm(2)
                  }%)`,
                  border: "1px solid black",
                }}
              ></div>
              <div className="legend">
                <div className="legendRows">
                  <label style={{ backgroundColor: "lightgreen" }}>
                    {countRightPercentageForDiagramm(0)}%
                  </label>
                  <div>Win points</div>
                </div>
                <div className="legendRows">
                  <label style={{ backgroundColor: "yellow" }}>
                    {countRightPercentageForDiagramm(1)}%
                  </label>
                  <div>Left in the game</div>
                </div>
                <div className="legendRows">
                  <label style={{ backgroundColor: "orange" }}>
                    {countRightPercentageForDiagramm(2)}%
                  </label>
                  <div>Attacks in block</div>
                </div>
                <div className="legendRows">
                  <label style={{ backgroundColor: "orangered" }}>
                    {countRightPercentageForDiagramm(3)}%
                  </label>
                  <div>Loose points</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
