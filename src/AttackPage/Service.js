import { useEffect, useState } from "react";
import { PersonalInformationOfPlayer } from "../PersonalInfo/PersonalInformationOfPlayer";
import { ServiceFields } from "./components/ServiceFields";
import { useDispatch, useSelector } from "react-redux";
import { setInfoOfPlayer } from "../states/reducers/playerInfoReducer";
import { Auth } from "../Page1/components/Auth";
import { setShowEmailField } from "../states/reducers/showEmailFieldReducer";
import { auth } from "../config/firebase";

function Service() {
  const dispatch = useDispatch();
  const [history, sethistory] = useState([0]);
  const [refreshPage, setRefreshPage] = useState(false);
  const playerInfo = useSelector((state) => state.playerInfo);
  const registratedUser = auth?.currentUser?.uid !== undefined;

  useEffect(() => {
    dispatch(setInfoOfPlayer(JSON.parse(localStorage.getItem("playerInfo"))));
    dispatch(setShowEmailField(registratedUser));
    setTimeout(() => setRefreshPage(true), 500);
  }, [dispatch, registratedUser]);

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <PersonalInformationOfPlayer link={"Service"} />
      </div>
      <div className="servicePage">
        <div className="atackFileds">
          {history.map((field) => (field ? <ServiceFields key={field} /> : null))}
          <div style={history.length > 1 ? { margin: "5px 0px 0px -100px" } : null}>
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
