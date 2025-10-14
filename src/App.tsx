import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SpeedTestCard from "./components/SpeedTestCard";
import SpeedFloat from "./components/SpeedFloat";

export default function App() {
  const [page, setPage] = useState<"home" | "about" | "login" | "float">("home");

  return (
    <div className="flex min-h-screen">
      <Sidebar page={page} setPage={setPage} />

      <div className="flex-1 ml-20 p-10">
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "login" && <Login />}
        {page === "float" && <SpeedTestCard />}
      </div>

      {/* Floating Widget always active */}
      <SpeedFloat />
    </div>
  );
}
