import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../redux/slices/authSlice";
import { UserCircle2, LogIn } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-tr from-black via-gray-900 to-black text-white shadow-md py-4 px-6 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-300 tracking-wide hover:scale-105 transition duration-300"
        >
          StayEase
        </Link>

        {/* Links */}
        <div className="space-x-6 flex items-center text-sm font-medium">
          <Link to="/" className="hover:text-yellow-400 transition duration-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-400 transition duration-200">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-400 transition duration-200">
            Contact
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 bg-yellow-400 text-black px-4 py-1.5 rounded-full hover:bg-yellow-300 transition-transform duration-300 hover:scale-105"
              >
                <LogIn size={18} />
                <span className="font-semibold">Login</span>
              </Link>

              <Link
                to="/register"
                className="text-white border border-yellow-300 rounded-full px-4 py-1.5 hover:bg-yellow-300 hover:text-black transition duration-300"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/profile/${user._id}`}
                className="flex items-center gap-1 hover:text-yellow-300 transition duration-300"
              >
                <UserCircle2 size={22} />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
