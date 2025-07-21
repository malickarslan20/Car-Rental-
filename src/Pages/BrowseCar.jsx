import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { databases } from '../Appwrite/Database'; // your Appwrite database setup
import { ID } from 'appwrite';
import { bookingCollectionId, databaseId } from '../Appwrite/Database'; // your constants

const cars = [
  { name: 'Toyota Fortuner', category: 'SUV', price: 70000 },
  { name: 'MG', category: 'SUV', price: 80000 },
  { name: 'Honda Civic', category: 'Sedan', price: 40000 },
  { name: 'Toyata GLI', category: 'Sedan', price: 30000 },
  { name: 'BMW X5', category: 'Luxury', price: 120000 },
  { name: 'Suzuki Alto', category: 'Hatchback', price: 25000 },
  { name: 'Suzuki Cultus', category: 'Hatchback', price: 20000 },
  { name: 'Wagnor', category: 'Hatchback', price: 25000 },
  { name: 'Audi A6', category: 'Luxury', price: 130000 },
  { name: 'Sonata', category: 'Luxury', price: 100000 },
  { name: 'Kia Sportage', category: 'SUV', price: 65000 },
  { name: 'Honda City', category: 'Sedan', price: 50000 }
];

const categories = ['All', 'SUV', 'Sedan', 'Luxury', 'Hatchback'];

function CarSearch() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');

  const filteredCars = cars.filter((car) => {
    const matchesName = car.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    const matchesPrice = maxPrice === '' || car.price <= parseInt(maxPrice);
    return matchesName && matchesCategory && matchesPrice;
  });

  const handleBooking = async (car) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.email) {
        alert('Please log in to book a car.');
        return;
      }

      await databases.createDocument(databaseId, bookingCollectionId, ID.unique(), {
        carName: car.name,
        category: car.category,
        price: car.price,
        userEmail: storedUser.email,
        userId: storedUser.$id,
        createdAt: new Date().toISOString(),
      });

      alert(`Successfully booked ${car.name} for Rs ${car.price.toLocaleString()}`);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book the car. Try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Search Cars</h2>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow space-y-6">
        {/* Search Input */}
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <span className="px-3 text-gray-500"><FaSearch /></span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search car name..."
            className="w-full px-4 py-2 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Max Price</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
              placeholder="Enter max price"
            />
          </div>
        </div>

        {/* Results */}
        <div>
          {filteredCars.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredCars.map((car, index) => (
                <li
                  key={index}
                  className="py-4 flex flex-wrap justify-between items-center gap-4"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{car.name}</p>
                    <p className="text-sm text-gray-500">{car.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-blue-600 font-bold">Rs {car.price.toLocaleString()}</p>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => handleBooking(car)}
                    >
                      Book Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 mt-4">No cars found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarSearch;
