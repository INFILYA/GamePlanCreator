import { useState } from "react";
import { BlockHelp } from "./BlockHelp";
import { InputDistribution } from "./InputDistribution";
import { reduce } from "../../Datas/api";

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
      [event.target.name]: +event.target.value.replace(/\D+/g, ""),
    });
  }
  function onHandleCountClick(event) {
    event.preventDefault();
    let final = Object.values(zoneValue);
    const total = reduce(final, 0.001);
    const res = final.map((obj) => Math.round((obj / total) * 100));
    const countedResult = Object.fromEntries(
      Object.entries(res).map(([key, value]) => [+key + 1, value + "%"])
    );
    setZoneValue(countedResult);
    setDistributionArr(res);
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
                    setZoneValue({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }) ||
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
