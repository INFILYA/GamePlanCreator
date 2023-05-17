import { reduce } from "../../Datas/api";

export function CheckEquality({ checkEquality, diagrammValue, zoneValue }) {
  return (
    <div className="compareFields">
      <div style={{ marginRight: 20 }}>
        <label>Data value</label>
        <input
          style={
            checkEquality
              ? { backgroundColor: `yellowgreen` }
              : { backgroundColor: `orangered` }
          }
          type="text"
          value={reduce(Object.values(diagrammValue).slice(0, 4))}
          readOnly
        ></input>
      </div>
      {!checkEquality ? (
        <div>
          <label className="equal">Should</label>
          <label className="equal">be equal</label>
        </div>
      ) : (
        <div>
          <label className="equal">All</label>
          <label className="equal">OK</label>
        </div>
      )}
      <div style={{ marginLeft: 20 }}>
        <label>Zone value</label>
        <input
          style={
            checkEquality
              ? { backgroundColor: `yellowgreen` }
              : { backgroundColor: `orangered` }
          }
          type="text"
          value={reduce(Object.values(zoneValue))}
          readOnly
        ></input>
      </div>
    </div>
  );
}
