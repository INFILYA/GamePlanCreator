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
import { useState } from "react";

export function ChooseOpponentTeam() {
  const dispatch = useDispatch();
  const [showReset, setShowReset] = useState(false);
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
    setShowReset(false);
  }
  return (
    <>
      <div className="opponentTeamList">
        {listOfTeams.map((team) => (
          <button
            onClick={() => handleSetOpponentTeam(team) || setShowReset(true)}
            className="opponentTeams"
            key={team.id}
          >
            {team.name}
          </button>
        ))}
        {showReset && (
          <button onClick={resetTheBoard} className="reset">
            Reset
          </button>
        )}
      </div>
    </>
  );
}
