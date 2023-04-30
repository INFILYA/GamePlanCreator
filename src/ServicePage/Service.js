import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegularLabel from "../Labels/RegularLabel";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { useSelector } from "react-redux";
import { ServiceFields } from "./components/ServiceFields";

function Service() {
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
  console.log(playerInfo);
  return (
    <>
      <RegularLabel value={"Service"} />
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        {playerInfo && (
          <PersonalInformationOfPlayer
            link={"Service"}
            player={playerInfo}
            onClick={() => goHome()}
          />
        )}
      </div>
      <div className="servicePage">
        <div className="atackFileds">
          {history.map((field) =>
            field ? <ServiceFields key={field} /> : null
          )}
          <div
            style={history.length > 1 ? { margin: "5px 0px 0px -100px" } : null}
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
    </>
  );
}

export default Service;
