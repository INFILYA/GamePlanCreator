export function InputDistribution({
  distributionArr,
  zoneValue,
  handleZoneValue,
  name,
  showButtonCount,
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
        readOnly={!showButtonCount}
      ></input>
    </>
  );
}
