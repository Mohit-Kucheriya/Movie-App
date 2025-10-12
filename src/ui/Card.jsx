import { Link } from "react-router-dom";
import No_Image_Available from "/No_Image_Available.jpg";

export default function Card({ item, type }) {
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

  return (
    <Link key={item.id} className={style[type].card}>
      <div
        className={`${style[type].imgDiv} w-full overflow-hidden rounded-xl`}
      >
        {/* Image */}
        <img
          src={
            item.backdrop_path || item.poster_path || item.profile_path
              ? `https://image.tmdb.org/t/p/w500${
                  item.backdrop_path || item.poster_path || item.profile_path
                }`
              : No_Image_Available
          }
          alt={item.title || item.original_title || item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Overlay (for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Content */}
      <div className="absolute bottom-0 p-3 text-white transition-opacity duration-300 group-hover:opacity-100">
        <h3 className={`line-clamp-1 ${style[type].h3}`}>
          {item.title || item.original_title || item.name}
        </h3>

        {item.overview && (
          <p className={`mt-1 line-clamp-2 text-zinc-300 ${style[type].p}`}>
            {item.overview || "No overview available"}
          </p>
        )}
      </div>
    </Link>
  );
}
