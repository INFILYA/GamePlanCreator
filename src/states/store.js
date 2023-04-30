import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { listOfTeamsReducer } from "./reducers/listOfTeamsReducer";
import { listOfPlayersReducer } from "./reducers/listOfPlayersReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  listOfTeams: listOfTeamsReducer,
  listOfPlayers: listOfPlayersReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
