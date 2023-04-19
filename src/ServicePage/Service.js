import { useState } from "react";
import { BallForAttack } from "../AttackPage/Attack";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegularLabel from "../Labels/RegularLabel";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { useSelector } from "react-redux";
function Recievers() {
  const [blockHelp, setBlockHelp] = useState(0);
  const classNames = [
    "defenderOff",
    "defenderOn",
    "smallarrowleft",
    "smallarrowright",
  ];
  return (
    <>
      <button
        type="button"
        className={classNames[blockHelp]}
        onClick={() => setBlockHelp((blockHelp + 1) % 4)}
      ></button>
    </>
  );
}
function ConeReaction({
  attackPercentageArray,
  range0,
  range10,
  range40,
  historyOfBalls,
}) {
  function button(zone) {
    return (
      <button
        type="button"
        className={
          (attackPercentageArray < 10 ? range0 + zone : "") ||
          (attackPercentageArray >= 10 && attackPercentageArray < 40
            ? range10 + zone
            : "") ||
          (attackPercentageArray >= 40 ? range40 + zone : "")
        }
      ></button>
    );
  }
  return (
    <>
      {(historyOfBalls[0].active && button("Service1")) ||
        (historyOfBalls[1].active && button("Service6")) ||
        (historyOfBalls[2].active && button("Service5"))}
    </>
  );
}
function InputForCount({ name, handleZoneValue, zoneValue, showInputs }) {
  return (
    <>
      <input
        type="text"
        className="inputForCount"
        name={name}
        onChange={handleZoneValue}
        value={zoneValue}
        style={!showInputs ? { border: "none" } : null}
        readOnly={!showInputs ? true : false}
        required
      ></input>
    </>
  );
}
function ServiceFields() {
  const [historyOfBalls, setHistoryOfBalls] = useState([
    { className: "zone1Service", active: false },
    { className: "zone6Service", active: false },
    { className: "zone5Service", active: false },
  ]);
  const [attackPercentageArray, setAttackPercentageArray] = useState([]);
  const arrayForRecievers = [1, 2, 3, 4, 5];
  const [showInputs, setShowInputs] = useState(false);
  const [tip, setTip] = useState(0);
  const classNamesForConesAndInputs = [
    ["Bluez5", "Yellowz5", "Redz5"],
    ["Bluez6", "Yellowz6", "Redz6"],
    ["Bluez1", "Yellowz1", "Redz1"],
  ];
  const classNamesForTip = ["tip", "yellowtip"];
  const [zoneValue, setZoneValue] = useState({
    1: "",
    2: "",
    3: "",
  });
  function handleZoneValue(event) {
    setZoneValue({
      ...zoneValue,
      [event.target.name]: event.target.value.replace(/\D+/g, ""),
    });
  }
  function onHandleCountClick(event) {
    event.preventDefault();
    let final = [];
    for (let key in zoneValue) {
      final.push(+zoneValue[key]);
    }
    const new2 = final.reduce((a, b) => a + b, 0);
    const result = final.map((obj) => Math.round((obj / new2) * 100));
    const newObj = {
      ...zoneValue,
      1: result[0] + "%",
      2: result[1] + "%",
      3: result[2] + "%",
    };
    setZoneValue(newObj);
    setAttackPercentageArray(result);
    setShowInputs(!showInputs);
  }
  return (
    <>
      <form className="serviceField">
        <select className="typeOfService">
          <option defaultValue="Type of service">Type of service</option>
          <option
            defaultValue="Jump"
            onClick={showInputs ? onHandleCountClick : null}
          >
            Jump{" "}
          </option>
          <option
            defaultValue="Float"
            onClick={showInputs ? onHandleCountClick : null}
          >
            Float
          </option>
          <option defaultValue="Hybrid">Hybrid</option>
        </select>
        <div>
          {historyOfBalls.map((ball, index) =>
            !ball.active ? (
              <BallForAttack
                key={index}
                value={ball.className.replace(/[a-z]/g, "")}
                attack={ball.className}
                index={index}
                historyOfBalls={historyOfBalls}
                setHistoryOfBalls={setHistoryOfBalls}
                showInputs={showInputs}
                setShowInputs={setShowInputs}
              />
            ) : (
              <BallForAttack
                key={index}
                value="🏐"
                attack={ball.className + " showTheBall"}
                index={index}
                historyOfBalls={historyOfBalls}
                setHistoryOfBalls={setHistoryOfBalls}
                showInputs={showInputs}
                setShowInputs={setShowInputs}
              />
            )
          )}
          <div>
            <input
              type="button"
              className={classNamesForTip[tip]}
              value="Short"
              onClick={() => setTip((tip + 1) % 2)}
            ></input>
          </div>
        </div>
        <div className="balls">
          {classNamesForConesAndInputs.map((el, index) => (
            <ConeReaction
              key={index}
              attackPercentageArray={attackPercentageArray[index]}
              range0={el[0]}
              range10={el[1]}
              range40={el[2]}
              historyOfBalls={historyOfBalls}
            />
          ))}
        </div>
        <div>
          {classNamesForConesAndInputs.map((el, index) => (
            <InputForCount
              key={index}
              name={index + 1}
              handleZoneValue={handleZoneValue}
              zoneValue={zoneValue[index + 1]}
              showInputs={showInputs}
            />
          ))}
        </div>
        {!showInputs &&
          arrayForRecievers.map((reciever) => <Recievers key={reciever} />)}
      </form>
    </>
  );
}

function Service() {
  const navigate = useNavigate();

  const [history, sethistory] = useState([0]);
  const [searchparams] = useSearchParams();
  const playerId = searchparams.get("playerId");
  const players = useSelector((state) => state.listOfPlayers.listOfPlayers);
  const playerInfo = players[playerId - 1];
  function reset() {
    const newHistory = [...history];
    newHistory.splice(history.length - 1, 1);
    sethistory(newHistory);
  }
  function addField() {
    sethistory([...history, history.length]);
  }
  function goHome() {
    navigate("/");
  }
  return (
    <>
      <RegularLabel value={"Service"} />
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}
      >
        <PersonalInformationOfPlayer
          obj={playerInfo}
          onClick={() => goHome()}
        />
      </div>
      <div className="servicePage" style={{ marginTop: 20 }}>
        <div className="atackFileds">
          {history.map((field) =>
            field ? <ServiceFields key={field} /> : null
          )}
          <div
            style={history.length > 1 ? { margin: "5px 0px 0px -100px" } : null}
          >
            {history.length > 1 && (
              <>
                <button className="reset" onClick={reset}>
                  🡄
                </button>
                <div className="explain">
                  <div className="comments">
                    <label>Comments:</label>
                    <textarea type="text" className="textcomment"></textarea>
                  </div>
                </div>
              </>
            )}
            {history.length === 1 && (
              <button
                className="reset"
                onClick={addField}
                style={{ marginTop: -10 }}
              >
                Push to start
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
