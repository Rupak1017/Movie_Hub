// src/components/partials/Sidenav.jsx
import React from "react";
import { Link } from "react-router-dom";

function Sidenav({ isOpen, setIsOpen }) {
  return (
    <div
      className={`
        fixed top-0 left-0 z-40 h-[136%] w-64 bg-zinc-900 border-r-2 border-zinc-400 p-8 overflow-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-[17%]
      `}
    >
      {/* Mobile close button inside the panel */}
      <button
        className="absolute top-4 right-4 text-3xl text-zinc-400 md:hidden"
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
      >
        <i className="ri-close-line"></i>
      </button>

      {/* Brand */}
      <h1 className="text-xl md:text-2xl text-white font-bold mt-[-5%] md:mt-0 mb-8">
        <i className="text-[#6556cd] ri-tv-fill mr-2"></i>
        <span>MovieHub</span>
      </h1>

      {/* Navigation groups */}
      <nav className="flex flex-col text-zinc-400 text-xl gap-3 mb-8">
        <h2 className="text-white font-semibold text-xl">New Feeds</h2>
        <Link
          to="/trending"
          className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-4"
        >
          <i className="ri-fire-fill mr-2"></i> Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-4"
        >
          <i className="ri-bard-fill mr-2"></i> Popular
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-4"
        >
          <i className="ri-movie-2-fill mr-2"></i> Movies
        </Link>
        <Link
          to="/tv"
          className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-4"
        >
          <i className="ri-tv-2-fill mr-2"></i> TV Shows
        </Link>
        <Link
          to="/person"
          className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-4"
        >
          <i className="ri-team-fill mr-2"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 my-8" />

      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h2 className="text-white font-semibold text-xl">Website Information</h2>
        <Link className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-4">
          <i className="ri-information-2-fill mr-2"></i> About
        </Link>
        <Link className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-4">
          <i className="ri-phone-fill mr-2"></i> Contact Us
        </Link>
        <Link
       className="hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-4"
  >
    <i className="ri-question-fill mr-2"></i> FAQ
  </Link>
      </nav>
    </div>
  );
}

export default Sidenav;
