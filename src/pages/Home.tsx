import { useState } from "react";

export default function Home() {
  const [speed, setSpeed] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSpeed = async () => {
    setLoading(true);
    setSpeed(null);
    try {
      const response = await fetch("http://localhost:8000/speedtest");
      const data = await response.json();
      setSpeed(data);
    } catch (error) {
      console.error("Error fetching speed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSpeedFeedback = (download) => {
    if (download < 2)
      return {
        text: "❌ Very slow — only basic browsing possible.",
        color: "text-red-600",
        bg: "bg-red-100",
      };
    else if (download < 5)
      return {
        text: "⚠️ Slow — suitable for browsing and SD video streaming on one device.",
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      };
    else if (download < 15)
      return {
        text: "🙂 Moderate — supports HD streaming and video calls on 1–2 devices.",
        color: "text-green-600",
        bg: "bg-green-100",
      };
    else if (download < 50)
      return {
        text: "🚀 Fast — supports multiple HD streams and gaming.",
        color: "text-blue-600",
        bg: "bg-blue-100",
      };
    else if (download < 100)
      return {
        text: "💨 Very fast — handles 4K streaming and gaming on multiple devices.",
        color: "text-indigo-600",
        bg: "bg-indigo-100",
      };
    else
      return {
        text: "🌐 Ultra fast — perfect for heavy multitasking, gaming, and downloads.",
        color: "text-purple-600",
        bg: "bg-purple-100",
      };
  };

  const feedback = speed ? getSpeedFeedback(speed.download) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-800 drop-shadow-sm">
        Internet Speed Test
      </h1>

      <button
        onClick={checkSpeed}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-md hover:shadow-lg`}
      >
        {loading ? "Testing..." : "Run Speed Test"}
      </button>

      {speed && (
        <div
          className={`mt-10 w-full max-w-lg p-8 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-sm ${feedback.bg}`}
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Test Results
          </h2>

          <div className="flex flex-col space-y-4 text-lg font-medium">
            <p className="flex justify-between">
              <span className="text-gray-700">Download Speed:</span>
              <span className="font-semibold text-blue-700">
                {speed.download.toFixed(2)} Mbps
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-700">Upload Speed:</span>
              <span className="font-semibold text-green-700">
                {speed.upload.toFixed(2)} Mbps
              </span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-700">Ping:</span>
              <span className="font-semibold text-indigo-700">
                {speed.ping} ms
              </span>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p
              className={`text-md font-semibold ${feedback.color} leading-relaxed`}
            >
              {feedback.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
