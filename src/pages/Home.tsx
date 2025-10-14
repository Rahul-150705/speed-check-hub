export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">Welcome to SpeedCheck Hub</h1>
      <p className="text-lg text-gray-600">
        Monitor your internet speed in real-time and see live updates with our floating speed widget.
      </p>
      <div className="mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Start Speed Test
        </button>
      </div>
    </div>
  );
}
