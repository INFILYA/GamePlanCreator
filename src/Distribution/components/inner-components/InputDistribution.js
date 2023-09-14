export function InputDistribution({
  distributionArr,
  zoneValue,
  handleZoneValue,
  name,
  readOnly,
}) {
  const x = distributionArr === 0 ? 0 : distributionArr * 2;
  return (
    <div className="input-wrapper">
      <input
        style={{
          backgroundColor:
            distributionArr !== 0
              ? `hsl(${
                  distributionArr <= 15
                    ? 200
                    : distributionArr > 15 && distributionArr < 30
                    ? 100
                    : distributionArr >= 30 && distributionArr < 45
                    ? 50
                    : 0
                },${x}%,50%)`
              : "transparent",
          border: distributionArr === 0 && "none",
          color: distributionArr === 0 && "transparent",
        }}
        type="text"
        name={name}
        value={zoneValue}
        onChange={handleZoneValue}
        required
        readOnly={readOnly}
      ></input>
    </div>
  );
}
