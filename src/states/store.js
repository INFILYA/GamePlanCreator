import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { listOfTeamsReducer } from "./listOfTeamsReducer";
import { listOfPlayersReducer } from "./listOfPlayersReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  listOfTeams: listOfTeamsReducer,
  listOfPlayers: listOfPlayersReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
