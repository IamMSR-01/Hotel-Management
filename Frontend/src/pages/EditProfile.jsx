import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { toast } from "react-hot-toast";

function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile/me");
        console.log("Fetched data:", res.data);

        const user = res.data?.data;

        if (!user) {
          toast.error("Invalid response from server");
          return;
        }

        setForm({
          fullName: user.fullName || "",
          username: user.username || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          password: "", 
        });

        setPreview(user.avatar?.url || "");
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !form.fullName ||
      !form.username ||
      !form.email ||
      !form.password ||
      !form.phoneNumber
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
  
    try {
      
      await API.put(
        "/users/profile",
        {
          fullName: form.fullName,
          username: form.username,
          email: form.email,
          phoneNumber: form.phoneNumber,
          password: form.password,
        },
        {
          withCredentials: true,
        }
      );
  
      if (avatar) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatar);
  
        await API.put("/users/profile/avatar", avatarFormData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      }
  
      toast.success("Profile updated successfully");
  
      // Redirect after short delay
      setTimeout(() => {
        navigate("/profile/:id");
      }, 500);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong during update"
      );
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <img
          src={
            preview ||
            "https://images.pexels.com/photos/93827/pexels-photo-93827.jpeg"
          }
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="w-full"
        />

        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
