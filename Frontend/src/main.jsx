import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import UpdateAvatar from "./pages/UpdateAvatar";
import AddRoom from "./pages/AddRoom";
import Rooms from "./pages/Rooms";
import AdminRooms from "./pages/AdminRooms";
import UpdateRoom from "./pages/UpdateRoom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import UpdateBooking from "./pages/UpdateBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/update-avatar",
        element: <UpdateAvatar />,
      },
      {
        path: "/add-room",
        element: <AddRoom />,
      },
      {
        path: "/rooms",
        element: <Rooms />,
      },
      {
        path: "/admin/rooms",
        element: <AdminRooms />,
      },
      {
        path: "/update-room/:slug",
        element: <UpdateRoom />,
      },
      {
        path: "/rooms/:slug",
        element: <RoomDetails />,
      },
      {
        path: "/book-room",
        element: <Booking />,
      },
      {
        path: "/update-booking/:bookingId",
        element: <UpdateBooking />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
