import Image from 'next/image';
import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import UsersSidebar from './UsersSidebar';

const Card = ({ name, email, password, role, phone, onClick }) => {
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
          <p className="font-normal text-sm mb-2">{password}</p>
          <p className="font-normal text-sm mb-2">{role}</p>
          <p className="font-normal text-sm mb-2">{phone}</p>
        </div>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleCardClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const resources = [
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'Admin',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'Admin',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    },
    {
      name: 'Sambit Mondal',
      email: 'sambitmondal2005@gmail.com',
      password: 'Sambit123',
      role: 'User',
      phone: '+917076466357'
    }
  ];

  return (
    <>
      <div className="w-full h-full overflow-x-auto py-5 pr-2 rounded-xl" style={{ scrollbarWidth: 'none' }}>
        <div className="flex space-x-6" style={{ minWidth: 'max-content' }}>
          {resources.map((resource, index) => (
            <Card
              key={index}
              name={resource.name}
              email={resource.email}
              password={resource.password}
              role={resource.role}
              phone={resource.phone}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <UsersSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
    </>
  );
}

export default AdminUsers