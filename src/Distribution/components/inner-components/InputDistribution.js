export function InputDistribution({
  distributionArr,
  zoneValue,
  handleZoneValue,
  name,
  showButtonCount,
}) {
  const x = distributionArr === 0 ? 0 : distributionArr * 2;
  return (
    <>
      <input
        style={{
          backgroundColor: `hsl(${
            distributionArr <= 15
              ? 200
              : distributionArr > 15 && distributionArr < 30
              ? 100
              : distributionArr >= 30 && distributionArr < 45
              ? 50
              : 0
          },${x}%,${distributionArr === 0 ? 86 : 50}%)`,
          border: distributionArr === 0 && "none",
          color: distributionArr === 0 && "transparent",
        }}
        type="text"
        name={name}
        value={zoneValue}
        onChange={handleZoneValue}
        required
        readOnly={!showButtonCount}
      ></input>
    </>
  );
}
