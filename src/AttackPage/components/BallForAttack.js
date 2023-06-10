import { useState } from "react";

export function BallForAttack({
  attack,
  index,
  historyOfBalls,
  setHistoryOfBalls,
  setShowInputs,
  value,
  setShowBalls,
  showInputs,
}) {
  const [showTheBall, setShowTheBall] = useState(true);
  function onClickSetCorrectBall(index) {
    const newBalls = [...historyOfBalls];
    if (showTheBall) {
      newBalls[index] = { ...newBalls[index], active: true };
      setShowInputs(!showInputs);
      setShowBalls(true);
      setShowTheBall(!showTheBall);
    } else {
      newBalls[index] = { ...newBalls[index], active: false };
      setShowInputs(!showInputs);
      setShowBalls(false);
      setShowTheBall(!showTheBall);
    }
    setHistoryOfBalls(newBalls);
  }
  return (
    <>
      <button type="button" className={attack} onClick={() => onClickSetCorrectBall(index)}>
        {value}
      </button>
    </>
  );
}
