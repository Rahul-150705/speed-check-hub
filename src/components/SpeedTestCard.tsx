import { useState } from "react";

export default function SpeedTestCard() {
  const [speed, setSpeed] = useState<{download:number,upload:number,ping:number}|null>(null);
  const [loading, setLoading] = useState(false);

  const checkSpeed = async () => {
    setLoading(true);
    setSpeed(null);
    try {
      const res = await fetch("http://localhost:8000/speed");
      const data = await res.json();
      setSpeed(data);
    } catch (err) {
      alert("Failed to fetch speed test. Is backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={checkSpeed}
        className={`px-8 py-4 rounded-full font-semibold text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Testing..." : "Start Speed Test"}
      </button>

      {speed && !loading && (
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 text-center w-80">
          <p className="text-lg font-medium">Download: <span className="font-bold">{speed.download} Mbps</span></p>
          <p className="text-lg font-medium">Upload: <span className="font-bold">{speed.upload} Mbps</span></p>
          <p className="text-lg font-medium">Ping: <span className="font-bold">{speed.ping} ms</span></p>
        </div>
      )}
    </div>
  );
}
