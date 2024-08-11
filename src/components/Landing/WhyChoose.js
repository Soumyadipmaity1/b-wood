import React from 'react';
import { FaNewspaper, FaTachometerAlt, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';

const reasons = [
  {
    title: 'Exclusive Content',
    description: 'Get access to the hottest new movies as soon as they hit the big screen.',
    icon: <FaNewspaper size={40} />,
  },
  {
    title: 'Premium Experience',
    description: 'Enjoy state-of-the-art theaters with cutting-edge sound and visual technology.',
    icon: <FaTachometerAlt size={40} />,
  },
  {
    title: 'Easy Booking',
    description: 'Book your tickets in seconds with our user-friendly web app and website.',
    icon: <FaCalendarAlt size={40} />,
  },
  {
    title: 'Exclusive Offers',
    description: 'Get access to members-only discounts, special screenings, and more.',
    icon: <FaUserFriends size={40} />,
  },
];

const WhyChooseSection = () => {
  return (
    <section className="bg-gradient-to-r from-gradient-start to-gradient-end p-8 py-16">
      {/* <h2 className="text-4xl font-bold text-neon mb-20 text-center">Why  Us?</h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-4 gap-6">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="relative border border-white overflow-hidden rounded-lg bg-black text-white shadow-lg transform transition-transform duration-150 hover:scale-105"
          >
            <div className="flex items-center justify-center h-24 w-full bg-gradient-to-br from-gradient-start to-gradient-end transition-all duration-150">
              <div className="text-center">{reason.icon}</div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl text-center text-neon font-semibold mb-3">{reason.title}</h3>
              <p className="text-sm text-center">{reason.description}</p>
            </div>
            <div className="absolute inset-0 gradient-overlay"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSection;
