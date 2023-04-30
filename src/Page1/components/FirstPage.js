import { PersonalInformationOfPlayer } from "../../PersonalInfo/PersonalInformationOfPlayer";
import { ChooseOpponentTeam } from "./ChooseOpponentTeam";
import { IconOfPlayer } from "./IconOfPlayer";
import { Squads } from "./Squads";

export function FirstPage({
  zones,
  myTeamZones,
  setPlayerToZone,
  setPlayerToMyTeamZone,
  handleSetOpponentTeam,
  handleSetMyTeam,
  indexOfZones,
  removeRivalOption,
  playerInfo,
  setPlayerInfo,
  clubs,
  myClub,
  players,
  myTeamPlayers,
  resetTheBoard,
  listOfTeams,
  listOfPlayers,
  sequanceOfZones,
  removeMyTeamOption,
  moveRotationForward,
  moveRotationBack,
  correctNamesOfZones,
}) {
  return (
    <>
      <Squads
        setPlayerToZone={setPlayerToZone}
        indexOfZones={indexOfZones}
        removeRivalOption={removeRivalOption}
        setPlayerInfo={setPlayerInfo}
        clubs={clubs}
        players={players}
        listOfPlayers={listOfPlayers}
        correctNamesOfZones={correctNamesOfZones}
      />

      <div className="rotation">
        <div style={{ display: "flex", justifyContent: "center" }}>
          {playerInfo && (
            <PersonalInformationOfPlayer
              player={playerInfo}
              onClick={() => setPlayerInfo(null)}
            />
          )}
        </div>
        <ChooseOpponentTeam
          teams={listOfTeams}
          handleSetOpponentTeam={handleSetOpponentTeam}
          resetTheBoard={resetTheBoard}
          players={players}
          myTeamPlayers={myTeamPlayers}
        />
        <div style={{ marginBottom: 8 }}>
          {zones.slice(0, 3).map((player, index) =>
            player ? (
              <div className="container" key={player.id}>
                <IconOfPlayer
                  player={player}
                  setPlayerInfo={setPlayerInfo}
                  zones={zones}
                />
              </div>
            ) : (
              <div className="container" key={"_" + index}>
                {correctNamesOfZones(index)}
              </div>
            )
          )}
        </div>
        <div>
          {myTeamZones.slice(0, 3).map((player, index) =>
            player ? (
              <div className="smallBox" key={player.id}>
                <IconOfPlayer player={player} setPlayerInfo={setPlayerInfo} />
              </div>
            ) : (
              <div className="smallBox" key={"x" + index}></div>
            )
          )}
        </div>
        <div style={{ marginBottom: 9 }}>
          {zones.slice(3, 6).map((player, index) =>
            player ? (
              <div className="container" key={player.id}>
                <IconOfPlayer
                  player={player}
                  setPlayerInfo={setPlayerInfo}
                  zones={zones}
                />
              </div>
            ) : (
              <div className="container" key={"_" + index}>
                {correctNamesOfZones(index + 3)}
              </div>
            )
          )}
        </div>
        <div>
          {myTeamZones.slice(3, 6).map((player, index) =>
            player ? (
              <div className="smallBox" key={player.id}>
                <IconOfPlayer player={player} setPlayerInfo={setPlayerInfo} />
              </div>
            ) : (
              <div className="smallBox" key={"x" + index}></div>
            )
          )}
        </div>
        <div className="plusMinus" style={{ marginTop: 20 }}>
          <button onClick={moveRotationForward}>🡄</button>
          {myTeamZones.map((player, index) =>
            player && player.position === "Setter" ? (
              <span
                key={player.id}
                style={{ marginLeft: 50, marginRight: 50, fontSize: 35 }}
              >
                {correctNamesOfZones(index)}
              </span>
            ) : null
          )}
          <button onClick={moveRotationBack}>🡆</button>
        </div>
      </div>
      {myTeamPlayers.length > 2 ? (
        <Squads
          setPlayerInfo={setPlayerInfo}
          setPlayerToZone={setPlayerToMyTeamZone}
          removeRivalOption={removeMyTeamOption}
          indexOfZones={sequanceOfZones}
          clubs={myClub}
          players={myTeamPlayers}
          sequanceOfZones={sequanceOfZones}
          correctNamesOfZones={correctNamesOfZones}
          rtl={{ direction: "rtl" }}
          fuchsia={{
            backgroundColor: "fuchsia",
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          darkgray={{
            backgroundColor: "darkgray",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
      ) : (
        <div className="teamsquad">
          <select className="chooseHomeTeam">
            <option value="Choose home team">Choose home team</option>
            {listOfTeams.map((team) => (
              <option key={team.id} onClick={() => handleSetMyTeam(team.name)}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
