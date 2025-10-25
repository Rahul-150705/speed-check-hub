import { useEffect, useState } from "react";
import api from "../services/api";

interface Result {
  id: number;
  download: number;
  upload: number;
  ping: number;
  created_at: string;
}

interface HistoryProps {
  userId: string;
}

export default function History({ userId }: HistoryProps) {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/history", { params: { user_id: userId } });
        setResults(res.data.history);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Speed Test History</h2>
      {results.length === 0 ? (
        <p>No history found.</p>
      ) : (
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
      )}
    </div>
  );
}
