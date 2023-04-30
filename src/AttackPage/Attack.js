import { useState } from "react";
import RegularLabel from "../Labels/RegularLabel";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { useSelector } from "react-redux";
import { AttackFields } from "./components/AttackFields";

function Attacks() {
  const navigate = useNavigate();
  const [history, sethistory] = useState([0]);
  const [searchparams] = useSearchParams();
  const playerId = searchparams.get("playerId");
  const players = useSelector((state) => state.listOfPlayers);
  const playerInfo = players[playerId - 1];
  function reset() {
    const newHistory = [...history];
    newHistory.splice(history.length - 1, 1);
    sethistory(newHistory);
  }
  function addField() {
    sethistory([...history, history.length]);
  }
  function goHome() {
    navigate("/");
  }
  return (
    <>
      <RegularLabel value={"Attack"} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {playerInfo && (
          <PersonalInformationOfPlayer
            link={"Attack"}
            player={playerInfo}
            onClick={() => goHome()}
          />
        )}
      </div>
      <div className="atackFileds">
        {history.map((field) =>
          field ? <AttackFields key={field} playerInfo={playerInfo} /> : null
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
    </>
  );
}
export default Attacks;
