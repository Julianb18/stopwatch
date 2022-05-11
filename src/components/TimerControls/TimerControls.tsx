import React, { useState } from "react";

interface ITimerControlsProps {
  setTimeInMilliseconds: (arg: any) => void;
  handlePlayPause: () => void;
  handleReset: () => void;
  handleLap: () => void;
  isPaused: boolean;
  isActive: boolean;
}

const TimerControls = (props: ITimerControlsProps) => {
  return (
    <div className="space-x-2">
      <button onClick={props.handlePlayPause}>
        {props.isActive && !props.isPaused ? "pause" : "play"}
      </button>
      {/* <button onClick={props.handleStart}>pause</button> */}
      <button onClick={props.handleReset}>reset</button>
      <button onClick={props.handleLap}>Lap</button>
    </div>
  );
};

export default TimerControls;
