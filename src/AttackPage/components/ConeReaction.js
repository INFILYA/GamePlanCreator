export function ConeReaction({
    attackPercentageArray,
    range0,
    range15,
    range25,
    range35,
    historyOfBalls,
  }) {
    function button(zone) {
      return (
        <button
          type="button"
          className={
            (attackPercentageArray < 15 ? range0 + zone : "") ||
            (attackPercentageArray >= 15 && attackPercentageArray < 25
              ? range15 + zone
              : "") ||
            (attackPercentageArray >= 25 && attackPercentageArray < 35
              ? range25 + zone
              : "") ||
            (attackPercentageArray >= 35 ? range35 + zone : "")
          }
        ></button>
      );
    }
    return (
      <>
        {(historyOfBalls[0].active === true && button("zone1")) ||
          (historyOfBalls[1].active === true && button("zone2")) ||
          (historyOfBalls[2].active === true && button("zone4")) ||
          (historyOfBalls[3].active === true && button("Pipe")) ||
          (historyOfBalls[4].active === true && button("K1")) ||
          (historyOfBalls[5].active === true && button("KC")) ||
          (historyOfBalls[6].active === true && button("K7"))}
      </>
    );
  }