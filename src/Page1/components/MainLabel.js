import {SetDate} from "./SetDate";

export function MainLabel({ clubs, myClub }) {
  return (
    <div>
      <label className="label">
        <SetDate />
        <div id="Matchup">
          {clubs.map((club) => club.name)} vs {myClub.map((team) => team.name)}
        </div>
        <div className="setGame">
          Game №<input type="text" className="GameNumber" />
        </div>
      </label>
    </div>
  );
}
