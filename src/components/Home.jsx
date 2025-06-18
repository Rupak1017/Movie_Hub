// src/components/Home.jsx
import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "../utils/axios";
import Loading from "./Loading";

// Lazy‐load your partials
const Sidenav         = lazy(() => import("./partials/Sidenav"));
const Topnav          = lazy(() => import("./partials/Topnav"));
const Header          = lazy(() => import("./partials/Header"));
const Dropdown        = lazy(() => import("./partials/Dropdown"));
const HorizontalCards = lazy(() => import("./partials/HorizontalCards"));

function Home() {
  document.title = "MovieHub | Homepage";

  // mobile side‐nav open state
  const [isOpen, setIsOpen] = useState(false);

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending]   = useState(null);
  const [category, setCategory]   = useState("all");

  const fetchHeader = async () => {
    try {
      const { data } = await axios.get("/trending/all/day");
      const i = Math.floor(Math.random() * data.results.length);
      setWallpaper(data.results[i]);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTrending();
    if (!wallpaper) fetchHeader();
  }, [category]);

  if (!wallpaper || !trending) {
    return <Loading />;
  }

  return (
    <Suspense fallback={null}>
      {/* Outer wrapper is full-screen height and scrolls vertically */}
      <div className="flex h-screen w-full overflow-x-hidden overflow-y-auto">
        <Sidenav isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 min-w-0 flex flex-col">
          <Topnav isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Header stays at top; scroll begins below */}
          <div className="flex-shrink-0">
            <Header data={wallpaper} />
          </div>

          {/* This section fills the rest of the page height but does NOT trap scroll */}
          <div className="flex-1">
            {/* Trending + filter */}
            <div className="flex items-center justify-between p-3 mt-3 ml-3 space-x-4 md:space-x-0 md:justify-between">
              <h1 className="text-xl md:text-3xl font-semibold text-zinc-400">
                Trending
              </h1>
              <Dropdown
                title="filter"
                options={["tv", "movie", "all"]}
                func={(e) => setCategory(e.target.value)}
              />
            </div>
            <HorizontalCards data={trending} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Home;
