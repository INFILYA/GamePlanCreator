export function InputDistribution({
  distributionArr,
  zoneValue,
  handleZoneValue,
  name,
  showButtonCount,
}) {
  const x = 255 - (distributionArr / 100) * 255 === 255 ? 220 : 255 - (distributionArr / 100) * 255;
  return (
    <>
      <input
        style={{
          backgroundColor: `rgb(220,${x},${x})`,
          border: x === 220 && "none",
          color: x === 220 && "transparent",
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
