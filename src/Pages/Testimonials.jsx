import React from 'react';

const testimonials = [
  {
    name: "Ali Khan",
    role: "Frequent Traveler",
    message: "Snapcar is the best car rental service I've used in Pakistan. Clean cars, great support, and easy booking!",
    avatar: "https://i.pravatar.cc/100?img=1"
  },
  {
    name: "Sara Ahmed",
    role: "Business Professional",
    message: "I always rely on Snapcar for my business trips. Their service is fast and reliable.",
    avatar: "https://i.pravatar.cc/100?img=2"
  },
  {
    name: "Zain Raza",
    role: "Tourist",
    message: "Affordable and hassle-free! Booking a car through Snapcar made my vacation smooth and stress-free.",
    avatar: "https://i.pravatar.cc/100?img=3"
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">What Our Customers Say</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all">
            <div className="flex items-center space-x-4 mb-4">
              <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full" />
              <div>
                <h3 className="font-semibold text-lg">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              "{t.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
