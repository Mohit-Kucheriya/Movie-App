import {
  RiCalendarScheduleFill,
  RiMovie2AiFill,
  RiTvFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Header({ data }) {
  if (!data) return null;
  console.log(data);

  const {
    title,
    original_title,
    name,
    backdrop_path,
    poster_path,
    overview,
    release_date,
    first_air_date,
    media_type,
  } = data;

  const media_type_icons = {
    movie: <RiMovie2AiFill className="text-base text-yellow-300" />,
    tv: <RiTvFill className="text-base text-yellow-300" />,
  };

  return (
    <div className="group relative h-96 w-full overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${backdrop_path || poster_path}`}
          alt={title || original_title || name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Text Content Layer */}
      <div className="relative z-10 flex h-full max-w-xl flex-col items-start justify-end p-8">
        <h1 className="mb-3 text-3xl font-semibold drop-shadow-lg">
          {title || original_title || name}
        </h1>

        {overview ? (
          <p className="text-sm tracking-wide text-zinc-300">{overview}</p>
        ) : (
          <p className="text-sm tracking-wide text-zinc-300">
            No overview available for this movie
          </p>
        )}

        <div className="my-3 flex gap-4 text-sm">
          <p className="flex items-center gap-1.5">
            <RiCalendarScheduleFill className="text-base text-yellow-300" />
            <span>{release_date || first_air_date || "N/A"}</span>
          </p>
          <p className="flex items-center gap-1.5">
            {media_type_icons[media_type]}
            <span>{media_type}</span>
          </p>
        </div>

        <Link className="rounded bg-purple-600 p-3 text-sm font-medium transition-colors duration-300 hover:bg-purple-700">
          Watch Trailer
        </Link>
      </div>
    </div>
  );
}
