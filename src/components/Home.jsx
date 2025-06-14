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

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending]   = useState(null);
  const [category, setCategory]   = useState("all");

  const fetchHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const i         = Math.floor(Math.random() * data.results.length);
      setWallpaper(data.results[i]);
    } catch (e) { console.error(e); }
  };

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchTrending();
    if (!wallpaper) fetchHeader();
  }, [category]);

  // still show your Loading component until both calls finish
  if (!wallpaper || !trending) {
    return <Loading />;
  }

  // everything inside this Suspense uses the exact same markup
  return (
    <Suspense fallback={null}>
      <Sidenav />
      <div className="w-[83%] h-full overflow-auto overflow-x-hidden ">
        <Topnav />
        <Header data={wallpaper} />

        <div className="flex justify-between p-3 mt-3 ml-3">
          <h1 className="text-3xl font-seminold text-zinc-400">Trending</h1>
          <Dropdown
            title="filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </Suspense>
  );
}

export default Home;
