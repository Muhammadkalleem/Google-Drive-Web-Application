import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-gray-200 transition">UploadCare</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg font-medium hidden sm:flex">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/about" className="hover:text-gray-200 transition">About</Link>
          <Link to="/login" className="hover:text-gray-200 transition">Login</Link>
        
          <Link to="/dashboard" className="hover:text-gray-200 transition">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
