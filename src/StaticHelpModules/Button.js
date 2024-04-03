export function Button({ onClick, value, style }) {
  return (
    <button className="regularButton" onClick={onClick} style={style}>
      {value}
    </button>
  );
}
export function upgradeAge(player) {
  const age1 = new Date().getTime();
  const age2 = Date.parse(player.age);
  const newAge = Math.floor((age1 - age2) / (1000 * 60 * 60 * 24 * 365));
  const newPlayer = { ...player, age: newAge };
  return newPlayer;
}

export const later = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
