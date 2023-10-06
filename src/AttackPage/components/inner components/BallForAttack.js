import { useState } from "react";

export function BallForAttack({
  attack,
  index,
  zonesStates,
  setZonesStates,
  setShowInputs,
  value,
  setShowBalls,
  showInputs,
}) {
  const [showTheBall, setShowTheBall] = useState(true);
  function onClickSetCorrectBall(index) {
    const newBalls = [...zonesStates];
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
    setZonesStates(newBalls);
  }
  return (
    <>
      <button type="button" className={attack} onClick={() => onClickSetCorrectBall(index)}>
        {value}
      </button>
    </>
  );
}
