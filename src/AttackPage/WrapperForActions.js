import { useEffect, useState } from "react";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { setInfoOfPlayer } from "../states/slices/playerInfoSlice";
import { useDispatch, useSelector } from "react-redux";

export default function WrapperForActions({ type, children }) {
  const dispatch = useDispatch();
  const [history, sethistory] = useState([0]);
  const [showDetails, setShowDetails] = useState(false);
  const playerInfo = useSelector((state) => state.playerInfo.playerInfo);

  useEffect(() => {
    const playerInfo = JSON.parse(localStorage.getItem("playerInfo"));
    dispatch(setInfoOfPlayer(playerInfo));
  }, [dispatch]);

  function reset() {
    const newHistory = [...history];
    newHistory.splice(history.length - 1, 1);
    sethistory(newHistory);
  }
  function addField() {
    sethistory([...history, history.length]);
  }
  if (playerInfo === null) {
    return null;
  }
  const text = showDetails ? "Hide details" : "Show details";
  return (
    <article className="main-content-wrapper" style={{ flexDirection: "column" }}>
      <section className="attack-section">
        <div className="section-border">
          <div className="section-background"></div>
        </div>
        <div className="section-content-wrapper">
          <div className="section-content">
            <div className="reset-button-wrapper">
              <button onClick={() => setShowDetails(!showDetails)} className="reset">
                {text}
              </button>
            </div>
            {showDetails && <PersonalInformationOfPlayer link={type} />}
            <div className="reset-button-wrapper">
              {history.length > 1 && (
                <button className="reset" onClick={reset}>
                  -
                </button>
              )}
              {history.length <= 3 && (
                <button className="reset" onClick={addField}>
                  {history.length === 1 ? `Push to start` : `+`}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="playArea-sections-wrapper">
        {history.map((field) => (field ? children : null))}
      </div>
    </article>
  );
}
