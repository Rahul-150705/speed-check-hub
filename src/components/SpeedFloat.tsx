import { useEffect, useState, useRef } from "react";

export default function SpeedFloat() {
  const [speed, setSpeed] = useState({ download: 0, upload: 0, ping: 0 });
  const [expanded, setExpanded] = useState(false);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSpeed = async () => {
    try {
      const res = await fetch("http://localhost:8000/speed");
      const data = await res.json();
      if (!data.error) setSpeed(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (running) {
      fetchSpeed();
      intervalRef.current = setInterval(fetchSpeed, 3000);
    } else if (intervalRef.current) clearInterval(intervalRef.current);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  return (
    <>
      <div
        className="fixed top-1/2 right-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-bold text-lg flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform z-50"
        onClick={() => setExpanded(!expanded)}
      >
        {speed.download.toFixed(1)} Mbps
      </div>

      {expanded && (
        <div className="fixed top-1/2 right-24 w-80 bg-white p-5 rounded-2xl shadow-2xl border border-gray-200 z-50 text-center">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Live Internet Speed</h2>
          <p className="text-blue-600 text-2xl font-bold mb-2">Download: {speed.download.toFixed(1)} Mbps</p>
          <p className="text-green-600 text-2xl font-bold mb-2">Upload: {speed.upload.toFixed(1)} Mbps</p>
          <p className="text-purple-600 text-2xl font-bold mb-2">Ping: {speed.ping} ms</p>
          <div className="flex justify-center mt-4 space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => setRunning(true)}>Start</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700" onClick={() => setRunning(false)}>Stop</button>
          </div>
        </div>
      )}
    </>
  );
}
