import { useState, useEffect } from 'react';

const Alarm = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
          setIsActive(false);
        } else {
          if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, minutes, seconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleInputChange = (event) => {
    const inputMinutes = parseInt(event.target.value, 10);
    setMinutes(isNaN(inputMinutes) ? 0 : inputMinutes);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="p-8 rounded-lg text-white text-center">
        <label htmlFor="minutes" className="text-sm block mb-2 text-sm text-left text-blue-500">
          Enter Minutes
        </label>
        <input
          type="number"
          id="minutes"
          placeholder="0"
          value={minutes}
          onChange={handleInputChange}
          disabled={isActive}
          className="border-2 bg-transparent p-2 mr-2 w-16 text-black rounded-xl block w-full mb-3 text-white"
        />
        <button
          onClick={handleStart}
          disabled={isActive}
          className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          Play
        </button>
        <button
          onClick={handleReset}
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Reset
        </button>
        {isActive && (
          <button
            onClick={handlePause}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded ml-2"
          >
            Pause
          </button>
        )}
        <div className="mt-4">
          <p className="text-6xl text-bold text-blue-500">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alarm;