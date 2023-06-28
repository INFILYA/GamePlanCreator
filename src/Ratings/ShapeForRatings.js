import { useState } from "react";
import { useSelector } from "react-redux";
import { compare } from "../Datas/api";
import { upgradeAge } from "../StaticHelpModules/Button";

export default function ShapeForRatings({ amplua }) {
  const Players = useSelector((state) => state.listOfPlayers.listOfPlayers);
  const listOfTeams = useSelector((state) => state.listOfTeams.listOfTeams);
  const listOfPlayers = Players.map((player) => upgradeAge(player));
  const [directionOfSort, setDirectionOfSort] = useState(false);
  const [teamsOrPlayers, setTeamsOrPlayers] = useState(
    amplua === "teams" ? listOfTeams : listOfPlayers.filter((player) => player.position === amplua)
  );

  const categorysForAll = [
    { category: "name", text: "Name" },
    { category: "age", text: "Age" },
    { category: "height", text: "Height" },
    { category: "winPoints", text: " Points in Attack" },
    { category: "plusMinusOnAttack", text: "+/- on Attack" },
    { category: "plusMinusOnService", text: "+/- on Service" },
    { category: "percentOfAttack", text: "% on Attack" },
  ];
  const categorysForOthers = [
    { category: "name", text: "Name" },
    { category: "age", text: "Age" },
    { category: "height", text: "Height" },
    { category: "aces", text: "Aces" },
    { category: "serviceFailed", text: "Service Failed" },
    { category: "plusMinusOnService", text: "+/- on Service" },
    { category: "height", text: "Height" },
  ];
  const categorys = amplua === "Setter" ? categorysForOthers : categorysForAll;

  function countRankings(category) {
    const newArr2 = [...teamsOrPlayers];
    !directionOfSort
      ? newArr2.sort((a, b) => compare(b[category], a[category]))
      : newArr2.sort((a, b) => compare(a[category], b[category]));
    setTeamsOrPlayers(newArr2);
    setDirectionOfSort(!directionOfSort);
  }
  function changePodiumColors(index) {
    return index === 0
      ? { backgroundColor: "gold" }
      : index === 1
      ? { backgroundColor: "silver" }
      : index === 2
      ? { backgroundColor: "burlywood" }
      : {};
  }
  return (
    <>
      <div className="ratingTable">
        {categorys.map((category, index) => (
          <div
            className="ratingRow"
            key={index}
            style={category.text === "Name" ? { width: "220px" } : {}}
          >
            <div>
              <button
                onClick={() => countRankings(category.category)}
                title={`Click to sort by ${category.text}`}
              >
                {category.text}
              </button>
            </div>
            {teamsOrPlayers.map((player, index) =>
              category.text !== "Name" ? (
                <span key={index} style={changePodiumColors(index)}>
                  {category.category === "percentOfAttack" && amplua !== "Setter"
                    ? player[category.category] + "%"
                    : player[category.category]}
                </span>
              ) : (
                <span key={index} style={changePodiumColors(index)} className="rowName">
                  {index + 1}. {player[category.category]}
                </span>
              )
            )}
          </div>
        ))}
      </div>
    </>
  );
}
