import { Link } from "react-router-dom";

export default function Card({ item, type }) {
  const style = {
    trendingCard: {
      card: "group relative overflow-hidden rounded-xl bg-zinc-50 shadow-md transition-transform duration-300",
      h3: "text-xl",
      p: "text-sm",
    },

    horizontalCard: {
      card: "group relative max-w-[200px] min-w-[200px] flex-shrink-0 overflow-hidden rounded-xl bg-zinc-800 shadow-md transition-transform duration-300",
      h3: "text-sm",
      p: "text-xs",
    },
  };

  return (
    <Link key={item.id} className={style[type].card}>
      <div className="h-52 w-full overflow-hidden rounded-xl">
        {/* Image */}
        <img
          src={`https://image.tmdb.org/t/p/w500${
            item.backdrop_path || item.poster_path
          }`}
          alt={item.title || item.original_title || item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Overlay (for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Content */}
      <div className="absolute bottom-0 p-3 text-white transition-opacity duration-300 group-hover:opacity-100">
        <h3 className={`line-clamp-1 font-medium ${style[type].h3}`}>
          {item.title || item.original_title || item.name}
        </h3>
        <p className={`mt-1 line-clamp-2 text-zinc-300 ${style[type].p}`}>
          {item.overview || "No overview available"}
        </p>
      </div>
    </Link>
  );
}
