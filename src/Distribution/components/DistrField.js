import { useState } from "react";
import { BlockHelp } from "./BlockHelp";
import { InputDistribution } from "./InputDistribution";

export function DistrField() {
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
