export function ConeReaction({
  attackPercentageArray,
  range0,
  range10,
  range40,
  historyOfBalls,
}) {
  function button(zone) {
    return (
      <button
        type="button"
        className={
          (attackPercentageArray < 10 ? range0 + zone : "") ||
          (attackPercentageArray >= 10 && attackPercentageArray < 40
            ? range10 + zone
            : "") ||
          (attackPercentageArray >= 40 ? range40 + zone : "")
        }
      ></button>
    );
  }
  return (
    <>
      {(historyOfBalls[0].active && button("Service1")) ||
        (historyOfBalls[1].active && button("Service6")) ||
        (historyOfBalls[2].active && button("Service5"))}
    </>
  );
}
