import { useState } from "react";

export default function Home({ setSpeed }: any) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runTest = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/speed");
      const data = await res.json();
      setResult(data);
      setSpeed(data);
    } catch (e) {
      alert("Backend not running");
    }
    setLoading(false);
  };

  // 🔹 Function to decide feedback and colors
  const getSpeedFeedback = (download: number) => {
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

  const feedback = result ? getSpeedFeedback(result.download) : null;

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-10 mt-6 drop-shadow-md">
        Internet Speed Test
      </h1>

      {/* Run Button */}
      <button
        onClick={runTest}
        disabled={loading}
        className={`w-48 h-48 rounded-full text-2xl font-bold flex items-center justify-center shadow-2xl transition-all duration-500 ${
          loading
            ? "bg-gray-400 text-white"
            : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-110 hover:shadow-indigo-300/50"
        }`}
      >
        {loading ? (
          <span className="animate-pulse">Testing...</span>
        ) : (
          "Run Test"
        )}
      </button>

      {/* Result Display */}
      {result && (
        <div
          className={`mt-14 flex flex-col items-center w-full max-w-4xl rounded-2xl shadow-lg border border-gray-200 p-10 ${feedback?.bg}`}
        >
          <div className="flex flex-wrap justify-center gap-8 w-full">
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-64 transform hover:scale-105 transition-all">
              <p className="text-lg font-semibold text-blue-700 mb-2">
                Download Speed
              </p>
              <p className="text-4xl font-bold text-blue-600">
                {result.download.toFixed(2)} Mbps
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-64 transform hover:scale-105 transition-all">
              <p className="text-lg font-semibold text-green-700 mb-2">
                Upload Speed
              </p>
              <p className="text-4xl font-bold text-green-600">
                {result.upload.toFixed(2)} Mbps
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-64 transform hover:scale-105 transition-all">
              <p className="text-lg font-semibold text-purple-700 mb-2">
                Ping
              </p>
              <p className="text-4xl font-bold text-purple-600">
                {result.ping} ms
              </p>
            </div>
          </div>

          {/* Speed Feedback Message */}
          <div className="mt-8 text-center">
            <p
              className={`text-lg font-semibold ${feedback?.color} leading-relaxed`}
            >
              {feedback?.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
