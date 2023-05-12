export function InputForCount({ name, onChange, zoneValue, showInputs }) {
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
        style={!showInputs ? { border: "1px solid transparent" } : null}
      ></input>
    </>
  );
}
