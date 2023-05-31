import { useEffect, useState } from "react";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { ServiceFields } from "./components/ServiceFields";
import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../states/slices/playerInfoSlice";

function Service() {
  const dispatch = useDispatch();
  const [history, sethistory] = useState([0]);
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

  return (
    <>
      <div className="personalInfoForAttack">
        <PersonalInformationOfPlayer link={"Service"} />
      </div>
      <div className="pagination">
        {history.length > 1 && (
          <button className="reset" onClick={reset}>
            -
          </button>
        )}
        {history.length <= 2 && (
          <button className="reset" onClick={addField}>
            {history.length === 1 ? `Push to start` : `+`}
          </button>
        )}
      </div>
      <div className="servicePage">
        <div className="atackFileds">
          {history.map((field) => (field ? <ServiceFields key={field} /> : null))}
        </div>
      </div>
    </>
  );
}

export default Service;
