export function Button({ onClick, value }) {
  return (
    <button className={"regularButton"} onClick={onClick}>
      {value}
    </button>
  );
}
export function upgradeAge(player) {
  const age1 = new Date();
  const age2 = Date.parse(player.age);
  const newAge = Math.floor((age1 - age2) / (1000 * 60 * 60 * 24 * 30 * 12));
  const newPlayer = { ...player, age: newAge };
  return newPlayer;
}
