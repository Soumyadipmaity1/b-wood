import React from 'react';
import { FaNewspaper, FaTachometerAlt, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';

const reasons = [
  {
    title: 'Exclusive Content',
    description: 'Get access to the hottest new movies as soon as they hit the big screen.',
    icon: <FaNewspaper className='size-16' />,
  },
  {
    title: 'Premium Experience',
    description: 'Enjoy state-of-the-art theaters with cutting-edge sound and visual technology.',
    icon: <FaTachometerAlt className='size-16' />,
  },
  {
    title: 'Easy Booking',
    description: 'Book your tickets in seconds with our user-friendly web app and website.',
    icon: <FaCalendarAlt className='size-16' />,
  },
  {
    title: 'Exclusive Offers',
    description: 'Get access to members-only discounts, special screenings, and more.',
    icon: <FaUserFriends className='size-16' />,
  },
];

const WhyChooseSection = () => {
  return (
    <section className="w-full flex items-center justify-center bg-gradient-to-r from-gradient-start to-gradient-end p-8 py-16">
      <div className="flex justify-center flex-wrap lg:flex-nowrap gap-6">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="relative flex items-center flex-col justify-around py-6 border border-white overflow-hidden rounded-lg bg-black text-white shadow-lg transform transition-transform duration-150 hover:scale-105"
          >
            <div className="flex items-center justify-center h-24 w-full bg-gradient-to-br from-gradient-start to-gradient-end transition-all duration-150">
              <div className="text-center">{reason.icon}</div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl text-center text-neon font-semibold mb-3">{reason.title}</h3>
              <p className="text-sm text-center">{reason.description}</p>
            </div>
            <div className="absolute -z-10 inset-0 gradient-overlay"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSection;
