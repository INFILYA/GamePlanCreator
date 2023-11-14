import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compare } from "../Datas/api";
import { setInfoOfPlayer } from "../states/slices/playerInfoSlice";
import { upgradeAge } from "../StaticHelpModules/Button";

export default function ShapeForRatings({ amplua }) {
  const dispatch = useDispatch();
  const Players = useSelector((state) => state.listOfPlayers.listOfPlayers);
  const listOfTeams = useSelector((state) => state.listOfTeams.listOfTeams);
  const listOfPlayers = Players.map((player) => upgradeAge(player));
  const [directionOfSort, setDirectionOfSort] = useState(false);
  const [teamsOrPlayers, setTeamsOrPlayers] = useState(
    amplua === "teams" ? listOfTeams : listOfPlayers.filter((player) => player.position === amplua)
  );

  const categorys = [
    { header: "Name", category: "name" },
    { header: "Club", category: "teamid" },
    { header: "Age", category: "age" },
    { header: "Height", category: "height" },
    { header: "Aces", category: "aces" },
    { header: "Win points", category: "winPoints" },
    { header: "Service +/-", category: "plusMinusOnService" },
    { header: "Attack +/-", category: "plusMinusOnAttack" },
    { header: "Attack %", category: "percentOfAttack" },
  ];
  function countRankings(category) {
    const newArr2 = [...teamsOrPlayers];
    !directionOfSort
      ? newArr2.sort((a, b) => compare(b[category], a[category]))
      : newArr2.sort((a, b) => compare(a[category], b[category]));
    setTeamsOrPlayers(newArr2);
    setDirectionOfSort(!directionOfSort);
  }
  function changeBgColors(index) {
    const backgrounds = [
      { backgroundColor: "gold" },
      { backgroundColor: "silver" },
      { backgroundColor: "burlywood" },
    ];
    return backgrounds[index];
  }
  function showInfoOfPlayer(name) {
    const pickedPlayer = Players.find((player) => player.name === name);
    dispatch(setInfoOfPlayer(pickedPlayer));
  }
  function getAveragePlusMinus(team, key) {
    const teamPlusMinus =
      team[key] / listOfPlayers.filter((player) => player.teamid === team.name).length;
    return +teamPlusMinus.toFixed(1);
  }
  return (
    <>
      <tr>
        {categorys.map((row) => (
          <th key={row.header}>
            <button
              onClick={() => countRankings(row.category)}
              title={`Click to sort by ${row.header}`}
            >
              {row.header}
            </button>
          </th>
        ))}
      </tr>
      {teamsOrPlayers.map((player, index) => (
        <tr
          onClick={() => showInfoOfPlayer(player.name)}
          key={player.name}
          className="rating-row"
          style={changeBgColors(index)}
        >
          <td style={{ padding: "0 0.5vw", textAlign: "start" }}>
            {index + 1}.<nobr> {player.name}</nobr>
          </td>
          <td style={{ display: "flex", justifyContent: "center" }}>
            <img src={`/photos/${player.teamid || player.name}.jpg`} alt="" />
          </td>
          <td>{player.age}</td>
          <td>{player.height}</td>
          <td>{player.aces}</td>
          <td>{player.winPoints}</td>
          <td>
            {"logo" in player
              ? getAveragePlusMinus(player, "plusMinusOnService")
              : player.plusMinusOnService}
          </td>
          <td>
            {"logo" in player
              ? getAveragePlusMinus(player, "plusMinusOnAttack")
              : player.plusMinusOnAttack}
          </td>
          <td>{player.percentOfAttack} %</td>
        </tr>
      ))}
    </>
  );
}
