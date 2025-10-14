import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [page, setPage] = useState("home");
  const [speed, setSpeed] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar page={page} setPage={setPage} />
      {page === "home" && <Home setSpeed={setSpeed} />}
      {page === "dashboard" && <Dashboard speed={speed} />}
      {page === "login" && <Login />}
      {page === "signup" && <Signup />}
    </div>
  );
}
