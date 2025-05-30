"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [splits, setSplits] = useState<string[]>([]);
  const startRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const secondsRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startRef.current = null;
      animationRef.current = requestAnimationFrame(tick);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSec % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const tick = (timestamp: number) => {
    if (!startRef.current) startRef.current = timestamp;
    const delta = timestamp - startRef.current;
    secondsRef.current += delta;
    setSeconds(secondsRef.current);
    startRef.current = timestamp;
    animationRef.current = requestAnimationFrame(tick);
  };

  const handleSplit = () => {
    setSplits((prev) => [...prev, formatTime(secondsRef.current)]);
  };

  const handleReset = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    secondsRef.current = 0;
    setSeconds(0);
    setSplits([]);
    setIsRunning(false);
  };

  return (
    <main style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Stopwatch</h1>
      <h2 style={{ fontSize: "3rem", margin: "1rem 0" }}>
        {formatTime(seconds)}
      </h2>

      <button
        onClick={() => setIsRunning((prev) => !prev)}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isRunning ? "Stop" : "Start"}
      </button>

      <button
        onClick={handleSplit}
        disabled={!isRunning}
        className="ml-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Split
      </button>

      <button
        onClick={handleReset}
        className="ml-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Reset
      </button>

      {splits.length > 0 && (
        <div
          style={{
            marginTop: "2rem",
            textAlign: "left",
            maxWidth: "400px",
            margin: "2rem auto",
          }}
        >
          <h3>List:</h3>
          <ul>
            {splits.map((time, index) => (
              <li key={index}>
                Time {index + 1}: <strong>{time}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
