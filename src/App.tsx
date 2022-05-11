import { useEffect, useState } from "react";
import Timer from "./components/Timer/Timer";
import TimerControls from "./components/TimerControls/TimerControls";

function App() {
  const [timeInMilliseconds, setTimeInMilliseconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [laps, setLaps] = useState<string[]>([]);

  const storedLaps = localStorage.getItem("laps")
    ? JSON.parse(localStorage.getItem("laps") || "")
    : [];

  console.log(storedLaps);

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

  // console.log(JSON.parse(localStorage.getItem("laps")));
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
    <div className="h-screen w-full flex flex-col items-center ">
      <div className="flex flex-col items-center border border-black">
        <h1 className="text-6xl font-bold">Stopwatch</h1>

        {milliToHMS(timeInMilliseconds)}

        <TimerControls
          setTimeInMilliseconds={setTimeInMilliseconds}
          handlePlayPause={handlePlayPause}
          handleReset={handleReset}
          isPaused={isPaused}
          isActive={isActive}
          handleLap={handleLap}
        />
      </div>
      <ul>
        {storedLaps.length > 0
          ? laps.map((lap: string) => <li key={lap}>{lap}</li>)
          : null}
      </ul>
      <button onClick={clearStoredLaps}>Clear</button>
    </div>
  );
}

export default App;
