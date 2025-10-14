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

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-10 mt-6 drop-shadow-md">
        Internet Speed Test
      </h1>

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

      {result && (
        <div className="mt-14 flex flex-wrap justify-center gap-8 w-full max-w-5xl">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-64 transform hover:scale-105 transition-all">
            <p className="text-lg font-semibold text-blue-700 mb-2">Download Speed</p>
            <p className="text-4xl font-bold text-blue-600">{result.download} Mbps</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-64 transform hover:scale-105 transition-all">
            <p className="text-lg font-semibold text-green-700 mb-2">Upload Speed</p>
            <p className="text-4xl font-bold text-green-600">{result.upload} Mbps</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-64 transform hover:scale-105 transition-all">
            <p className="text-lg font-semibold text-purple-700 mb-2">Ping</p>
            <p className="text-4xl font-bold text-purple-600">{result.ping} ms</p>
          </div>
        </div>
      )}
    </div>
  );
}
