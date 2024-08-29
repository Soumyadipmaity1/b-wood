import Link from 'next/link';
export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-lime-300 mb-10">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded-lg"
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
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-lime-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
   
        <div className="mt-4 text-center">
        Already have an account?           <Link href="/login" legacyBehavior className='text-blue-500 cursor-pointer pl-2 hover:underline'>
          <span className=' text-blue-500 hover:underline pl-2 cursor-pointer'> login         </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
