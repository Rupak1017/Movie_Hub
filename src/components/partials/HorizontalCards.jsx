// src/components/partials/HorizontalCards.jsx
import React from "react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const noimage = "/noimage.webp";

function HorizontalCards({ data }) {
  return (
    <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[15%] h-[40vh] bg-zinc-900 mr-5 mb-5"
          >
            <LazyImage
              className="w-full h-[55%] object-cover"
              src={
                d.poster_path || d.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.poster_path || d.backdrop_path
                    }`
                  : noimage
              }
              alt={d.title || d.name || ""}
            />
            <div className="text-white p-3 h-[45%] overflow-y-auto">
              <h1 className="text-xl font-semibold">
                {d.name || d.title || d.original_name || d.original_title}
              </h1>
              <p>
                {d.overview.slice(0, 50)}...
                <span className="text-zinc-500"> more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
