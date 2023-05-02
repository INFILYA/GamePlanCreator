import { useEffect, useState } from "react";
import { RegularLabel } from "../Labels/RegularLabel";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { AttackFields } from "./components/AttackFields";
import { useSearchParams } from "react-router-dom";
import { fetchPlayerInformation } from "../Datas/api";

function Attacks() {
  const [history, sethistory] = useState([0]);
  const [playerInfo, setPlayerInfo] = useState(null);
  const [searchParams] = useSearchParams();
  const playerId = searchParams.get("playerId");
  useEffect(() => {
    fetchPlayerInformation(playerId)
      .then((json) => {
        setPlayerInfo(json);
      })
      .catch((error) => alert(error + ", Data not downloaded"));
  }, [playerId]);
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
      <RegularLabel value={"Attack"} />
      {playerInfo.position !== "Setter" && playerInfo.position !== "Libero" && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PersonalInformationOfPlayer link={"Attack"} player={playerInfo} />
        </div>
      )}
      {playerInfo.position !== "Setter" && playerInfo.position !== "Libero" && (
        <div className="atackFileds">
          {history.map((field) =>
            field ? <AttackFields key={field} /> : null
          )}
          <div
            style={history.length > 1 ? { margin: "5px 0px 0px -100px" } : null}
          >
            {history.length > 1 && (
              <button className="reset" onClick={reset}>
                🡄
              </button>
            )}
            {history.length <= 3 && (
              <button className="reset" onClick={addField}>
                {history.length === 1 ? `Push to start` : `🡆`}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  ) : null;
}
export default Attacks;
