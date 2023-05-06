import { useState } from "react";
import { useSelector } from "react-redux";

export default function ShapeForRatings({ amplua }) {
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  const [listOfFilteredPlayers, serListOfFilteredPlayers] = useState(
    listOfPlayers.filter((player) => player.position === amplua)
  );
  const categorys = [
    { category: "name", text: "Name" },
    amplua !== "Setter"
      ? { category: "winPoints", text: "Points by Attack" }
      : { category: "servicePlus", text: "servicePlus" },
    { category: "aces", text: "Aces" },
    amplua !== "Setter"
      ? { category: "plusMinusOnAttack", text: "+/- on Attack" }
      : { category: "serviceMinus", text: "serviceMinus" },
    { category: "plusMinusOnService", text: "+/- on Service" },
    { category: "percentOfAttack", text: "% on Attack" },
  ];

  function countRankings(category) {
    const newArr2 = [...listOfFilteredPlayers];
    newArr2.sort((a, b) => b[category] > a[category]);
    serListOfFilteredPlayers(newArr2);
  }

  return (
    <div style={{ height: 700 }}>
      <div className="ratingTable">
        {categorys.map((category) => (
          <div className="ratingRow" key={category}>
            <div>
              <button
                onClick={() => countRankings(category.category)}
                title={`Clicl to sort by ${category.text}`}
              >
                {category.text}
              </button>
            </div>
            <hr />
            {listOfFilteredPlayers.map((player, index) => (
              <div key={player.id}>
                {category.category !== "name" ? (
                  <span>{player[category.category]}</span>
                ) : (
                  <span style={{ display: "flex", justifyContent: "start" }}>
                    {index + 1}. {player[category.category]}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
