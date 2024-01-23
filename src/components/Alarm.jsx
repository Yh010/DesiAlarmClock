import { useState, useEffect } from 'react';

const Alarm = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
          setIsActive(false);
        } else {
          if (seconds === 0) {
            if (minutes === 0) {
              setHours((prevHours) => prevHours - 1);
              setMinutes(59);
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
            }
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, hours, minutes, seconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleInputChange = (event) => {
    const inputHours = parseInt(event.target.value.split(':')[0], 10);
    const inputMinutes = parseInt(event.target.value.split(':')[1], 10);

    setHours(isNaN(inputHours) ? 0 : inputHours);
    setMinutes(isNaN(inputMinutes) ? 0 : inputMinutes);
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="p-8 rounded-lg text-white text-center">
        <label htmlFor="time" className="text-sm block mb-2 text-sm text-left text-blue-500">
          Enter Time (HH:MM)
        </label>
        <input
          type="text"
          id="time"
          placeholder="00:00"
          value={`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`}
          onChange={handleInputChange}
          disabled={isActive}
          className="border-2 bg-transparent p-2 mr-2 w-24 text-black rounded-xl block w-full mb-3 text-white"
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
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alarm;
