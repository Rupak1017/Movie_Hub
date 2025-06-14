import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import noimage from "/noimage.webp";

function Topnav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);
  // ← debounce the “live” query
  const debouncedQuery = useDebounce(query, 500);

  const GetSearches = async (q) => {
    if (!q) {
      setSearches([]);
      return;
    }
    try {
      const { data } = await axios.get(`/search/multi?query=${q}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // ← now watch debouncedQuery, not query directly
  useEffect(() => {
    GetSearches(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center">
      <i className="text-3xl text-zinc-400 ri-search-line" />
      <input
        type="text"
        placeholder="search anything"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-[50%] text-white mx-10 text-xl p-5 outline-none bg-transparent"
      />
      {query && (
        <i
          onClick={() => setQuery("")}
          className="text-3xl text-zinc-400 ri-close-fill right-0 cursor-pointer"
        />
      )}

      {debouncedQuery && (
        <div className="z-[100] w-[50%] max-h-[50vh] bg-zinc-200 absolute top-[100%] left-[5%] overflow-auto rounded">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-10 flex items-center border-b-2 border-zinc-100"
            >
              <img
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path}`
                    : noimage
                }
                alt=""
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              />
              <span>{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;
