import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { databases, databaseId, contactCollectionId } from '../Appwrite/Database';
import { ID } from 'appwrite'; // Needed to create unique document ID

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await databases.createDocument(
        databaseId,
        contactCollectionId,
        ID.unique(),
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      );

       alert("Thank you for contacting us!");
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Appwrite Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Social Icons */}
        <div className="mt-10 text-center">
          <h4 className="text-gray-700 font-medium mb-4">Follow Us</h4>
          <div className="flex justify-center gap-6 text-blue-600 text-xl ">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
