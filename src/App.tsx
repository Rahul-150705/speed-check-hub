import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SpeedFloat from "./components/SpeedFloat";

export default function App() {
  const [page, setPage] = useState<"home"|"about"|"login"|"float">("home");

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
      <div className="flex-1 p-10">
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "login" && <Login />}
        {page === "float" && <p className="text-2xl font-semibold text-gray-800">Use the floating widget to monitor speed</p>}
      </div>

      <Sidebar page={page} setPage={setPage} />

      {/* Floating real-time speed widget */}
      <SpeedFloat />
    </div>
  );
}
