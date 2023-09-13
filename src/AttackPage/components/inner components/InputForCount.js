export function InputForCount({ name, onChange, zoneValue, showInputs, attackPercentageArray }) {
  return (
    <>
      <input
        type="text"
        className="inputForCount"
        name={name}
        onChange={onChange}
        value={zoneValue}
        disabled={!showInputs ? true : false}
        required
        style={attackPercentageArray >= 40 ? { color: "white" } : null}
      ></input>
    </>
  );
}
