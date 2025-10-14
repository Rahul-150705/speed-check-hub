import { useState } from "react";

export default function Home() {
  const [speed, setSpeed] = useState<{ download: number; upload: number; ping: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const checkSpeed = async () => {
    setLoading(true);
    setSpeed(null);
    try {
      const res = await fetch("http://localhost:8000/speed");
      const data = await res.json();
      if (!data.error) setSpeed(data);
    } catch (err) {
      alert("Backend not running!");
    }
    setLoading(false);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to SpeedCheck Hub</h1>

      <button
        onClick={checkSpeed}
        className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Running Test..." : "Run Speed Test"}
      </button>

      {speed && (
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 w-80 mx-auto border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Internet Speed</h2>
          <p className="text-blue-600 text-xl font-semibold mb-2">Download: {speed.download.toFixed(2)} Mbps</p>
          <p className="text-green-600 text-xl font-semibold mb-2">Upload: {speed.upload.toFixed(2)} Mbps</p>
          <p className="text-purple-600 text-xl font-semibold">Ping: {speed.ping} ms</p>
        </div>
      )}
    </div>
  );
}
