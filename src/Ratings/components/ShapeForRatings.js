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
      ? { category: "winPoints", text: "Points won by Attack" }
      : { category: "servicePlus", text: "servicePlus" },
    { category: "aces", text: "Aces" },
    amplua !== "Setter"
      ? { category: "plusMinusOnAttack", text: "+/- on Attack" }
      : { category: "serviceMinus", text: "serviceMinus" },
    { category: "plusMinusOnService", text: "+/- on Service" },
  ];

  function countRankings(category) {
    const newArr2 = [...listOfFilteredPlayers];
    newArr2.sort((a, b) => b[category] > a[category]);
    serListOfFilteredPlayers(newArr2);
  }

  return (
    <div className="ratingTable">
      {categorys.map((category, index) => (
        <div className="ratingRow" key={index + category}>
          <h1 onClick={() => countRankings(category.category)}>
            {category.text}
          </h1>
          <hr />
          {listOfFilteredPlayers.map((player) => (
            <div key={player.id}>
              <span>{player[category.category]}</span>
              <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
