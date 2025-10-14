export default function Login() {
  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <div className="bg-white p-8 shadow-lg rounded-2xl w-96">
        <input type="email" placeholder="Email" className="w-full mb-4 p-3 border rounded-lg" />
        <input type="password" placeholder="Password" className="w-full mb-4 p-3 border rounded-lg" />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
          Login
        </button>
      </div>
    </div>
  );
}
