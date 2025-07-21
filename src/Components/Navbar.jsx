import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Install lucide-react or replace with SVGs

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-200 shadow px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-14 w-16 object-contain" />
        </div>

        {/* Hamburger (visible on small screens) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Nav Links (hidden on small screens) */}
        <nav className="hidden md:flex gap-6 text-lg font-medium text-blue-700">
          {["Home", "Cars", "Browse", "About", "Contact", "Admin"].map((page) => (
            <NavLink
              key={page}
              to={`/${page.toLowerCase() === "home" ? "" : page.toLowerCase()}`}
              className={({ isActive }) =>
                isActive ? 'text-black font-semibold' : 'hover:text-black'
              }
            >
              {page}
            </NavLink>
          ))}
        </nav>

        {/* Login / Logout (desktop) */}
        <div className="hidden md:flex">
          {user ? (
            <NavLink to="/logout">
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                Logout
              </button>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden text-blue-700 text-base font-medium">
          {["Home", "Cars", "Browse", "About", "Contact", "Admin"].map((page) => (
            <NavLink
              key={page}
              to={`/${page.toLowerCase() === "home" ? "" : page.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? 'text-black font-semibold' : 'hover:text-black'
              }
            >
              {page}
            </NavLink>
          ))}

          {/* Mobile Login/Logout */}
          {user ? (
            <NavLink to="/logout">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Logout
              </button>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Login
              </button>
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
