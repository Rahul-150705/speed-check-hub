import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function History({ user }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Fetch user-specific history
        const res = await api.get("/history", { params: { user_id: user.id } });
        setResults(res.data.history);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, [user.id]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Speed Test History</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Download (Mbps)</th>
            <th className="p-2 border">Upload (Mbps)</th>
            <th className="p-2 border">Ping (ms)</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={r.id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{r.download}</td>
              <td className="border p-2">{r.upload}</td>
              <td className="border p-2">{r.ping}</td>
              <td className="border p-2">{new Date(r.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
