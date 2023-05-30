import { useState } from "react";
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
      <h1>Distribution</h1>
      <div className="pagination">
        {history.length > 1 && (
          <button className="reset" onClick={reset}>
            -
          </button>
        )}
        {history.length <= 6 && (
          <button className="reset" onClick={addField}>
            {history.length === 1 ? `Push to start` : `+`}
          </button>
        )}
      </div>  
      <div className="belowcort">
        {history.map((field) => (field ? <DistrField key={field} /> : null))}
      </div>
    </>
  );
}
export default Distribution;
