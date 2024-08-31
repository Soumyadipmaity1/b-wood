'use client';
import { useState } from 'react';
import { auth, db } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc, doc, query, collection, where, getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserbyEmail } from '../../actions/user';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Fetch user document from Firestore
      // const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const res=await getUserbyEmail(email)
      console.log(res);
      if (res) {
        // Compare entered password with stored hashed password
        const passwordMatch = await bcrypt.compare(password, res.password);

        if (passwordMatch) {
          // Sign in with Firebase Auth
          await signInWithEmailAndPassword(auth, email, password);
          // Redirect or notify user on successful login
          router.push('/');
        } else {
          setError('Invalid email or password.');
        }
      } else {
        setError('No user found with this email.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center lg:mt-12">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-lime-300 mb-10">Login</h2>
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
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
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?
          <Link href="/signup" legacyBehavior>
            <a className="text-blue-500 cursor-pointer pl-2 hover:underline">Signup</a>
          </Link>
        </div>
      </div>
    </div>
  );
}