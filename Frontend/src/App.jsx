import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import UpdateAvatar from "./pages/UpdateAvatar";
import AddRoom from "./pages/AddRoom";
import Rooms from "./pages/Rooms";

const App = () => {
  
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/update-avatar" element={<UpdateAvatar />} />
        <Route path="/add-room" element={ <AddRoom /> }/>
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </>
  );
};

export default App;
