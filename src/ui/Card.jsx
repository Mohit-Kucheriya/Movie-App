import { useState } from "react";
import { Link } from "react-router-dom";
import No_Image_Available from "/No_Image_Available.jpg";

export default function Card({ item, type, detailsTitle, parentId }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const style = {
    trendingCard: {
      card: "group relative overflow-hidden rounded-xl bg-zinc-50 shadow-md transition-transform duration-300",
      h3: "text-xl font-medium",
      p: "text-sm",
      imgDiv: "h-64",
    },

    peopleCard: {
      card: "group relative overflow-hidden rounded-xl bg-zinc-50 shadow-md transition-transform duration-300",
      h3: "text-2xl font-semibold",
      imgDiv: "h-92",
    },

    horizontalCard: {
      card: "group relative max-w-[200px] min-w-[200px] flex-shrink-0 overflow-hidden rounded-xl bg-zinc-800 shadow-md transition-transform duration-300",
      h3: "text-sm",
      p: "text-xs",
      imgDiv: "h-52",
    },
  };

  const path =
    (type === "peopleCard" && item.profile_path) ||
    item.backdrop_path ||
    item.poster_path ||
    item.profile_path ||
    item.still_path;

  const lowResImgSrc = path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : No_Image_Available;

  const highResImgSrc = path
    ? `https://image.tmdb.org/t/p/original${path}`
    : No_Image_Available;

  const isNoImage = (lowResImgSrc || highResImgSrc) === No_Image_Available;

  const title = item.title || item.original_title || item.name || "Untitled";

  const buildLink = () => {
    if (detailsTitle === "episode" && parentId) {
      return `/tv/${parentId}/season/${item.season_number}/episode/${item.episode_number}`;
    }

    if (item.season_number !== undefined && parentId) {
      return `/tv/${parentId}/season/${item.season_number}`;
    }

    if (item.media_type === "movie" || detailsTitle === "movie") {
      return `/movie/details/${item.id}`;
    }

    if (item.media_type === "tv" || detailsTitle === "tv") {
      return `/tv/details/${item.id}`;
    }

    if (detailsTitle === "person") {
      return `/person/details/${item.id}`;
    }

    return `/details/${item.id}`;
  };

  return (
    <Link to={buildLink()} className={style[type].card}>
      <div
        className={`${style[type].imgDiv} relative w-full overflow-hidden rounded-xl`}
      >
        {/* Low-res blurred image */}
        <img
          src={lowResImgSrc}
          alt={title}
          loading="lazy"
          className={`absolute inset-0 h-full w-full scale-105 object-cover blur-md transition-opacity duration-500 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* High-res image */}
        <img
          src={highResImgSrc}
          alt={title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full object-cover transition-transform duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${isNoImage ? "" : "group-hover:scale-110"}`}
        />

        {isNoImage ? (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-100"></div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 p-3 text-white transition-opacity duration-300 group-hover:opacity-100">
        <h3 className={`line-clamp-1 ${style[type].h3}`}>{title}</h3>

        <p className={`mt-1 line-clamp-2 text-zinc-300 ${style[type].p}`}>
          {item?.overview?.length > 0 && item.overview}
        </p>
      </div>
    </Link>
  );
}
