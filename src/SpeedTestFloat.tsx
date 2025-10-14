import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SpeedTestFloat() {
  const [speed, setSpeed] = useState<{ download_mbps: number; upload_mbps: number; ping_ms: number }>({
    download_mbps: 0,
    upload_mbps: 0,
    ping_ms: 0,
  });
  const [expanded, setExpanded] = useState(false);

  // Fetch speed every 3 seconds
  useEffect(() => {
    const fetchSpeed = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/speedtest");
        const data = await res.json();
        setSpeed(data);
      } catch (err) {
        console.error("Failed to fetch speed", err);
      }
    };

    fetchSpeed(); // initial fetch
    const interval = setInterval(fetchSpeed, 3000); // every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Floating circle */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
      >
        <CircularProgressbar
          value={speed.download_mbps}
          maxValue={200}
          text={`${speed.download_mbps} Mbps`}
          styles={buildStyles({
            textColor: "#2563eb",
            pathColor: "#2563eb",
            trailColor: "#dbeafe",
            textSize: "8px",
          })}
        />
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="mt-4 bg-white p-6 rounded-2xl shadow-2xl w-80">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Internet Speed</h2>
          <div className="space-y-3">
            <p className="text-gray-700 font-semibold">
              Download: <span className="text-blue-600 font-bold">{speed.download_mbps} Mbps</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Upload: <span className="text-green-600 font-bold">{speed.upload_mbps} Mbps</span>
            </p>
            <p className="text-gray-700 font-semibold">
              Ping: <span className="text-purple-600 font-bold">{speed.ping_ms} ms</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
