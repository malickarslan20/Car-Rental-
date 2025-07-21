import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Navbar() {
 
  const user = useSelector((state) => state.user.user);
 

  return (
    <div className="bg-gray-200 px-6 py-3 shadow flex items-center justify-between">
      
      {/* Left Section: Logo + Brand */}
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" className="h-16 w-20" />
        {/* <h1 className="text-2xl font-bold text-blue-700">SnapCar</h1> */}
      </div>

      {/* Center Section: NavLinks */}
      <nav>
        <ul className="flex gap-6 text-lg font-medium text-blue-700">
          {["Home", "Cars", "Browse", "About", "Contact","Admin"].map((page) => (
            <li key={page}>
              <NavLink
                to={`/${page.toLowerCase() === "home" ? "" : page.toLowerCase()}`}
                className={({ isActive }) =>
                  isActive ? 'text-black font-semibold' : 'hover:text-black'
                }
              >
                {page}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Section: Login/Logout Button */}
      <div className="flex justify-end p-4">
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
  );
}

export default Navbar;
