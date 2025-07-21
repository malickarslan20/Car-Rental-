// src/Components/ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] animate-fade-in">
        <div className="bg-white border-2 border-blue-600 rounded-2xl shadow-xl p-8 max-w-md text-center">
          <h2 className="text-blue-600 text-2xl font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-700 text-lg">Please login to explore this page.</p>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
