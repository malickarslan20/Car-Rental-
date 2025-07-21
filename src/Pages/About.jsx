import React from 'react';

function About() {
  return (
    <div className="bg-white py-16 px-6 md:px-20">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">About Us</h2>

      {/* Mission Section */}
      <section className="mb-16">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          At <span className="font-semibold">Snapcar</span>, our mission is to revolutionize the way people rent cars by making it easier, faster, and more affordable. 
          We aim to provide a seamless experience through technology, offering premium cars to customers anytime, anywhere — with complete peace of mind.
        </p>
      </section>

      {/* Services Section */}
      <section>
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Services</h3>
        <ul className=" list-inside text-gray-700 text-lg space-y-2 list-none">
          <li>🚗 Premium car rentals for short and long trips</li>
          <li>📱 Easy booking through our website (mobile responsive)</li>
          <li>🕐 24/7 customer support and emergency assistance</li>
          <li>🏷️ Affordable pricing with no hidden charges</li>
          <li>📍 Pickup & drop-off services across multiple cities</li>
          <li>🛡️ Fully insured vehicles and verified drivers</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
