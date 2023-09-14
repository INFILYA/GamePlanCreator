import { useState } from "react";
import { BlockHelp } from "./inner-components/BlockHelp";
import { InputDistribution } from "./inner-components/InputDistribution";
import { reduce } from "../../Datas/api";
import SectionWrapper from "../../Page1/components/SectionWrapper";

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
  function handleSelectOption() {
    setZoneValue({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    setShowButtonCount(true);
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
    setShowButtonSelect(!showButtonSelect);
  }
  return (
    <SectionWrapper
      className={"distribution-section"}
      backGround={
        <img src="/photos/distribution-field.jpg" alt="" className="playground-area-background" />
      }
      content={
        <div className="distribution-wrapper">
          <form className="distrfield-wrapper" onSubmit={onHandleCountClick}>
            <div className="select-wrapper">
              <select
                className="typeOfCall"
                defaultValue="Choose type of call"
                onChange={handleSelectOption}
                disabled={!showButtonSelect}
              >
                <option disabled={true}>Choose type of call</option>
                {typesOfSituations.map((type) =>
                  showButtonSelect ? (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ) : (
                    <option key={type}>{type}</option>
                  )
                )}
              </select>
            </div>
            <div className="block-wrapper">
              {inputDistributionArr.map((input) => (
                <BlockHelp key={input} />
              ))}
            </div>
            {zoneValue && (
              <div className="playarea-wrapper">
                <div className="line-wrapper">
                  {inputDistributionArr.slice(0, 3).map((input) => (
                    <InputDistribution
                      key={input}
                      distributionArr={distributionArr[input - 1]}
                      zoneValue={zoneValue[input]}
                      handleZoneValue={handleZoneValue}
                      name={input}
                      readOnly={!showButtonSelect}
                    />
                  ))}
                </div>
                <div className="line-wrapper">
                  <div className="input-wrapper">
                    <input value={"Zone 5"} readOnly style={{ fontSize: 20 }} />
                  </div>
                  {inputDistributionArr.slice(3, 5).map((input) => (
                    <InputDistribution
                      key={input}
                      distributionArr={distributionArr[input - 1]}
                      zoneValue={zoneValue[input]}
                      handleZoneValue={handleZoneValue}
                      name={input}
                      readOnly={!showButtonSelect}
                    />
                  ))}
                </div>
                <div className="line-wrapper" style={{ justifyContent: "center" }}>
                  {showButtonCount && (
                    <button className="count" type="submit" disabled={!showButtonCount}>
                      Count
                    </button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      }
    />
  );
}
