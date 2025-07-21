import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Testimonials from "../Pages/Testimonials";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ Correct source


function Home() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate('/browse');
    } else {
      navigate('/login');
    }
      };

  return (
    <div className="w-full min-h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-md p-8 animate-fade-in-up text-center">
          <h1 className="text-6xl font-bold text-blue-600">Snapcar</h1>
          <p className="text-gray-700 text-3xl mt-4">
            Rent premium cars anytime, anywhere. Affordable. Reliable. Fast.
          </p>
          <button
      onClick={handleClick}
      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
    >
      Get Now
    </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img
          src="/Home.png"
          alt="Car"
          className="w-full max-w-md object-contain drop-shadow-2xl animate-slide-in-right"
        />
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Home;
