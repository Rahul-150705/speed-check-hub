import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

export default function Home() {
  const [speed, setSpeed] = useState<{ download: number; upload: number; ping: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const checkSpeed = async () => {
    setLoading(true);
    setSpeed(null);
    try {
      const res = await fetch("http://localhost:8000/speedtest");
      const data = await res.json();
      if (!data.error) {
        setSpeed({
          download: data.download_mbps,
          upload: data.upload_mbps,
          ping: data.ping_ms,
        });
      }
    } catch (err) {
      alert("⚠️ Backend not running or connection failed.");
    }
    setLoading(false);
  };

  const graphData = speed
    ? [
        { name: "Download", value: speed.download, color: "#3b82f6" },
        { name: "Upload", value: speed.upload, color: "#10b981" },
        { name: "Ping", value: speed.ping, color: "#8b5cf6" },
      ]
    : [];

  return (
    <div className="text-center mt-10">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Internet Speed Test</h1>

      {!speed && (
        <button
          onClick={checkSpeed}
          className={`px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Running Test..." : "Run Speed Test"}
        </button>
      )}

      {speed && (
        <div className="mt-10 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl mx-auto border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Internet Speed</h2>

          <div className="grid grid-cols-3 gap-6 mb-8 text-lg font-semibold">
            <div className="bg-blue-50 rounded-xl py-6 shadow-inner">
              <p className="text-blue-600 text-2xl">Download</p>
              <p className="text-3xl font-bold">{speed.download.toFixed(2)} Mbps</p>
            </div>
            <div className="bg-green-50 rounded-xl py-6 shadow-inner">
              <p className="text-green-600 text-2xl">Upload</p>
              <p className="text-3xl font-bold">{speed.upload.toFixed(2)} Mbps</p>
            </div>
            <div className="bg-purple-50 rounded-xl py-6 shadow-inner">
              <p className="text-purple-600 text-2xl">Ping</p>
              <p className="text-3xl font-bold">{speed.ping
