import { useEffect, useState } from "react";
import { Button } from "./StaticHelpModules/Button";
import { useDispatch, useSelector } from "react-redux";
import { setChangeLanguage } from "./states/slices/changeLanguageSlice";
import { Switch } from "antd";
import { setisShowedTutorial } from "./states/slices/isShowedTutorialSlice";

export function Tutorial({ text }) {
  const dispatch = useDispatch();
  const changeLanguage = useSelector((state) => state.changeLanguage.changeLanguage);
  const userVersion = useSelector((state) => state.userVersion.userVersion);
  const [showTutorial, setShowTutorial] = useState(true);
  const [confirmRepeat, setConfirmReapeat] = useState(false);

  useEffect(() => {
    dispatch(setisShowedTutorial(JSON.parse(localStorage.getItem("isShowedTutorial"))));
  }, [dispatch]);
  const buttonUkrStyle = changeLanguage
    ? { backgroundColor: "#FFD700", color: "#0057B8", border: "1px solid #0057B8" }
    : { backgroundColor: "#0057B8", color: "#FFD700", border: "1px solid #FFD700" };
  const buttonEngStyle = !changeLanguage
    ? { backgroundColor: "#FFD700", color: "#0057B8", border: "1px solid #0057B8" }
    : { backgroundColor: "#0057B8", color: "#FFD700", border: "1px solid #FFD700" };
  return (
    <>
      {showTutorial && (
        <div className="grab">
          <div className="tutorial">
            <div className="version-language-wrapper">
              <div className="userVersion">data version: {userVersion}</div>
              <div className="changeLanguage">
                <button onClick={() => dispatch(setChangeLanguage(true))} style={buttonUkrStyle}>
                  Eng
                </button>
                <button onClick={() => dispatch(setChangeLanguage(false))} style={buttonEngStyle}>
                  Ukr
                </button>
              </div>
            </div>
            {!changeLanguage ? (
              <>
                <div className="text-wrapper">{text}</div>
                <div className="item-wrapper">
                  <Button
                    onClick={() => setShowTutorial(false)}
                    value="Далі"
                    style={{ padding: "5px 10px", fontSize: 15 }}
                  />
                </div>
                <div className="item-wrapper switch">
                  <label htmlFor="">Закрити і ніколи не показувати</label>
                  <Switch
                    onChange={() => setConfirmReapeat(!confirmRepeat)}
                    checked={confirmRepeat}
                  ></Switch>
                </div>
                {confirmRepeat && (
                  <div className="hideBackground">
                    <div className="confirmationForExit">
                      <div className="confirmation-wrapper">
                        <h2>Ви впевнені?</h2>
                        <Button
                          onClick={() => dispatch(setisShowedTutorial(true))}
                          value="Так"
                          style={{ padding: "5px 10px", fontSize: 15 }}
                        />
                        <Button
                          onClick={() => setConfirmReapeat(!confirmRepeat)}
                          value="Ні"
                          style={{ padding: "5px 10px", fontSize: 15 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-wrapper">{text}</div>
                <div className="item-wrapper">
                  <Button
                    onClick={() => setShowTutorial(false)}
                    value="Next"
                    className="exit"
                    style={{ padding: "5px 10px", fontSize: 15 }}
                  />
                </div>
                <div className="item-wrapper switch">
                  <label htmlFor="">Close and never show it again</label>
                  <Switch
                    onChange={() => setConfirmReapeat(!confirmRepeat)}
                    checked={confirmRepeat}
                  ></Switch>
                </div>
                {confirmRepeat && (
                  <div className="hideBackground">
                    <div className="confirmationForExit">
                      <div className="confirmation-wrapper">
                        <h2>Are you sure?</h2>
                        <Button
                          onClick={() => dispatch(setisShowedTutorial(true))}
                          value="Yes"
                          style={{ padding: "5px 10px", fontSize: 15 }}
                        />
                        <Button
                          onClick={() => setConfirmReapeat(!confirmRepeat)}
                          value="No"
                          style={{ padding: "5px 10px", fontSize: 15 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
