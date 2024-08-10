import React from 'react'
import AdminMovies from '../../components/adminComponents/Movies/AdminMovies'
import AdminTheatres from '../../components/adminComponents/Theatres/AdminTheatres'
import AdminShowtimes from '../../components/adminComponents/Showtimes/AdminShowtimes'
import AdminReservations from '../../components/adminComponents/Reservations/AdminReservations'
import AdminUsers from '../../components/adminComponents/Users/AdminUsers'
import { FaPlusCircle } from 'react-icons/fa'

function Admin() {
  return (
    <main className='px-10 pt-20'>
      <div className="p-6">
        <div className='flex justify-between'>
          <h1 className="text-3xl text-[#a8ff35] font-bold">Existing Movies</h1>
          <button className='flex items-center justify-around p-1 gap-2 pr-3 text-black font-bold bg-[#a8ff35] rounded-full cursor-pointer transition ease-in-out duration-150 hover:scale-105'>
            <FaPlusCircle className='size-8' />
            <p className='flex items-center justify-center'>Add Movies</p>
          </button>
        </div>
        <AdminMovies />
      </div>
      <div className="p-6">
        <div className='flex justify-between'>
          <h1 className="text-3xl text-[#a8ff35] font-bold">Existing Theatres</h1>
          <button className='flex items-center justify-around p-1 gap-2 pr-3 text-black font-bold bg-[#a8ff35] rounded-full cursor-pointer transition ease-in-out duration-150 hover:scale-105'>
            <FaPlusCircle className='size-8' />
            <p className='flex items-center justify-center'>Add Theatres</p>
          </button>
        </div>
        <AdminTheatres />
      </div>
      <div className="p-6">
        <div className='flex justify-between'>
          <h1 className="text-3xl text-[#a8ff35] font-bold">Existing Showtimes</h1>
          <button className='flex items-center justify-around p-1 gap-2 pr-3 text-black font-bold bg-[#a8ff35] rounded-full cursor-pointer transition ease-in-out duration-150 hover:scale-105'>
            <FaPlusCircle className='size-8' />
            <p className='flex items-center justify-center'>Add Showtimes</p>
          </button>
        </div>
        <AdminShowtimes />
      </div>
      <div className="p-6">
        <div className='flex justify-between'>
          <h1 className="text-3xl text-[#a8ff35] font-bold">Existing Reservations</h1>
          <button className='flex items-center justify-around p-1 gap-2 pr-3 text-black font-bold bg-[#a8ff35] rounded-full cursor-pointer transition ease-in-out duration-150 hover:scale-105'>
            <FaPlusCircle className='size-8' />
            <p className='flex items-center justify-center'>Add Reservations</p>
          </button>
        </div>
        <AdminReservations />
      </div>
      <div className="p-6">
        <div className='flex justify-between'>
          <h1 className="text-3xl text-[#a8ff35] font-bold">Existing Users</h1>
          <button className='flex items-center justify-around p-1 gap-2 pr-3 text-black font-bold bg-[#a8ff35] rounded-full cursor-pointer transition ease-in-out duration-150 hover:scale-105'>
            <FaPlusCircle className='size-8' />
            <p className='flex items-center justify-center'>Add Users</p>
          </button>
        </div>
        <AdminUsers />
      </div>
    </main>
  )
}

export default Admin