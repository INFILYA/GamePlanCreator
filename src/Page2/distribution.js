import { useState } from "react";
import RegularLabel from "../Labels/RegularLabel";
import { NavLink } from "react-router-dom";

function BlockHelp() {
  const [blockHelp, setBlockHelp] = useState(0);
  const classNames = ["block", "redblock", "blackarrowleft", "blackarrowright"];
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
function InputDistribution({
  distributionArr,
  zoneValue,
  handleZoneValue,
  name,
}) {
  return (
    <>
      <input
        className={
          (distributionArr < 1 ? "yellowBlock" : "") ||
          (distributionArr > 1 && distributionArr < 15 ? "reactBlue" : "") ||
          (distributionArr > 40 ? "reactRed" : "")
        }
        type="text"
        name={name}
        value={zoneValue}
        onChange={handleZoneValue}
        required
      ></input>
    </>
  );
}
function DistrField() {
  const [distributionArr, setDistributionArr] = useState([]);
  const [zoneValue, setZoneValue] = useState(null);
  const [showButtonCount, setShowButtonCount] = useState(false);
  const [showButtonSelect, setShowButtonSelect] = useState(true);
  const inputDistributionArr = [1, 2, 3, 4, 5];
  const typesOfSituations = [
    "K1",
    "K2",
    "KC",
    "K7",
    "KE",
    "KP",
    "KM",
    "P1",
    "P2",
    "P3",
    "P4",
    "P5",
    "P6",
    "Service in 1",
    "Service in 5",
    "Reception #",
    "Reception +",
    "Free balls",
    "Setter front row",
    "Setter back row",
  ];

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
      4: result[3] + "%",
      5: result[4] + "%",
    };
    setZoneValue(newObj);
    setDistributionArr(result);
    setShowButtonCount(!showButtonCount);
  }
  return (
    <>
      <div className="distribution">
        <form className="distrfield" onSubmit={onHandleCountClick}>
          <select className="types" defaultValue="Choose type">
            <option disabled={true}>Choose type</option>
            {typesOfSituations.map((type) =>
              showButtonSelect ? (
                <option
                  key={type}
                  onClick={() =>
                    setZoneValue({ 1: "", 2: "", 3: "", 4: "", 5: "" }) ||
                    setShowButtonCount(!showButtonCount) ||
                    setShowButtonSelect(!showButtonSelect)
                  }
                  value={type}
                >
                  {type}
                </option>
              ) : (
                <option key={type}>{type}</option>
              )
            )}
          </select>
          <div className="overNet">
            {inputDistributionArr.map((input) => (
              <BlockHelp key={input} />
            ))}
          </div>
          <hr className="net"></hr>
          {zoneValue && (
            <div>
              <div className="firstline">
                {inputDistributionArr.slice(0, 3).map((input) => (
                  <InputDistribution
                    key={input}
                    distributionArr={distributionArr[input - 1]}
                    zoneValue={zoneValue[input]}
                    handleZoneValue={handleZoneValue}
                    name={input}
                  />
                ))}
              </div>
              <hr></hr>
              <div className="secondline">
                <span>Zone 5</span>
                {inputDistributionArr.slice(3, 5).map((input) => (
                  <InputDistribution
                    key={input}
                    distributionArr={distributionArr[input - 1]}
                    zoneValue={zoneValue[input]}
                    handleZoneValue={handleZoneValue}
                    name={input}
                  />
                ))}
              </div>
            </div>
          )}
          {showButtonCount && (
            <button className="count" type="submit">
              Count
            </button>
          )}
        </form>
        {!showButtonCount && (
          <div className="notice">
            {!zoneValue ? (
              <input
                defaultValue="Please choose type of the call"
                readOnly
              ></input>
            ) : (
              <input placeholder="Leave your notice"></input>
            )}
          </div>
        )}
      </div>
    </>
  );
}
function Distribution() {
  const [history, sethistory] = useState([0]);
  function reset() {
    const newHistory = [...history];
    newHistory.splice(history.length - 1, 1);
    sethistory(newHistory);
  }
  function addField() {
    sethistory([...history, history.length]);
  }
  return (
    <>
      <RegularLabel value={"Distribution"} />
      <div className="belowcort">
        {history.map((field) => (field ? <DistrField key={field} /> : null))}
        <div>
          {history.length > 1 && (
            <button className="reset" onClick={reset}>
              🡄
            </button>
          )}
          {history.length <= 6 && (
            <button className="reset" onClick={addField}>
              {history.length === 1 ? `Push to start` : `🡆`}
            </button>
          )}
        </div>
      </div>
      <div className="showDistribution" style={{ marginTop: 10 }}>
        <NavLink to={"/"}>Home Page</NavLink>
      </div>
    </>
  );
}
export default Distribution;
