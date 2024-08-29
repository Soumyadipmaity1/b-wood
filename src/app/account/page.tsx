import { useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState({
    image: '/path-to-user-image.jpg', 
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    tickets: [
      { id: 1, movie: 'Inception', date: '2024-09-01', seat: 'A1' },
      { id: 2, movie: 'Interstellar', date: '2024-09-15', seat: 'B4' },
    ],
  });

  const handleUpdateProfile = () => {
    alert('Profile updated successfully!');
  };

  const handleDeleteProfile = () => {
    alert('Profile deleted successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
        <div className="flex flex-col items-center">
          <img
            src={user.image}
            alt="User Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={user.name}
              className="w-full p-2 border border-gray-300 rounded-lg"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={user.username}
              className="w-full p-2 border border-gray-300 rounded-lg"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              className="w-full p-2 border border-gray-300 rounded-lg"
              readOnly
            />
          </div>
          <div className="flex justify-between w-full">
            <button
              onClick={handleUpdateProfile}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              Update Profile
            </button>
            <button
              onClick={handleDeleteProfile}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete Profile
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Tickets Booked</h3>
          {user.tickets.length > 0 ? (
            user.tickets.map(ticket => (
              <div key={ticket.id} className="border p-4 mb-4 rounded-lg">
                <p><strong>Movie:</strong> {ticket.movie}</p>
                <p><strong>Date:</strong> {ticket.date}</p>
                <p><strong>Seat:</strong> {ticket.seat}</p>
              </div>
            ))
          ) : (
            <p>No tickets booked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
