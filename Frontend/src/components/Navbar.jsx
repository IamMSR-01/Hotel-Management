import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-blue-600">StayEase</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
        <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
