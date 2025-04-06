import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <form>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 p-3 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
