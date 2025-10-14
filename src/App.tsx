import { useState } from "react";
import Sidebar from "./components/Sidebar";
import SpeedTestCard from "./components/SpeedTestCard";
import SpeedFloat from "./components/SpeedFloat";

export default function App() {
  const [page, setPage] = useState<"home"|"about"|"login"|"float">("home");

  return (
    <div className="flex min-h-screen">
      <Sidebar page={page} setPage={setPage} />

      <div className="flex-1 ml-20 p-10">
        {page === "home" && <h1 className="text-5xl font-bold">Home Page</h1>}
        {page === "about" && <h1 className="text-5xl font-bold">About Page</h1>}
        {page === "login" && <h1 className="text-5xl font-bold">Login Page</h1>}
        {page === "float" && <SpeedTestCard />}
      </div>

      {/* Floating Widget always active */}
      <SpeedFloat />
    </div>
  );
}
