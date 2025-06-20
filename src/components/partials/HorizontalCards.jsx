// src/components/partials/HorizontalCards.jsx
import React from "react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const noimage = "/noimage.webp";

function HorizontalCards({ data }) {
  return (
    <div className="w-full flex overflow-x-auto overflow-y-hidden mb-5 p-5">
      {data.length > 0 ? (
        data.map((d, i) => {
          const path = d.poster_path || d.backdrop_path || "";
          // fallback to a mid-size (342px wide) if available
          const fallback = `/w342${path}`;
          // tell the browser what other sizes we have
          const srcSet = [
            `/w185${path} 185w`,
            `/w342${path} 342w`,
            `/w500${path} 500w`,
          ]
            .map((s) => `https://image.tmdb.org/t/p${s}`)
            .join(", ");
          // match your Tailwind widths:
          // 60% viewport on phones, 40% on small tablets, ~15% on desktop
          const sizes = "(max-width: 640px) 60vw, (max-width: 768px) 40vw, 15vw";

          return (
            <Link
              key={i}
              to={`/${d.media_type}/details/${d.id}`}
              className="
                bg-zinc-900 mb-5 flex-shrink-0
                /* phones */ w-[60%]
                /* small tablets */ sm:w-[40%]
                /* desktop original */ md:w-[15%]
                h-[40vh]
                mr-3 md:mr-5 last:mr-0
              "
            >
              <LazyImage
                className="w-full h-[55%] object-cover"
                src={
                  path
                    ? `https://image.tmdb.org/t/p${fallback}`
                    : noimage
                }
                srcSet={path ? srcSet : undefined}
                sizes={path ? sizes : undefined}
                alt={d.title || d.name || ""}
                loading="lazy"
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
          );
        })
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center w-full">
          Nothing to show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
