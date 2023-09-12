export function RowsForPersonalInfo({ name, value }) {
  return (
    <div className="player-info-row-wrapper">
      <div>
        {name}: {value}
      </div>
    </div>
  );
}
