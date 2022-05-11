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
    <div className="flex justify-around w-full space-x-2 select-none">
      {props.isActive && !props.isPaused ? (
        <button
          className="rounded-full w-14 h-14 font-semibold text-white bg-gray-400 outline outline-gray-400 outline-offset-1 
          outline-[2.5px] hover:bg-gray-500 hover:outline-gray-500"
          onClick={props.handleLap}
        >
          Lap
        </button>
      ) : (
        <button
          className="rounded-full w-14 h-14 font-semibold text-white bg-gray-400 outline outline-gray-400 outline-offset-1
          outline-[2.5px] hover:bg-gray-500 hover:outline-gray-500"
          onClick={props.handleReset}
        >
          reset
        </button>
      )}

      <button
        className={`rounded-full w-14 h-14 font-semibold text-white outline outline-[2.5px] outline-offset-1
        ${
          props.isActive && !props.isPaused
            ? "outline-green-400 bg-green-400 hover:outline-green-500 hover:bg-green-500"
            : "outline-red-400 bg-red-400 hover:outline-red-500 hover:bg-red-500"
        }
        `}
        onClick={props.handlePlayPause}
      >
        {props.isActive && !props.isPaused ? "pause" : "play"}
      </button>
    </div>
  );
};

export default TimerControls;
