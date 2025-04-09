import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(loginUser(formData));
    if (response.type === "auth/loginUser/fulfilled") {
      navigate("/");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="w-full max-w-sm p-8 pt-16 pb-10 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
        <h2 className="text-3xl font-bold mb-10 text-center text-white">
          Login to StayEase
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
            placeholder="Email or Username"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />

          {error && <p className="text-red-300 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 mt-8 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-transform duration-300 hover:scale-105"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 👇 CTA for Sign Up */}
        <p className="text-sm text-white mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-300 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
