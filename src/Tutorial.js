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

  function nextPage() {
    setShowTutorial(false);
  }
  function hideTutorial() {
    dispatch(setisShowedTutorial(true));
  }
  function leftTutorial() {
    setConfirmReapeat(!confirmRepeat);
  }
  function setConfirmNotShowAgainTutorial() {
    setConfirmReapeat(!confirmRepeat);
  }
  return (
    <>
      {showTutorial && (
        <div className="grab">
          <div className="tutorial">
            <div className="version-language-wrapper">
              <div className="userVersion">data version: {userVersion}</div>
              <div className="changeLanguage">
                <button
                  onClick={() => dispatch(setChangeLanguage(true))}
                  style={changeLanguage ? { backgroundColor: "gold" } : null}
                >
                  Eng
                </button>
                <button
                  onClick={() => dispatch(setChangeLanguage(false))}
                  style={!changeLanguage ? { backgroundColor: "gold" } : null}
                >
                  Ukr
                </button>
              </div>
            </div>
            {!changeLanguage ? (
              <>
                <div className="text-wrapper">{text}</div>
                <div className="item-wrapper">
                  <Button
                    onClick={nextPage}
                    value={"Далі"}
                    style={{ padding: "5px 10px", fontSize: 15 }}
                  />
                </div>
                <div className="item-wrapper switch">
                  <Switch
                    onChange={setConfirmNotShowAgainTutorial}
                    checked={confirmRepeat}
                  ></Switch>
                  <label htmlFor="">Закрити і ніколи не показувати</label>
                </div>
                {confirmRepeat && (
                  <div className="hideBackground">
                    <div className="confirmationForExit">
                      <div className="confirmation-wrapper">
                        <h2>Ви впевнені?</h2>
                        <Button onClick={hideTutorial} value={"Так"} />
                        <Button onClick={leftTutorial} value={"Ні"} />
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
                    onClick={nextPage}
                    value={"Next"}
                    className="exit"
                    style={{ padding: "5px 10px", fontSize: 15 }}
                  />
                </div>
                <div className="item-wrapper switch">
                  <Switch
                    onChange={setConfirmNotShowAgainTutorial}
                    checked={confirmRepeat}
                  ></Switch>
                  <label htmlFor="">Close and never show it again</label>
                </div>
                {confirmRepeat && (
                  <div className="hideBackground">
                    <div className="confirmationForExit">
                      <div className="confirmation-wrapper">
                        <h2>Are you sure?</h2>
                        <Button onClick={hideTutorial} value={"Yes"} />
                        <Button onClick={leftTutorial} value={"No"} />
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
