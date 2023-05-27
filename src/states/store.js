import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { listOfTeamsReducer } from "./reducers/listOfTeamsReducer";
import { listOfPlayersReducer } from "./reducers/listOfPlayersReducer";
import thunk from "redux-thunk";
import { rivalPlayersReducer } from "./reducers/rivalPlayersReducer";
import { rivalClubReducer } from "./reducers/rivalClubReducer";
import { myTeamPlayersReducer } from "./reducers/myTeamPlayersReducer";
import { myClubReducer } from "./reducers/myClubReducer";
import { zonesReducer } from "./reducers/zonesReducer";
import { indexOfZonesReducer } from "./reducers/indexOfZonesReducer";
import { myTeamZonesReducer } from "./reducers/myTeamZonesReducer";
import { sequanceOfZonesReducer } from "./reducers/sequanceOfZonesReducer";
import { playerInfoReducer } from "./reducers/playerInfoReducer";
import { userInfoReducer } from "./reducers/userInfoReducer";
import { changeLanguageReducer } from "./reducers/changeLanguageReducer";
import { isShowedTutorialReducer } from "./reducers/isShowedTutorialReducer";
import { userVersionReducer } from "./reducers/userVersionReducer";

const rootReducer = combineReducers({
  listOfTeams: listOfTeamsReducer,
  listOfPlayers: listOfPlayersReducer,
  rivalPlayers: rivalPlayersReducer,
  rivalClub: rivalClubReducer,
  myTeamPlayers: myTeamPlayersReducer,
  myClub: myClubReducer,
  zones: zonesReducer,
  indexOfZones: indexOfZonesReducer,
  myTeamZones: myTeamZonesReducer,
  sequanceOfZones: sequanceOfZonesReducer,
  playerInfo: playerInfoReducer,
  userInfo: userInfoReducer,
  changeLanguage: changeLanguageReducer,
  isShowedTutorial: isShowedTutorialReducer,
  userVersion: userVersionReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
