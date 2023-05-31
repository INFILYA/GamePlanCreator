import { useDispatch, useSelector } from "react-redux";
import { setRivalPlayers } from "../../states/slices/rivalPlayersSlice";
import { setRivalTeam } from "../../states/slices/rivalClubSlice";
import { clearRivalZones } from "../../states/slices/zonesSlice";
import { setBackRightRivalSelects } from "../../states/slices/indexOfZonesSlice";

export function ChooseOpponentTeam() {
  const dispatch = useDispatch();
  const listOfTeams = useSelector((state) => state.listOfTeams.listOfTeams);
  const listOfPlayers = useSelector((state) => state.listOfPlayers.listOfPlayers);
  function handleSetOpponentTeam(club) {
    dispatch(setRivalPlayers({ listOfPlayers, club }));
    dispatch(setRivalTeam({ listOfTeams, club }));
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
