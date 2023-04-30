import { useState } from "react";
import RegularLabel from "../Labels/RegularLabel";
import { NavLink } from "react-router-dom";
import { DistrField } from "./components/DistrField";

function Distribution() {
  const [history, sethistory] = useState([0]);
  function reset() {
    const newHistory = [...history];
    newHistory.splice(history.length - 1, 1);
    sethistory(newHistory);
  }
  function addField() {
    sethistory([...history, history.length]);
  }
  return (
    <>
      <RegularLabel value={"Distribution"} />
      <div className="belowcort">
        {history.map((field) => (field ? <DistrField key={field} /> : null))}
        <div>
          {history.length > 1 && (
            <button className="reset" onClick={reset}>
              🡄
            </button>
          )}
          {history.length <= 6 && (
            <button className="reset" onClick={addField}>
              {history.length === 1 ? `Push to start` : `🡆`}
            </button>
          )}
        </div>
      </div>
      <div className="showDistribution" style={{ marginTop: 10 }}>
        <NavLink to={"/"}>Home Page</NavLink>
      </div>
    </>
  );
}
export default Distribution;
