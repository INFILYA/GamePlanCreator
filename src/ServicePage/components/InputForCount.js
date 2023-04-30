export function InputForCount({
  name,
  handleZoneValue,
  zoneValue,
  showInputs,
}) {
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
