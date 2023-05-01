import { useSelector } from "react-redux";
import { SetDate } from "./SetDate";

export function MainLabel() {
  const rivalClub = useSelector((state) => state.rivalClub);
  const myClub = useSelector((state) => state.myClub);
  return (
    <div>
      <label className="label">
        <SetDate />
        <div id="Matchup">
          {rivalClub.map((club) => club.name)} vs{" "}
          {myClub.map((club) => club.name)}
        </div>
        <div className="setGame">
          Game №<input type="text" className="GameNumber" />
        </div>
      </label>
    </div>
  );
}
