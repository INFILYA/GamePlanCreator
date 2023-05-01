import { useDispatch, useSelector } from "react-redux";
import { setRivalPlayers } from "../../states/reducers/rivalPlayersReducer";
import { setRivalTeam } from "../../states/reducers/rivalClubReducer";
import { setMyTeamPlayers } from "../../states/reducers/myTeamPlayersReducer";
import { setMyTeam } from "../../states/reducers/myClubReducer";
import { clearRivalZones } from "../../states/reducers/zonesReducer";
import { clearMyTeamZones } from "../../states/reducers/myTeamZonesReducer";
import { setBackRightRivalSelects } from "../../states/reducers/indexOfZonesReducer";
import { setBackRightMyTeamSelects } from "../../states/reducers/sequanceOfZonesReducer";
import { setInfoOfPlayer } from "../../states/reducers/playerInfoReducer";

export function ChooseOpponentTeam({ teams, players, myTeamPlayers }) {
  const dispatch = useDispatch();
  const listOfTeams = useSelector((state) => state.listOfTeams);
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  function handleSetOpponentTeam(club) {
    dispatch(setRivalPlayers(listOfPlayers, club));
    dispatch(setRivalTeam(listOfTeams, club));
  }
  function resetTheBoard() {
    dispatch(setRivalPlayers([]));
    dispatch(setRivalTeam([]));
    dispatch(setMyTeamPlayers([]));
    dispatch(setMyTeam([]));
    dispatch(clearRivalZones(Array(6).fill(null)));
    dispatch(clearMyTeamZones(Array(6).fill(null)));
    dispatch(setBackRightRivalSelects([5, 2, 1, 0, 3, 4]));
    dispatch(setBackRightMyTeamSelects([5, 2, 1, 0, 3, 4]));
    dispatch(setInfoOfPlayer(null));
  }
  return (
    <>
      <div className="opponentTeamList">
        {teams.map((team) => (
          <button
            onClick={() => handleSetOpponentTeam(team)}
            className="opponentTeams"
            key={team.id}
          >
            {team.name}
          </button>
        ))}
        {players.length > 2 || myTeamPlayers.length > 2 ? (
          <button onClick={resetTheBoard} className="reset">
            Reset
          </button>
        ) : null}
      </div>
    </>
  );
}
