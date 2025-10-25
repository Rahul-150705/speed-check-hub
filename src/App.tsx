import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import History from "./pages/History"; // new import

export default function App() {
  const [page, setPage] = useState("home");
  const [speed, setSpeed] = useState<any>(null);

  // Get logged-in user from localStorage
  const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = savedUser?.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Navbar page={page} setPage={setPage} />
      <div className="pt-28">
        {page === "home" && <Home setSpeed={setSpeed} />}
        {page === "dashboard" && <Dashboard speed={speed} />}
        {page === "login" && <Login />}
        {page === "signup" && <Signup />}
        {page === "history" && userId && <History userId={userId} />} {/* new line */}
      </div>
    </div>
  );
}
