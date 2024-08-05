'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [navbarBg, setNavbarBg] = useState('bg-transparent');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg('backdrop-blur-sm bg-black/50 bg-opacity-50');
      } else {
        setNavbarBg('bg-transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <nav className={`fixed top-0 left-0 right-0 ${navbarBg} backdrop-blur-none transition-all duration-300 z-50`}>
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
<div>        <Link href="/" className="flex items-center text-lime-500 font-bold text-2xl">
    
          B-Wood
        </Link></div>
       <div className='flex gap-4'> 
       <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="sm:w-96 w-48 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
          />
        </div>
        <Link href="/account" className="flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 21C19 17.6863 16.3137 15 13 15H11C7.68629 15 5 17.6863 5 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          
        </Link>
       </div>
      </div>
    </nav>
  );
};

export default Navbar;
