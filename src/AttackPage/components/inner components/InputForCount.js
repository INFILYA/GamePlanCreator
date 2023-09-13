export function InputForCount({ name, onChange, zoneValue }) {
  return (
    <>
      <input
        type="text"
        className="inputForCount"
        name={name}
        onChange={onChange}
        value={zoneValue}
        required
      ></input>
    </>
  );
}
