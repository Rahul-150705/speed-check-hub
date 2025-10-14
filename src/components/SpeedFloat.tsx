import { useEffect, useState } from "react";

export default function SpeedFloat() {
  const [speed, setSpeed] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  // fetch speed every 3 seconds
  useEffect(() => {
    const fetchSpeed = async () => {
      try {
        const res = await fetch("http://localhost:8000/speed");
        const data = await res.json();
        if (data.download) setSpeed(data.download.toFixed(1));
      } catch (err) {
        console.error("Speed fetch error:", err);
      }
    };

    fetchSpeed();
    const interval = setInterval(fetchSpeed, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Speed Circle */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="fixed bottom-6 right-6 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-xl cursor-pointer hover:scale-110 transition-transform"
      >
        {speed ? `${speed}` : "…"}
        <span className="text-xs ml-1">Mbps</span>
      </div>

      {/* Expanded view when clicked */}
      {expanded && (
        <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 w-80 text-center z-50">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Live Internet Speed
          </h2>
          <p className="text-3xl font-bold text-blue-600 mb-2">
            {speed ? `${speed} Mbps` : "Measuring..."}
          </p>
          <button
            className="mt-3 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            onClick={() => setExpanded(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
