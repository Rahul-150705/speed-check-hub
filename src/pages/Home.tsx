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
    <div className="mt-32 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">Internet Speed Test</h1>

      <button
        onClick={runTest}
        disabled={loading}
        className={`w-40 h-40 rounded-full text-2xl font-semibold flex items-center justify-center shadow-xl transition-transform duration-300 ${
          loading
            ? "bg-gray-400 text-white"
            : "bg-blue-600 text-white hover:scale-105 hover:bg-blue-700"
        }`}
      >
        {loading ? "Testing..." : "Run Test"}
      </button>

      {result && (
        <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-3xl">
          <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
            <p className="text-lg font-semibold text-blue-700">Download</p>
            <p className="text-3xl font-bold">{result.download} Mbps</p>
          </div>
          <div className="bg-green-100 p-6 rounded-2xl shadow-md">
            <p className="text-lg font-semibold text-green-700">Upload</p>
            <p className="text-3xl font-bold">{result.upload} Mbps</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-2xl shadow-md">
            <p className="text-lg font-semibold text-purple-700">Ping</p>
            <p className="text-3xl font-bold">{result.ping} ms</p>
          </div>
        </div>
      )}
    </div>
  );
}
