export function IconOfPlayer({ player, setPlayerInfo, zones }) {
    return (
      <>
        {zones && <img src={player.photo} alt=""></img>}
        <div className="numberPlusInput" onFocus={() => setPlayerInfo(player)}>
          <button type="text" disabled className="playerNumber">
            {player.number}
          </button>
          <button type="text" className="input">
            {player.name}
          </button>
        </div>
      </>
    );
  }