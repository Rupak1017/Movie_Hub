// src/components/partials/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="
        w-full
        h-[50vh] md:h-[65vh]
        flex flex-col justify-end items-start
        p-4 md:p-[5%]
      "
    >
      <h1 className="
        w-full md:w-[70%]
        text-2xl md:text-5xl
        font-black text-white
      ">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="
        w-full md:w-[70%]
        mt-3 mb-3
        text-white
        text-sm md:text-base
      ">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-400 ml-1"
        >
          more
        </Link>
      </p>
      <p className="text-white text-xs md:text-sm">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date || "No Information"}
        <i className="ml-5 text-yellow-500 ri-disc-fill"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="
          mt-3 md:mt-5
          bg-[#6556cd]
          px-3 py-2 md:p-4
          rounded
          text-white
          text-sm md:text-base
        "
      >
        Watch Trailer
      </Link>
    </div>
  );
}

export default Header;
