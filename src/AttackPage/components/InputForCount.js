export function InputForCount({ name, handleZoneValue, zoneValue }) {
    return (
      <>
        <input
          type="text"
          className="inputForCount"
          name={name}
          onChange={handleZoneValue}
          value={zoneValue}
          required
        ></input>
      </>
    );
  }