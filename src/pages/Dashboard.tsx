import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";

export default function Dashboard({ speed }: any) {
  if (!speed) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-gray-600">
        <h2 className="text-3xl font-semibold">No Data Yet</h2>
        <p className="text-lg mt-2">Run a speed test first from Home page</p>
      </div>
    );
  }

  const data = [
    { name: "Download", value: speed.download, color: "#3b82f6" },
    { name: "Upload", value: speed.upload, color: "#10b981" },
    { name: "Ping", value: speed.ping, color: "#8b5cf6" },
  ];

  return (
    <div className="mt-32 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Speed Dashboard</h1>
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-5xl mx-auto">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 30, right: 50, left: 20, bottom: 20 }} barSize={120}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 16, fontWeight: 600 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
