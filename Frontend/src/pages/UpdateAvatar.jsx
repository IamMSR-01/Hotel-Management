import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { toast } from "react-hot-toast";

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      toast.error("Please select an avatar image");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      await API.put("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Avatar updated successfully");
      navigate("/profile/:id"); // Redirect to profile page
    } catch (err) {
      console.error("Avatar update failed:", err);
      toast.error("Failed to update avatar");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Update Avatar</h2>

      {preview && (
        <img
          src={preview}
          alt="Avatar Preview"
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Avatar
        </button>
      </form>
    </div>
  );
};

export default UpdateAvatar;
