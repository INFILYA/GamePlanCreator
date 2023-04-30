export function ChooseOpponentTeam({
  teams,
  handleSetOpponentTeam,
  resetTheBoard,
  players,
  myTeamPlayers,
}) {
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
