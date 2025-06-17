// src/components/Movie.jsx
import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Topnav    = lazy(() => import("./partials/Topnav"));
const Dropdown  = lazy(() => import("./partials/Dropdown"));
const Cards     = lazy(() => import("./partials/Cards"));
const Loading   = lazy(() => import("./Loading"));

function Movie() {
  const navigate               = useNavigate();
  const [isOpen, setIsOpen]    = useState(false);
  const [category, setCategory] = useState("now_playing");
  const [movies, setMovies]     = useState([]);
  const [page, setPage]         = useState(1);
  const [hasMore, setHasMore]   = useState(true);

  document.title = "MovieHub | Movies";

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length) {
        setMovies(prev => [...prev, ...data.results]);
        setPage(p => p + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const refresh = () => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMovies();
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  if (movies.length === 0) {
    return (
      <Suspense fallback={<div />}>
        <Loading />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <div className="flex flex-col h-screen w-screen overflow-x-hidden">
        {/* Topnav (burger hidden on this page) */}
        <div className="px-[5%] py-3">
          <Topnav hideBurger={true} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* Back button + Category selector */}
        <div className="px-[5%] flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-zinc-400 flex items-center gap-2">
            <i
              onClick={() => navigate(-1)}
              className="ri-arrow-left-line text-2xl cursor-pointer hover:text-[#6556cd]"
            />
            Movie
            <small className="ml-2 text-sm text-zinc-600">
              ({category})
            </small>
          </h1>
          <Dropdown
            title="Category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={e => setCategory(e.target.value)}
          />
        </div>

        {/* Scrollable, centered cards */}
        <div className="flex-1 overflow-auto px-[5%]">
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchMovies}
            hasMore={hasMore}
            loader={<h1 className="text-center py-4">Loading...</h1>}
          >
            <div className="flex justify-center">
              <Cards data={movies} title="movie" />
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Suspense>
  );
}

export default Movie;
