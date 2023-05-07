import { useState } from "react";
import { RegularLabel } from "../Labels/RegularLabel";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { ServiceFields } from "./components/ServiceFields";
import { useSelector } from "react-redux";

function Service() {
  const [history, sethistory] = useState([0]);
  const playerInfo = useSelector((state) => state.playerInfo);

  function reset() {
    const newHistory = [...history];
    newHistory.splice(history.length - 1, 1);
    sethistory(newHistory);
  }
  function addField() {
    sethistory([...history, history.length]);
  }
  return playerInfo !== null ? (
    <>
      <RegularLabel value={"Service"} />
      {playerInfo.position !== "Libero" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <PersonalInformationOfPlayer link={"Service"} />
        </div>
      )}
      {playerInfo.position !== "Libero" && (
        <div className="servicePage">
          <div className="atackFileds">
            {history.map((field) =>
              field ? <ServiceFields key={field} /> : null
            )}
            <div
              style={
                history.length > 1 ? { margin: "5px 0px 0px -100px" } : null
              }
            >
              {history.length > 1 && (
                <>
                  <button className="reset" onClick={reset}>
                    🡄
                  </button>
                </>
              )}
              {history.length <= 2 && (
                <button
                  className="reset"
                  onClick={addField}
                  style={history.length === 1 ? { marginTop: -10 } : null}
                >
                  {history.length === 1 ? `Push to start` : `🡆`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  ) : null;
}

export default Service;
