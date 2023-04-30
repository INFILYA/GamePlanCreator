export function Squads({
  setRivalPlayerToZone,
  indexOfZones,
  sequanceOfZones,
  removeRivalSelectOption,
  setPlayerInfo,
  clubs,
  players,
  correctNamesOfZones,
  rtl,
  fuchsia,
  darkgray,
}) {
  return (
    <>
      <div className="teamsquad">
        {clubs.map((club) => (
          <div className="teamLogo" key={club.id} style={rtl}>
            <input className="teamlabel" readOnly value={club.name} />
            <img className="photoLogo" src={club.logo} alt="" />
          </div>
        ))}
        {players.map((player) => (
          <div key={player.id} className="playerSurname" style={rtl}>
            <div
              className="numberPlusInput"
              onFocus={() => setPlayerInfo(player)}
            >
              <button
                type="text"
                disabled
                className="playerNumber"
                style={fuchsia}
              >
                {player.number}
              </button>
              <button type="text" className="input" style={darkgray}>
                {player.name}
              </button>
            </div>
            {indexOfZones && (
              <select className="moveToBoard" type="text">
                {!sequanceOfZones ? (
                  <option defaultValue="▶">▶</option>
                ) : (
                  <option defaultValue="◀">◀</option>
                )}
                {indexOfZones.map((zone, index) => (
                  <option
                    key={index}
                    value={`index[${[zone]}]`}
                    onClick={() =>
                      setRivalPlayerToZone(player, zone) ||
                      removeRivalSelectOption(zone)
                    }
                  >
                    {correctNamesOfZones(zone)}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
