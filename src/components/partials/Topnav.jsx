// src/components/partials/Topnav.jsx
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

const noimage = "/noimage.webp";

function Topnav({ isOpen, setIsOpen, hideBurger = false }) {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetch() {
      if (!debouncedQuery) {
        setSearches([]);
        return;
      }
      try {
        const { data } = await axios.get(
          `/search/multi?query=${debouncedQuery}`
        );
        setSearches(data.results);
      } catch (e) {
        console.error(e);
      }
    }
    fetch();
  }, [debouncedQuery]);

  return (
    <div
      className="
        w-[80%] h-[10vh] relative flex items-center mx-auto
        my-4 md:my-0
        max-md:w-full max-md:px-4
      "
    >
      {/* mobile‐only burger, hidden when hideBurger=true */}
      {!hideBurger && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden text-3xl text-zinc-400 mr-2"
          aria-label="Toggle menu"
        >
          <i className="ri-menu-line"></i>
        </button>
      )}

      {/* search icon */}
      <i className="text-3xl text-zinc-400 ri-search-line max-md:ml-2" />

      {/* input */}
      <input
        type="text"
        placeholder="Search Movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-[50%] text-white mx-10 text-xl p-5 outline-none bg-transparent
          max-md:flex-1 max-md:mx-0 max-md:p-2 max-md:text-sm
        "
      />

      {/* clear “×” */}
      {query && (
        <i
          onClick={() => setQuery("")}
          className="
            ri-close-fill cursor-pointer text-3xl text-zinc-400
            max-md:text-xl max-md:ml-2 max-md:mr-0
          "
          aria-label="Clear search"
        />
      )}

      {/* results dropdown */}
      {debouncedQuery && (
        <div
          className="
            absolute top-full left-0
            w-full md:w-[50%] md:left-[5%]
            bg-zinc-200 max-h-[50vh] overflow-auto
            rounded-md shadow-lg mt-1 z-50
          "
        >
          {searches.map((s, i) => (
            <Link
              key={i}
              to={`/${s.media_type}/details/${s.id}`}
              className="
                flex items-center p-10 max-md:p-2
                border-b-2 last:border-b-0
                hover:bg-zinc-300 duration-300
              "
            >
              <img
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${s.backdrop_path ||
                        s.profile_path}`
                    : noimage
                }
                alt=""
                className="
                  w-[10vh] h-[10vh]
                  max-md:w-[6vh] max-md:h-[6vh]
                  object-cover rounded mr-5 max-md:mr-2 shadow-lg
                "
              />
              <span className="font-semibold text-zinc-600">
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;
