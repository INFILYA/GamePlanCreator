import { useState } from "react";
import { auth } from "./config/firebase";
import { Button } from "./StaticHelpModules/Button";
import { useDispatch, useSelector } from "react-redux";
import { setChangeLanguage } from "./states/reducers/changeLanguageReducer";

export function Tutorial({ text }) {
  const dispatch = useDispatch();
  const changeLanguage = useSelector((state) => state.changeLanguage);
  const [showTutorial, setShowTutorial] = useState(true);
  const isRegistratedUser = auth?.currentUser?.uid !== undefined;

  function hideTutorial() {
    setShowTutorial(!showTutorial);
  }
  return (
    <>
      {showTutorial && !isRegistratedUser && (
        <div className="grab">
          <div className="tutorial">
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
            {!changeLanguage ? (
              <>
                <div>{text}</div>
                <div className="exit">
                  <Button onClick={hideTutorial} value={"Далі"} className="exit" />
                </div>
              </>
            ) : (
              <>
                <div>{text}</div>
                <div className="exit">
                  <Button onClick={hideTutorial} value={"Next"} className="exit" />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
