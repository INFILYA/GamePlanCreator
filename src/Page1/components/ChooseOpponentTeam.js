import { useDispatch, useSelector } from "react-redux";
import { setRivalPlayers } from "../../states/reducers/rivalPlayersReducer";
import { clearRivalZones } from "../../states/reducers/zonesReducer";
import { setBackRightRivalSelects } from "../../states/reducers/indexOfZonesReducer";
import { setRivalTeam } from "../../states/reducers/rivalClubReducer";

export function ChooseOpponentTeam() {
  const dispatch = useDispatch();
  const listOfTeams = useSelector((state) => state.listOfTeams);
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  function handleSetOpponentTeam(club) {
    dispatch(setRivalPlayers(listOfPlayers, club));
    dispatch(setRivalTeam(listOfTeams, club));
    dispatch(clearRivalZones(Array(6).fill(null)));
    dispatch(setBackRightRivalSelects([5, 2, 1, 0, 3, 4]));
  }
  return (
    <>
      <div className="opponentTeamList">
        {listOfTeams.map((team) => (
          <img
            alt=""
            onClick={() => handleSetOpponentTeam(team)}
            className="Logo"
            key={team.id}
            src={team.logo}
          ></img>
        ))}
      </div>
    </>
  );
}
