import { NavLink } from "react-router-dom";
export function PersonalInformationOfPlayer({ player, onClick, style }) {
  function conicGradientsData(index) {
    let totalAtt = [];
    totalAtt.push(player.winPoints);
    totalAtt.push(player.leftInGame);
    totalAtt.push(player.attacksInBlock);
    totalAtt.push(player.loosePoints);
    const new2 = totalAtt.reduce((a, b) => a + b, 0);
    const result = totalAtt.map((player) => Math.round((player / new2) * 100));
    return result[index];
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
            <div className="row">
              <NavLink to={"/attack?playerId=" + player.id}>Attack</NavLink>
              <NavLink to={"/service?playerId=" + player.id}>Service</NavLink>
              <button onClick={onClick}>Cancel</button>
            </div>
          </div>
          <img src={player.photo} alt="" className="photoPlayer" />
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: `50%`,
              background: `conic-gradient(lightgreen 0%  ${conicGradientsData(
                0
              )}%,yellow  ${conicGradientsData(0)}%  ${
                conicGradientsData(0) + conicGradientsData(1)
              }%,orange ${conicGradientsData(0) + conicGradientsData(1)}% ${
                conicGradientsData(0) +
                conicGradientsData(1) +
                conicGradientsData(2)
              }%,orangered  ${
                conicGradientsData(0) +
                conicGradientsData(1) +
                conicGradientsData(2)
              }%)`,
              border: "1px solid black",
            }}
          ></div>
          <div className="legend">
            <div className="legendRows">
              <label style={{ backgroundColor: "lightgreen" }}></label>
              <div>Win points percentage</div>
            </div>
            <div className="legendRows">
              <label style={{ backgroundColor: "yellow" }}></label>
              <div>Left in the game percentage</div>
            </div>
            <div className="legendRows">
              <label style={{ backgroundColor: "orange" }}></label>
              <div>Attacks in block percentage</div>
            </div>
            <div className="legendRows">
              <label style={{ backgroundColor: "orangered" }}></label>
              <div>Loose points percentage</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
