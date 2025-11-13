"use client";

import FrequencySelect from "@/components/FrequencySelect";
import Timer from "@/components/Timer";
import { useEffect, useState } from "react";
import "./globals.css";

type Session = {
  id: string;
  seconds: number;
  minutes: number;
  createdAt: number;
};

export default function Home() {
  const [minutes, setMinutes] = useState(25);
  const [history, setHistory] = useState<Session[]>(() => {
    try {
      const raw = localStorage.getItem("timer_history");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("timer_history", JSON.stringify(history));
  }, [history]);

  const handleSessionEnd = (seconds: number) => {
    const session: Session = {
      id: `${Date.now()}`,
      seconds,
      minutes: Math.round(seconds / 60),
      createdAt: Date.now(),
    };
    setHistory((h) => [session, ...h].slice(0, 50));
  };

  const clearHistory = () => setHistory([]);

  return (
    <main className="min-h-screen bg-pink-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <header className="flex items-center justify-center mb-6">
          {/* <h1 className="text-3xl font-bold ">Focus Time</h1> */}
          {/* <div className="text-sm text-gray-600">
            Focus sessions & simple history
          </div> */}
        </header>

        {/* <section className="grid md:grid-cols-2 gap-6"> */}
        {/* <div> */}
        {/* <div className="mb-4 flex justify-center"> */}
        {/* <label className="block text-sm text-gray-700 mb-1">
              Session length
            </label> */}
        {/* <FrequencySelect value={minutes} onChange={setMinutes} /> */}
        {/* </div> */}

        <Timer defaultMinutes={minutes} onSessionEnd={handleSessionEnd} />
        {/* </div> */}

        {/* <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">History</h2>
              <button onClick={clearHistory} className="text-sm text-red-600">
                Clear
              </button>
            </div> */}

        {/* <ul className="space-y-2 max-h-96 overflow-auto">
              {history.length === 0 && (
                <div className="text-gray-500">No sessions yet</div>
              )}
              {history.map((s) => (
                <li
                  key={s.id}
                  className="bg-white p-3 rounded shadow-sm flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{s.minutes} min</div>
                    <div className="text-xs text-gray-500">
                      {new Date(s.createdAt).toLocaleString()} • {s.seconds}s
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Done</div>
                </li>
              ))}
            </ul> */}
        {/* </section> */}
      </div>
    </main>
  );
}
