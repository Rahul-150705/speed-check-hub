import { useState } from "react";

export default function SpeedTestCard() {
  const [speed, setSpeed] = useState<{ download_mbps: number; upload_mbps: number; ping_ms: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const checkSpeed = async () => {
    setLoading(true);
    setSpeed(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/speedtest");
      const data = await res.json();
      setSpeed(data);
    } catch (err) {
      alert("⚠️ Failed to fetch speed test. Is your backend running?");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
      <h1 className="text-5xl font-bold mb-10">Internet Speed Test</h1>

      <button
        onClick={checkSpeed}
        className={`px-8 py-4 rounded-full font-semibold text-white transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Testing..." : "Start Test"}
      </button>

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-8 animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
      )}

      {/* Display Speed Results */}
      {speed && !loading && (
        <div className="mt-8 bg-white text-gray-800 rounded-2xl shadow-2xl p-8 text-center w-96 border border-gray-200">
          <p className="text-2xl font-semibold mb-2">
            Download: <span className="text-blue-600 font-bold">{speed.download_mbps} Mbps</span>
          </p>
          <p className="text-2xl font-semibold mb-2">
            Upload: <span className="text-green-600 font-bold">{speed.upload_mbps} Mbps</span>
          </p>
          <p className="text-2xl font-semibold">
            Ping: <span className="text-purple-600 font-bold">{speed.ping_ms} ms</span>
          </p>
        </div>
      )}
    </div>
  );
}
