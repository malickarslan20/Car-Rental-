import React, { useState } from 'react';
import { databases, databaseId, bookingCollectionId } from '../Appwrite/Database';
import { v4 as uuidv4 } from 'uuid'; // for unique ID

const carCategories = [
  {
    title: 'SUVs',
    description: 'Spacious and powerful, perfect for family trips and off-road adventures.',
    image: '/SUV.jpeg',
  },
  {
    title: 'Sedans',
    description: 'Comfortable and fuel-efficient, ideal for daily commuting and long drives.',
    image: '/Cedan.jpeg',
  },
  {
    title: 'Luxury Cars',
    description: 'Drive in style with our range of premium, high-end vehicles.',
    image: '/Luxury.jpeg',
  },
  {
    title: 'Hatchbacks',
    description: 'Compact and convenient, perfect for city driving.',
    image: '/Hatchbacks.jpeg',
  },
];

const carList = [
  { name: 'Toyota Fortuner', category: 'SUVs', price: 8000 },
  { name: 'Kia Sportage', category: 'SUVs', price: 7500 },
  { name: 'Honda Civic', category: 'Sedans', price: 6000 },
  { name: 'Toyota Corolla', category: 'Sedans', price: 5500 },
  { name: 'Mercedes S-Class', category: 'Luxury Cars', price: 15000 },
  { name: 'BMW 7 Series', category: 'Luxury Cars', price: 16000 },
  { name: 'Suzuki Swift', category: 'Hatchbacks', price: 4000 },
  { name: 'Toyota Vitz', category: 'Hatchbacks', price: 4200 },
];

function Cars() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setMessage('');
  };

 const handleBookNow = async (car) => {
  try {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return alert('Please log in to book.');

    const user = JSON.parse(storedUser);

    const response = await databases.createDocument(
      databaseId,
      bookingCollectionId,
      uuidv4(), // unique document ID
      {
        userEmail: user.email,
        userId: user.$id, // assuming Appwrite session stores this in localStorage
        carName: car.name,
        category: car.category,
        price: car.price,
        createdAt: new Date().toISOString(), // for datetime field
      }
    );

    setMessage(`✅ Booked "${car.name}" successfully!`);
  } catch (error) {
    console.error('Booking failed:', error);
    alert('Booking failed. Please try again.');
  }
};


  const filteredCars = selectedCategory
    ? carList.filter((car) => car.category === selectedCategory)
    : [];

  return (
    <div className="bg-gray-100 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Explore Our Car Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {carCategories.map((car, index) => (
          <div
            key={index}
            className={`cursor-pointer bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:shadow-2xl hover:scale-105 group ${
              selectedCategory === car.title ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handleCategoryClick(car.title)}
          >
            <img
              src={car.image}
              alt={car.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-600 group-hover:text-blue-800 transition duration-300">
                {car.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{car.description}</p>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-center font-medium">
          {message}
        </div>
      )}

      {selectedCategory && (
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Cars in "{selectedCategory}"
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <div
                key={index}
                className="bg-white shadow p-4 rounded-lg border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-semibold text-blue-700">{car.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{car.category}</p>
                  <p className="text-gray-600 font-medium mb-4">Price: Rs {car.price}</p>
                </div>
                <button
                  className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => handleBookNow(car)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cars;
