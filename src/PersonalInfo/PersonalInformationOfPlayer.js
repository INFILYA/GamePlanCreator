import { NavLink } from "react-router-dom";
export function PersonalInformationOfPlayer({ obj, onClick, style }) {
  return (
    <>
      <div className="hideIcon" style={style}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          {obj.name} №{obj.number}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="info">
            <div className="row">
              <div>Age:</div>
              <div>{obj.age}</div>
            </div>
            <div className="row">
              <div>Height:</div>
              <div>{obj.height}</div>
            </div>
            <div className="row">
              <div>Weight:</div>
              <div>{obj.weight}</div>
            </div>
            <div className="row">
              <div>Hand:</div>
              <div>{obj.hand}</div>
            </div>
            <div className="row">
              <div>Reach:</div>
              <div>{obj.reach}</div>
            </div>
            <div className="row">
              <div>Position:</div>
              <div>{obj.position}</div>
            </div>
            {obj.position === "Opposite" ? (
              <>
                <div className="row">
                  <div>Attack zone 1:</div>
                  <div>|{obj.attackZone1.join("|")}|</div>
                </div>
                <div className="row">
                  <div>Attack zone 2:</div>
                  <div>|{obj.attackZone2.join("|")}|</div>
                </div>
                <div className="row">
                  <div>Attack zone 4:</div>
                  <div>|{obj.attackZone4.join("|")}|</div>
                </div>
              </>
            ) : null}
            {obj.position === "Reciever" ? (
              <>
                <div className="row">
                  <div>Attack zone 2:</div>
                  <div>|{obj.attackZone2.join("|")}|</div>
                </div>
                <div className="row">
                  <div>Attack zone 4:</div>
                  <div>|{obj.attackZone4.join("|")}|</div>
                </div>
                <div className="row">
                  <div>Attack pipe:</div>
                  <div>|{obj.attackPipe.join("|")}|</div>
                </div>
              </>
            ) : null}
            {obj.position === "MBlocker" ? (
              <>
                <div className="row">
                  <div>Attack K1:</div>
                  <div>|{obj.attackK1.join("|")}|</div>
                </div>
                <div className="row">
                  <div>Attack KC:</div>
                  <div>|{obj.attackKC.join("|")}|</div>
                </div>
                <div className="row">
                  <div>Attack K7:</div>
                  <div>|{obj.attackK7.join("|")}|</div>
                </div>
              </>
            ) : null}
            <div className="row">
              <NavLink to={"/attack?playerId=" + obj.id}>Attack</NavLink>
              <NavLink to={"/service?playerId=" + obj.id}>Service</NavLink>
              <button onClick={onClick}>Cancel</button>
            </div>
          </div>
          <img src={obj.photo} alt="" className="photoPlayer" />
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: `50%`,
              background: `conic-gradient(green 0% 25%,red 25% 50%,yellow 50% 75%,orange 75% 100%)`,
              border: "1px solid black",
            }}
          ></div>
          <div className="legend">
            <div className="legendRows">
              <label style={{ backgroundColor: "green" }}></label>
              <div>Win points percentage</div>
            </div>
            <div className="legendRows">
              <label style={{ backgroundColor: "red" }}></label>
              <div>Loose points percentage</div>
            </div>
            <div className="legendRows">
              <label style={{ backgroundColor: "yellow" }}></label>
              <div>Left in the game percentage</div>
            </div>
            <div className="legendRows">
              <label style={{ backgroundColor: "orange" }}></label>
              <div>Attacks in block percentage</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
