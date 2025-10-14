import { useState } from "react";

export default function SpeedTestCard() {
  const [speed, setSpeed] = useState<{download_mbps: number, upload_mbps: number, ping_ms: number} | null>(null);
  const [loading, setLoading] = useState(false);

  const checkSpeed = async () => {
    setLoading(true);
    setSpeed(null);
    try {
      const res = await fetch("http://localhost:8000/speedtest");
      const data = await res.json();
      setSpeed(data);
    } catch (err) {
      alert("Failed to fetch speed test. Is your backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <h1 className="text-5xl font-bold mb-10 text-gray-800">Internet Speed Test</h1>

      <button
        onClick={checkSpeed}
        className={`px-8 py-4 rounded-full font-semibold text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Testing..." : "Check Speed"}
      </button>

      {speed && (
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 text-center w-80">
          <p className="text-lg font-medium">Download: <span className="font-bold">{speed.download_mbps} Mbps</span></p>
          <p className="text-lg font-medium">Upload: <span className="font-bold">{speed.upload_mbps} Mbps</span></p>
          <p className="text-lg font-medium">Ping: <span className="font-bold">{speed.ping_ms} ms</span></p>
        </div>
      )}
    </div>
  );
}
