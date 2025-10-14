import { useState } from "react";
import SpeedTestFloat from "./components/SpeedTestFloat";
import SpeedTestCard from "./components/SpeedTestCard"; // Optional: normal full-page test

export default function App() {
  const [page, setPage] = useState<"home" | "about" | "float">("home");

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 relative">
      {/* Navbar */}
      <nav className="flex justify-center space-x-8 py-6 bg-white shadow-md">
        <button
          className={`font-semibold ${page === "home" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setPage("home")}
        >
          Home
        </button>
        <button
          className={`font-semibold ${page === "about" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setPage("about")}
        >
          About
        </button>
        <button
          className={`font-semibold ${page === "float" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setPage("float")}
        >
          Float
        </button>
      </nav>

      {/* Page Content */}
      {page === "home" && (
        <div className="p-10 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to SpeedCheck Hub</h1>
          <p className="text-lg text-gray-700 mb-6">Click the floating icon to check your internet speed in real-time!</p>
          <SpeedTestCard /> {/* Full-page speed test */}
        </div>
      )}

      {page === "about" && (
        <div className="p-10 max-w-2xl mx-auto text-gray-700 text-lg">
          <h1 className="text-4xl font-bold mb-4">About</h1>
          <p>
            This app measures your internet speed in real-time using a FastAPI backend and displays the results with a beautiful React + Tailwind frontend.
            The floating speed icon updates every 2-3 seconds for continuous monitoring.
          </p>
        </div>
      )}

      {/* Float mode */}
      {page === "float" && <SpeedTestFloat />}
    </div>
  );
}
