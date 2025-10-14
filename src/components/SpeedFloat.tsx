import { useEffect, useState } from "react";

export default function SpeedFloat() {
  const [speed, setSpeed] = useState({ download: 0, upload: 0, ping: 0 });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchSpeed = async () => {
      try {
        const res = await fetch("http://localhost:8000/speed");
        const data = await res.json();
        if (!data.error) setSpeed(data);
      } catch (err) {
        console.error("Error fetching speed:", err);
      }
    };

    fetchSpeed(); // initial fetch
    const interval = setInterval(fetchSpeed, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Bubble */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="fixed top-1/2 right-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-xl cursor-pointer hover:scale-110 transition-transform z-50"
      >
        {speed.download.toFixed(1)} Mbps
      </div>

      {/* Expanded Panel */}
      {expanded && (
        <div className="fixed top-1/2 right-24 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 w-80 text-center z-50">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Live Internet Speed
          </h2>
          <p className="text-blue-600 text-2xl font-bold mb-2">
            Download: {speed.download.toFixed(1)} Mbps
          </p>
          <p className="text-green-600 text-2xl font-bold mb-2">
            Upload: {speed.upload.toFixed(1)} Mbps
          </p>
          <p className="text-purple-600 text-2xl font-bold">
            Ping: {speed.ping} ms
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
