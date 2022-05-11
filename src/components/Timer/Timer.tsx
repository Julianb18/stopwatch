import React, { useEffect, useState } from "react";

const Timer = () => {
  //   const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  //   const [HMSTime, setHMSTime] = useState<string>("");

  //   const secondsToHMS = (timeInSeconds: number): string => {
  //     //
  //     let hrs = Math.floor(timeInSeconds / 3600);
  //     let mins = Math.floor((timeInSeconds % 3600) / 60);
  //     let secs = Math.floor((timeInSeconds % 3600) % 60);

  //     let formattedHrs = hrs < 10 ? `0${hrs}` : hrs;
  //     let formattedMins = mins < 10 ? `0${mins}` : mins;
  //     let formattedSecs = secs < 10 ? `0${secs}` : secs;
  //     return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
  //     // return [hrs, mins, secs];
  //   };

  //   useEffect(() => {
  //     setHMSTime(secondsToHMS(timeInSeconds));
  //   }, [timeInSeconds]);

  //   return <p>{HMSTime}</p>;
  return <div>Timer</div>;
};

export default Timer;
