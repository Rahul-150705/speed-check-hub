import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SpeedFloat from "./components/SpeedFloat";

export default function App() {
  const [page, setPage] = useState<"home" | "about" | "login" | "float">("home");

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 relative">
      {/* Main Content */}
      <div className="p-10">
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "login" && <Login />}
        {page === "float" && (
          <p className="text-center text-2xl font-semibold text-gray-800 mt-20">
            Use the floating speed widget to monitor your internet speed continuously.
          </p>
        )}
      </div>

      {/* Sidebar */}
      <Sidebar page={page} setPage={setPage} />

      {/* Floating Widget (always present) */}
      <SpeedFloat />
    </div>
  );
}
