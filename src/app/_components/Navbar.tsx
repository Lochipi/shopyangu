"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-blue-600 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-lg font-bold" passHref>
            Shop Yangu
          </Link>
        </div>

        <div className="hidden space-x-8 md:flex">
          <Link className="text-white hover:text-gray-300" href="/">
            Home
          </Link>
          <Link className="text-white hover:text-gray-300" href="/shops">
            Shops
          </Link>
          <Link className="text-white hover:text-gray-300" href="#">
            Services
          </Link>
          <Link className="text-white hover:text-gray-300" href="#">
            Contact
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-blue-500 p-4`}
      >
        <Link
          className="block py-2 text-white hover:text-gray-300"
          href="/home"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="block py-2 text-white hover:text-gray-300"
        >
          About
        </Link>
        <Link
          href="/services"
          className="block py-2 text-white hover:text-gray-300"
        >
          Services
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
