// src/components/Movie.jsx
import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// Lazy‐load these chunks:
const Topnav   = lazy(() => import("./partials/Topnav"));
const Dropdown = lazy(() => import("./partials/Dropdown"));
const Cards    = lazy(() => import("./partials/Cards"));
const Loading  = lazy(() => import("./Loading"));

function Movie() {
  const navigate   = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie,    setMovie]    = useState([]);
  const [page,     setPage]     = useState(1);
  const [hasMore,  setHasMore]  = useState(true);

  document.title = "MovieHub | Movies";

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage((p) => p + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const refreshHandler = () => {
    setMovie([]);
    setPage(1);
    setHasMore(true);
    GetMovie();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  // While we haven’t loaded at least one page, show your Loading component
  if (movie.length === 0) {
    return (
      <Suspense fallback={<div />}>
        <Loading />
      </Suspense>
    );
  }

  // Once we have data, wrap *everything* in one Suspense so styling is unchanged
  return (
    <Suspense fallback={null}>
      <div className="w-screen h-screen">
        <div className="px-[5%] w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556cd] ri-arrow-left-line"
            />
            Movie
            <small className="ml-2 text-sm text-zinc-600">({category})</small>
          </h1>
          <div className="flex items-center w-[80%]">
            <Topnav />
            <Dropdown
              title="Category"
              options={["popular", "top_rated", "upcoming", "now_playing"]}
              func={(e) => setCategory(e.target.value)}
            />
            <div className="w-[2%]" />
          </div>
        </div>

        <InfiniteScroll
          dataLength={movie.length}
          next={GetMovie}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >
          <Cards data={movie} title="movie" />
        </InfiniteScroll>
      </div>
    </Suspense>
  );
}

export default Movie;
