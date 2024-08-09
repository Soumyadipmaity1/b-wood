import Link from 'next/link';
import React from 'react'

const tabs = [
  {
    id: 1,
    title: 'Movies',
    description: 'Add/Update/Delete Movies',
    link: 'movies'
  },
  {
    id: 2,
    title: 'Theatres',
    description: 'Add/Update/Delete Theatres',
    link: 'theatres'
  },
  {
    id: 3,
    title: 'Showtimes',
    description: 'Add/Update/Delete Showtimes',
    link: 'showtimes'
  },
  {
    id: 4,
    title: 'Reservations',
    description: 'Add/Update/Delete Reservations',
    link: 'reservations'
  },
  {
    id: 5,
    title: 'Users',
    description: 'Add/Update/Delete Users',
    link: 'users'
  }
];

const AdminTabs = () => {
  return (
    <section className="bg-gradient-to-r from-gradient-start to-gradient-end pt-24 px-10">
      <div className="flex flex-wrap items-center justify-center gap-6">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="relative border border-white overflow-hidden rounded-lg bg-black text-white shadow-lg cursor-pointer transform transition-transform duration-150 hover:scale-105"
          >
            <Link href={`/admin/${tab.link}`}>
              <div className="p-14">
                <h3 className="text-2xl text-center text-[#a8ff35] font-semibold mb-3">{tab.title}</h3>
                <p className="text-sm text-center">{tab.description}</p>
              </div>
              <div className="absolute inset-0 gradient-overlay"></div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AdminTabs