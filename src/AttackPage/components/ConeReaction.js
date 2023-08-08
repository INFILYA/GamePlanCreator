export function ConeReaction({ attackPercentageArray, cone, historyOfBalls, type }) {
  function button(zone) {
    const x = attackPercentageArray === 0 ? "transparent" : 100 - attackPercentageArray * 1.5;
    return (
      <button
        type="button"
        style={{ borderBottomColor: `hsl(0,100%,${x}%)` }}
        className={zone + cone}
      ></button>
    );
  }
  return (
    <>
      {type === "Attack"
        ? (historyOfBalls[0].active && button("zone1")) ||
          (historyOfBalls[1].active && button("zone2")) ||
          (historyOfBalls[2].active && button("zone4")) ||
          (historyOfBalls[3].active && button("Pipe")) ||
          (historyOfBalls[4].active && button("K1")) ||
          (historyOfBalls[5].active && button("KC")) ||
          (historyOfBalls[6].active && button("K7"))
        : (historyOfBalls[0].active && button("service1")) ||
          (historyOfBalls[1].active && button("service6")) ||
          (historyOfBalls[2].active && button("service5"))}
    </>
  );
}
