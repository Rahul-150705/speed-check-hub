import { useState } from "react";
import SpeedFloat from "./components/SpeedFloat";

export default function App() {
  const [page, setPage] = useState<"home" | "about">("home");

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
      </nav>

      {/* Page Content */}
      <div className="p-10">
        {page === "home" && (
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to SpeedCheck Hub</h1>
            <p className="text-lg text-gray-700">
              Keep an eye on your real-time internet speed with the floating widget!
            </p>
          </div>
        )}

        {page === "about" && (
          <div className="max-w-2xl mx-auto text-gray-700 text-lg">
            <h1 className="text-4xl font-bold mb-4">About</h1>
            <p>
              This app continuously monitors your internet speed in real-time using a FastAPI backend and displays it using a floating speed indicator built with React and Tailwind CSS.
            </p>
          </div>
        )}
      </div>

      {/* Floating Speed Widget */}
      <SpeedFloat />
    </div>
  );
}
