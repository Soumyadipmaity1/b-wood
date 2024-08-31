'use client';
import { useState } from 'react';
import { auth, db } from '../../firebase/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';
import {createUser} from '../../actions/user.js'

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Store user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username: username,
        email: user.email,
        password: hashedPassword, // Store hashed password
        createdAt: new Date(),
      });      
      const data={
        username: username,
        email: email,
        password: hashedPassword,
      }
      const res=await createUser(data)
      console.log(res)
      // Redirect or notify user on successful signup
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:mt-12">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-lime-300 mb-10">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="email">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full p-2 border text-black border-gray-300 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border text-black border-gray-300 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="w-full p-2 border text-black border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-lime-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors mt-6"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          Already have an account?
          <Link href="/login" legacyBehavior>
            <a className="text-blue-500 cursor-pointer pl-2 hover:underline">Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
}