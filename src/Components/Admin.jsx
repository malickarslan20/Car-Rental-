import React, { useEffect, useState } from 'react';
import authService from '../Appwrite/Auth';
import { databases, databaseId, bookingCollectionId,contactCollectionId } from '../Appwrite/Database';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      try {
        let user = null;
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          user = JSON.parse(storedUser);
        } else {
          user = await authService.getcurrentuser();
        }

        if (user && user.email === "malickarslan1122@gmail.com") {
          setIsAdmin(true);

          // Fetch bookings
          const bookingRes = await databases.listDocuments(databaseId, bookingCollectionId);
          setBookings(bookingRes.documents);

          // Fetch messages
          // const messageRes = await databases.listDocuments(databaseId, messageCollectionId);
          // setMessages(messageRes.documents);
           const res = await databases.listDocuments(databaseId, contactCollectionId, []);
          setMessages(res.documents);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error fetching admin/user session:", err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAndFetch();
  }, [navigate]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!isAdmin) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center bg-red-50 border border-red-200 rounded-xl shadow-md mt-8 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-red-500 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-red-600 mb-1">Access Denied</h2>
        <p className="text-sm text-red-500">You do not have permission to view this page. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      {/* Bookings Section */}
      <div>
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.$id} className="bg-white p-4 shadow rounded-md border border-gray-200">
                <p className="font-semibold text-gray-800">
                  <span className="text-blue-600">User:</span> {booking.userName || booking.userEmail}
                </p>
                <p className="mt-1">
                  <span className="text-blue-600">Car:</span> {booking.carName} | Category: {booking.category}
                </p>
                <p>
                  <span className="text-blue-600">Price:</span> Rs {Number(booking.price).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">Booking ID: {booking.$id}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Messages Section */}
      <div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">Messages</h2>
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages found.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.$id} className="bg-white p-4 shadow rounded-md border border-gray-200">
                <p className="font-semibold text-gray-800">
                  <span className="text-green-600">User:</span> {msg.name} ({msg.email})
                </p>
                <p className="mt-1">
                  <span className="text-green-600">Message:</span> {msg.message}
                </p>
                <p className="text-sm text-gray-500 mt-1">Message ID: {msg.$id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
