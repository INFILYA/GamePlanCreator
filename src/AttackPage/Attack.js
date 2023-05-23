import { useEffect, useState } from "react";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { AttackFields } from "./components/AttackFields";
import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../states/reducers/playerInfoReducer";
import { Auth } from "../Page1/components/Auth";


function Attacks() {
  const dispatch = useDispatch();
  const [history, sethistory] = useState([0]);
  const [refreshPage, setRefreshPage] = useState(false);
  const playerInfo = useSelector((state) => state.playerInfo);

  useEffect(() => {
    dispatch(setInfoOfPlayer(JSON.parse(localStorage.getItem("playerInfo"))));
    setTimeout(() => setRefreshPage(true), 500);
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
      {refreshPage && <Auth />}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PersonalInformationOfPlayer link={"Attack"} />
      </div>
      <div className="atackFileds">
        {history.map((field) => (field ? <AttackFields key={field} /> : null))}
        <div style={history.length > 1 ? { margin: "5px 0px 0px -100px" } : null}>
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
