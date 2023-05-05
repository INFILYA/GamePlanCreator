import { useSelector } from "react-redux";

export default function OppositesRating() {
  const listOfPlayers = useSelector((state) => state.listOfPlayers);
  const listOfOpposites = listOfPlayers.filter(
    (player) => player.position === "Opposite"
  );
  return (
    <div className="ratingTable">
      <div className="ratingRow">
        <h1>Name</h1>
        <hr />
        <ol>
          {listOfOpposites.map((player) => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ol>
      </div>
      <div className="ratingRow">
        <h1>Age</h1>
        <hr />
        <ol>
          {listOfOpposites.map((player) => (
            <li key={player.id}>{player.age}</li>
          ))}
        </ol>
      </div>
      <div className="ratingRow">
        <h1>Aces</h1>
        <hr />
        <ol>
          {listOfOpposites.map((player) => (
            <li key={player.id}>{player.aces}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
