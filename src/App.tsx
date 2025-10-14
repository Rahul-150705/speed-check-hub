import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";

export default function App() {
  const [page, setPage] = useState<"home" | "about" | "login">("home");

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 relative">
      {/* Main Content */}
      <div className="p-10">
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "login" && <Login />}
      </div>

      {/* Sidebar */}
      <Sidebar page={page} setPage={setPage} />
    </div>
  );
}
