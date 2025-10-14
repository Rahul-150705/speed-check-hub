export default function App() {
  const [page, setPage] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="flex space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded font-semibold ${
            page === "login" ? "bg-blue-600 text-white" : "bg-white text-black"
          }`}
          onClick={() => setPage("login")}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            page === "signup" ? "bg-blue-600 text-white" : "bg-white text-black"
          }`}
          onClick={() => setPage("signup")}
        >
          Signup
        </button>
      </div>

      {page === "login" ? <Login /> : <Signup />}
    </div>
  );
}
