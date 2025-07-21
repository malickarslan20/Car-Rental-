import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">Snapcar</h2>
          <p className="mt-3 text-gray-300">
            Rent cars effortlessly with Snapcar. Affordable, reliable, and available anytime you need.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/cars" className="hover:text-blue-400">Cars</a></li>
            <li><a href="/about" className="hover:text-blue-400">About</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info & Socials */}
        <div className='flex flex-col items-center'>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300">📍 Lahore, Pakistan</p>
          <p className="text-gray-300">📞 +92 300 1234567</p>
          <p className="text-gray-300 mb-4">✉️ support@snapcar.com</p>

          <div className="flex gap-4 text-blue-400 text-xl">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Snapcar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
