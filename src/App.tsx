import { useEffect, useState } from "react";

import TimerControls from "./components/TimerControls/TimerControls";

function App() {
  const [timeInMilliseconds, setTimeInMilliseconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [laps, setLaps] = useState<string[]>([]);

  const storedLaps = localStorage.getItem("laps")
    ? JSON.parse(localStorage.getItem("laps") || "")
    : [];

  const milliToHMS = (timeInMilli: number): string => {
    const hrs = ("0" + Math.floor((timeInMilli / 3600000) % 24)).slice(-2);
    const mins = ("0" + Math.floor((timeInMilli / 60000) % 60)).slice(-2);
    const secs = ("0" + Math.floor((timeInMilli / 1000) % 60)).slice(-2);
    const milli = ("0" + ((timeInMilli / 10) % 100)).slice(-2);

    return `${hrs}:${mins}:${secs}:${milli}`;
  };

  const handlePlayPause = () => {
    setIsActive(true);
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeInMilliseconds(0);
  };

  const handleLap = () => {
    if (!isActive) {
      return;
    }
    let tempLaps = [...laps];

    tempLaps.push(milliToHMS(timeInMilliseconds));
    localStorage.setItem("laps", JSON.stringify(tempLaps));
    setLaps(tempLaps);
  };

  const clearStoredLaps = () => {
    localStorage.clear();
    setLaps([]);
  };

  useEffect(() => {
    let interval: any = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTimeInMilliseconds((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    // clean up on unmount
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  useEffect(() => {
    if (!storedLaps) {
      return;
    }
    setLaps(storedLaps);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <div className="flex flex-col items-center mt-40 space-y-7">
        <span className="text-6xl font-bold tabular-nums">
          {milliToHMS(timeInMilliseconds)}
        </span>

        <TimerControls
          setTimeInMilliseconds={setTimeInMilliseconds}
          handlePlayPause={handlePlayPause}
          handleReset={handleReset}
          isPaused={isPaused}
          isActive={isActive}
          handleLap={handleLap}
        />

        {/* Laps */}
        <div className="flex flex-col items-center w-full space-y-2">
          {!laps.length ? null : (
            <button
              className="flex self-end group space-x-1 cursor-pointer"
              onClick={clearStoredLaps}
            >
              <span>Clear</span>
              {/* TODO: implement svg with as component */}

              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          <ul className="w-full flex flex-col divide-y">
            {storedLaps.length > 0
              ? laps.map((lap: string, i: number) => (
                  <li className="flex justify-between" key={lap}>
                    <span>Lap {i + 1}</span>
                    <span className="tabular-nums">{lap}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
