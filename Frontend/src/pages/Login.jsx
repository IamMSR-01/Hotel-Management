import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, user } = useSelector((state) => state.auth);

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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
        <input
          className="w-full p-2 mb-3 border rounded"
          type="text"
          name="identifier"
          placeholder="Enter email or username"
          onChange={handleChange}
          required
          value={formData.identifier}
        />
        <input
          className="w-full p-2 mb-3 border rounded"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
          value={formData.password}
        />
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
