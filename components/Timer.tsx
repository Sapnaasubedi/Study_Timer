"use client";
import React, { useEffect, useRef, useState } from "react";
import "../app/globals.css";

type TimerState = "stopped" | "running" | "paused";

interface Props {
  defaultMinutes?: number;
  onSessionEnd?: (sessionLengthSec: number) => void;
}

export default function Timer({ defaultMinutes = 25, onSessionEnd }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(defaultMinutes * 60);
  const [mode, setMode] = useState<TimerState>("stopped");
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (mode === "running") {
      timer = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            // stop and notify
            setMode("stopped");
            if (onSessionEnd && startedAtRef.current) {
              const elapsed = Math.round(
                (Date.now() - startedAtRef.current) / 1000
              );
              onSessionEnd(elapsed);
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [mode, onSessionEnd]);

  useEffect(() => {
    // reset when defaultMinutes changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSecondsLeft(defaultMinutes * 60);
    setMode("stopped");
  }, [defaultMinutes]);

  const start = () => {
    if (mode === "running") return;
    if (mode === "stopped") {
      setSecondsLeft(defaultMinutes * 60);
    }
    startedAtRef.current = Date.now();
    setMode("running");
  };

  const pause = () => {
    if (mode !== "running") return;
    setMode("paused");
  };

  const resume = () => {
    if (mode !== "paused") return;
    setMode("running");
  };

  const reset = () => {
    setMode("stopped");
    setSecondsLeft(defaultMinutes * 60);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="w-full max-w-md mx-auto ">
      <div className="text-center">
        <div className="flex gap-2">
          <div className="text-pink-200 text-9xl font-extrabold  bg-red-100 p-20 rounded-2xl shadow-lg ">
            {mm}
          </div>
          <div className="text-9xl text-pink-200  font-extrabold  bg-red-100 p-20 rounded-2xl shadow-lg ">
            {ss}
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-600">Mode: {mode}</div>
        <div className="mt-4 flex justify-center gap-3">
          {mode !== "running" && (
            <button
              onClick={start}
              className="px-4 py-2 rounded bg-green-500 text-white"
            >
              Start
            </button>
          )}
          {mode === "running" && (
            <button
              onClick={pause}
              className="px-4 py-2 rounded bg-yellow-500 text-white"
            >
              Pause
            </button>
          )}
          {mode === "paused" && (
            <button
              onClick={resume}
              className="px-4 py-2 rounded bg-green-600 text-white"
            >
              Resume
            </button>
          )}
          <button
            onClick={reset}
            className="px-4 py-2 rounded bg-red-500 text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
