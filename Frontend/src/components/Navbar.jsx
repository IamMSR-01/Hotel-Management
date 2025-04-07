import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-blue-600">StayEase</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>
        {!user ? (
          <>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-600 hover:text-blue-600">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to={`/profile/${user._id}`}
              className="text-gray-600 hover:text-blue-600"
            >
              Profile
            </Link>
            <button
              className="text-gray-600 hover:text-blue-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
