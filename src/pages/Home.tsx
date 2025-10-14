import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function Home() {
  const [speed, setSpeed] = useState<{ download: number; upload: number; ping: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // for click highlight

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

  const graphData = speed
    ? [
        { name: "Download", value: speed.download, color: "#3b82f6" },
        { name: "Upload", value: speed.upload, color: "#10b981" },
        { name: "Ping", value: speed.ping, color: "#8b5cf6" },
      ]
    : [];

  const handleBarClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Internet Speed Test</h1>

      {!speed && (
        <button
          onClick={checkSpeed}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Running Test..." : "Run Test"}
        </button>
      )}

      {speed && (
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 w-full max-w-4xl mx-auto border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Internet Speed</h2>
          <p className="text-blue-600 text-xl font-semibold mb-2">Download: {speed.download.toFixed(2)} Mbps</p>
          <p className="text-green-600 text-xl font-semibold mb-2">Upload: {speed.upload.toFixed(2)} Mbps</p>
          <p className="text-purple-600 text-xl font-semibold mb-4">Ping: {speed.ping} ms</p>

          <h3 className="text-lg font-semibold mb-2">Speed Graph</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={graphData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              barCategoryGap="50%"
            >
              <XAxis dataKey="name" tick={{ fontSize: 16, fontWeight: "bold" }} />
              <YAxis />
              <Tooltip />

              <Bar dataKey="value" onClick={(_, index) => handleBarClick(index)}>
                {graphData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    cursor="pointer"
                    fill={activeIndex === index ? "#f97316" : entry.color} // orange when clicked
                    style={{
                      transition: "all 0.3s ease",
                      transform: "scaleY(1)",
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setSpeed(null)}
          >
            Retest
          </button>
        </div>
      )}
    </div>
  );
}
