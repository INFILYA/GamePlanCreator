import { useState } from "react";

export default function WrapperForDistribution({ children }) {
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
    <article className="main-content-wrapper">
      <section className="attack-section">
        <div className="section-border">
          <div className="section-background"></div>
        </div>
        <div className="section-content-wrapper">
          <div className="section-content">
            <h1>Distribution</h1>
            <div className="reset-button-wrapper">
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
            <div className="playArea-sections-wrapper">
              {history.map((field) => (field ? children : null))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
