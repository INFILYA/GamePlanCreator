export function RowsForLegendAndDiagramm({ style, label, name }) {
  return (
    <>
      <div className="legendRows">
        <label style={style}>{label}%</label>
        <div>{name}</div>
      </div>
    </>
  );
}
