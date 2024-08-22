import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import UsersSidebar from './UsersSidebar';
import { getUser } from '../../../actions/user';

const Card = ({ name, email, role, phone, onClick }) => {
  return (
    <div
      className="relative border-2 ml-4 w-60 cursor-pointer text-center border-neon rounded-xl shadow-lg flex flex-col justify-center p-2 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-80"
      onClick={onClick}
    >
      <div className="relative h-80 w-full pt-6 flex flex-col items-center justify-between rounded-md mb-4 overflow-hidden">
        <FaUserCircle className='size-28' />
        <div className='flex flex-col items-center justify-start'>
          <p className="font-extrabold tracking-wider text-lg mb-2">{name}</p>
          <p className="font-normal text-sm mb-2">{email}</p>
          <p className="font-normal text-sm mb-2">{role}</p>
          <p className="font-normal text-sm mb-2">{phone}</p>
        </div>
      </div>
    </div>
  );
};

const AdminUsers = ({onOpenSidebar}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from the database when the component mounts
    const fetchUsers = async () => {
      try {
        const allUsers = await getUser(); // Assuming getUser fetches all users if no email is passed
        setUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCardClick = async (id) => {
    onOpenSidebar(id)
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setSelectedUser(null); // Clear the selected user when the sidebar is closed
  };

  return (
    <>
      <div className="w-full h-full overflow-x-auto py-5 pr-2 rounded-xl" style={{ scrollbarWidth: 'none' }}>
        <div className="flex space-x-6" style={{ minWidth: 'max-content' }}>
          {users.map((user, index) => (
            <Card
              key={index}
              name={user.name}
              email={user.email}
              role={user.role}
              phone={user.phone}
              onClick={() => handleCardClick(user._id)} // Pass email to fetch user
            />
          ))}
        </div>
      </div>
      <UsersSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
    </>
  );
}

export default AdminUsers;
