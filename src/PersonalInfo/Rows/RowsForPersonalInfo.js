export function RowsForPersonalInfo({ name, value }) {
  return (
    <div className="row">
      <div>{name}:</div>
      <div>{value}</div>
    </div>
  );
}
