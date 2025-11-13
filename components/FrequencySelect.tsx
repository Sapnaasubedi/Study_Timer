"use client";

const OPTIONS = [15, 20, 25, 30, 45];

export default function FrequencySelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {OPTIONS.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-3 py-1 rounded-full border ${
            value === o
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-700"
          }`}
        >
          {o}m
        </button>
      ))}
    </div>
  );
}
