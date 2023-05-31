// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import listOfTeamsReducer from "./slices/listOfTeamsSlice";
import listOfPlayersReducer from "./slices/listOfPlayersSlice";
// import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import rivalPlayersReducer from "./slices/rivalPlayersSlice";
import rivalClubReducer from "./slices/rivalClubSlice";
import myTeamPlayersReducer from "./slices/myTeamPlayersSlice";
import myClubReducer from "./slices/myClubSlice";
import zonesReducer from "./slices/zonesSlice";
import indexOfZonesReducer from "./slices/indexOfZonesSlice";
import myTeamZonesReducer from "./slices/myTeamZonesSlice";
import sequanceOfZonesReducer from "./slices/sequanceOfZonesSlice";
import playerInfoReducer from "./slices/playerInfoSlice";
import changeLanguageReducer from "./slices/changeLanguageSlice";
import isShowedTutorialReducer from "./slices/isShowedTutorialSlice";
import userVersionReducer from "./slices/userVersionSlice";

export const store = configureStore({
  reducer: {
    listOfTeams: listOfTeamsReducer, //+
    listOfPlayers: listOfPlayersReducer, //+
    rivalPlayers: rivalPlayersReducer, //+
    rivalClub: rivalClubReducer, // +
    myTeamPlayers: myTeamPlayersReducer, //+
    myClub: myClubReducer, //+
    zones: zonesReducer, //+
    indexOfZones: indexOfZonesReducer, //+
    myTeamZones: myTeamZonesReducer, //+
    sequanceOfZones: sequanceOfZonesReducer, //+
    playerInfo: playerInfoReducer, //+
    changeLanguage: changeLanguageReducer, //+
    isShowedTutorial: isShowedTutorialReducer, //+
    userVersion: userVersionReducer, //+
  },
});

// const rootReducer = combineReducers({
//   listOfTeams: listOfTeamsReducer,
//   listOfPlayers: listOfPlayersReducer,
//   rivalPlayers: rivalPlayersReducer,
//   rivalClub: rivalClubReducer,
//   myTeamPlayers: myTeamPlayersReducer,
//   myClub: myClubReducer,
//   zones: zonesReducer,
//   indexOfZones: indexOfZonesReducer,
//   myTeamZones: myTeamZonesReducer,
//   sequanceOfZones: sequanceOfZonesReducer,
//   playerInfo: playerInfoReducer,
//   changeLanguage: changeLanguageReducer,
//   isShowedTutorial: isShowedTutorialReducer,
//   userVersion: userVersionReducer,
// });

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
