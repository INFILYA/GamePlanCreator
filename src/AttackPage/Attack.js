import { useEffect, useState } from "react";
import { RegularLabel } from "../Labels/RegularLabel";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { AttackFields } from "./components/AttackFields";
import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../states/reducers/playerInfoReducer";

function Attacks() {
  const dispatch = useDispatch();
  const [history, sethistory] = useState([0]);
  const playerInfo = useSelector((state) => state.playerInfo);

  useEffect(() => {
    dispatch(setInfoOfPlayer(JSON.parse(localStorage.getItem("playerInfo"))));
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
  return (
    <>
      <RegularLabel value={"Attack"} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PersonalInformationOfPlayer link={"Attack"} />
      </div>
      <div className="atackFileds">
        {history.map((field) => (field ? <AttackFields key={field} /> : null))}
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
