export function InputForCount({ name, setZoneValue, zoneValue, value }) {
  function handleIncreaseZoneValue() {
    setZoneValue({
      ...zoneValue,
      [name]: +value + 1,
    });
  }
  return (
    <>
      <button type="text" className="result" onDoubleClick={handleIncreaseZoneValue} value={value}>
        {value}
      </button>
    </>
  );
}
