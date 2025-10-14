export default function About() {
  return (
    <div className="max-w-2xl mx-auto text-gray-700 text-lg">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">About SpeedCheck Hub</h1>
      <p className="mb-4">
        SpeedCheck Hub is designed to give you real-time internet speed measurements. Our React + Tailwind frontend communicates with a FastAPI backend to fetch download, upload, and ping values from your network.
      </p>
      <p>
        The floating speed widget allows you to monitor your speed continuously as you navigate through pages. You can also run manual speed tests with detailed results.
      </p>
    </div>
  );
}
