import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account created successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8 drop-shadow-md">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
