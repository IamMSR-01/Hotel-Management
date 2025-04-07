import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(registerUser(formData));
    if (response.type === "auth/registerUser/fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form 
      className="bg-white p-6 shadow-md rounded w-full max-w-md"
      onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input 
        className="w-full p-2 mb-3 border rounded"
        type="text"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
        onChange={handleChange}
        required 
        />
        <input 
        className="w-full p-2 mb-3 border rounded"
        type="text" 
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
        required
        />
        <input 
        className="w-full p-2 mb-3 border rounded"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required 
        />
        <input 
        className="w-full p-2 mb-3 border rounded"
        type="number" 
        name="phoneNumber"
        placeholder="Enter your phone number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        />
        <input 
        className="w-full p-2 mb-3 border rounded"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required 
        />
        {error && <p>{error}</p>}
        <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
