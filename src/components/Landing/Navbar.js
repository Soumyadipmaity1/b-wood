'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { auth, db } from '../../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const [navbarBg, setNavbarBg] = useState('bg-transparent');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg('backdrop-blur-xl bg-black bg-opacity-80');
      } else {
        setNavbarBg('bg-transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch the username from Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);        
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Redirect to the home page after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`fixed top-3 lg:top-4 left-0 right-0 w-full lg:w-[95%] mx-auto ${navbarBg} backdrop-blur-lg border-[1px] border-neon rounded-xl lg:border-[1.5px] lg:border-neon transition-all duration-300 z-50`}>
      <div className="flex justify-between items-center py-4 px-4 lg:p-4 lg:px-14 mx-auto">
        <div>
          <Link href="/" className="hidden lg:flex gap-4 items-center justify-center text-lime-500 font-bold text-2xl">
            <img src='/logo.png' alt="logo" className="size-14 rounded-full" />
            B-Wood
          </Link>
          <Link href="/" className="flex items-center justify-center gap-2 lg:hidden text-lime-500 font-bold text-[0.85rem]">
            <img src='/logo.png' alt="logo" className="size-10 rounded-full" />
          </Link>
        </div>
        <div className='flex lg:gap-8 items-center justify-center'>
          <div className="flex-grow mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="lg:w-96 w-36 px-2 pl-3 py-1 lg:px-4 lg:py-2 text-sm lg:text-lg rounded-full bg-gray-800 text-white placeholder-gray-400"
            />
          </div>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white size-7 lg:size-11 border-[1px] lg:border-2 rounded-full p-1 lg:p-2 transition duration-150 ease-in-out hover:scale-110"
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
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 p-2 w-36 bg-white rounded-lg shadow-lg">
                      <span className="text-black w-full flex items-center justify-center text-sm font-bold lg:text-lg">{username}</span>
                      <hr className="my-2 w-full bg-black border-0 h-[1px]" />
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <Link href='/login' className='flex items-center justify-center'>
              <button className='bg-gray-600 border-2 border-neon px-3 py-2 lg:px-5 lg:py-3 rounded-md text-white text-sm lg:text-[1rem] font-semibold transition duration-200 ease-in-out hover:scale-110 hover:bg-gray-800'>
                Login/Signup
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;