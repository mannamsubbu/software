import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);
    // TODO: connect to User.login()
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="Back2You Logo" className="h-12 mx-auto" />
          <h1 className="text-2xl font-bold text-amrita-blue">Back2You</h1>
          <p className="text-gray-500 text-sm">Amrita Lost & Found</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amrita-blue"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amrita-blue"
            required
          />
          <button
  type="submit"
  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
>
  Login
</button>

        </form>

        {/* Register link */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-amrita-blue font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
