import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <footer className="bg-[#1b1b1b] text-gray-300 pt-10 mt-10 border-t-2 border-neon">
      <div className="max-w-6xl mx-auto flex flex-wrap pb-5 justify-between px-4">
        <FooterSection title="Explore">
          <FooterLink href="/">Movies</FooterLink>
          <FooterLink href="/">TV Shows</FooterLink>
          <FooterLink href="/">New Releases</FooterLink>
          <FooterLink href="/">Coming Soon</FooterLink>
        </FooterSection>
        <FooterSection title="  Information">
          <FooterLink href="/">About Us</FooterLink>
          <FooterLink href="/">Contact</FooterLink>
          <FooterLink href="/">FAQ</FooterLink>
          <FooterLink href="/">Privacy Policy</FooterLink>
        </FooterSection>
        <FooterSection title="Connect">
          <div className="flex space-x-4">
            <SocialIcon href="#" icon={<FaFacebook />} label="Facebook" />
            <SocialIcon href="#" icon={<FaTwitter />} label="Twitter" />
            <SocialIcon href="#" icon={<FaInstagram />} label="Instagram" />
            <SocialIcon href="#" icon={<FaYoutube />} label="YouTube" />
          </div>
        </FooterSection>
        <FooterSection title="Newsletter">
          <p className="mb-4">
            Stay updated with our latest releases and offers!
          </p>
          <form className="flex items-center justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-grow px-2 py-2 rounded-sm bg-gray-800 text-gray-300 border-none focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 roun bg-neon text-gray-900 hover:bg-green-600 transition-colors"

            >
              Subscribe
            </button>
          </form>
        </FooterSection>
      </div>
      <div className="bg-gray-950 py-4 text-center text-sm">
        &copy; {year} B-Wood. All rights reserved.
      </div>
    </footer>
  );
};

const FooterSection = ({ title, children }) => (
  <div className="w-full sm:w-auto flex-1 mb-6 sm:mb-0">
    <h3 className="text-neon text-lg mb-4 uppercase">{title}</h3>
    {children}
  </div>
);

const FooterLink = ({ href, children }) => (
  <li className="mb-2">
    <Link legacyBehavior href={href}>
      <a className="hover:text-neon">{children}</a>
    </Link>
  </li>
);

const SocialIcon = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    className="text-gray-400 hover:text-neon text-2xl"
  >
    {icon}
  </a>
);

export default Footer;
