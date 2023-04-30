import { useState } from "react";
import { BallForAttack } from "../../AttackPage/components/BallForAttack";
import { ConeReaction } from "./ConeReaction";
import { InputForCount } from "./InputForCount";
import { Recievers } from "./Recievers";

export function ServiceFields() {
  const [historyOfBalls, setHistoryOfBalls] = useState([
    { className: "zone1Service", active: false },
    { className: "zone6Service", active: false },
    { className: "zone5Service", active: false },
  ]);
  const [attackPercentageArray, setAttackPercentageArray] = useState([]);
  const arrayForRecievers = [1, 2, 3, 4, 5];
  const [showInputs, setShowInputs] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
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
                attack={!showBalls ? ball.className : "none"}
                index={index}
                historyOfBalls={historyOfBalls}
                setHistoryOfBalls={setHistoryOfBalls}
                setShowInputs={setShowInputs}
                setShowBalls={setShowBalls}
              />
            ) : (
              <BallForAttack
                key={index}
                value="🏐"
                attack={ball.className + " showTheBall"}
                index={index}
                historyOfBalls={historyOfBalls}
                setHistoryOfBalls={setHistoryOfBalls}
                setShowInputs={setShowInputs}
                setShowBalls={setShowBalls}
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
        <div className="explain">
          <div className="comments">
            <label>Comments:</label>
            <textarea type="text" className="textcomment"></textarea>
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
