import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { loadMovieDetails, removeMovie } from "../store/actions/movieAction";
import { TiArrowBack } from "react-icons/ti";
import { SiImdb, SiWikidata } from "react-icons/si";
import { FaImdb } from "react-icons/fa";

import { LuPlay, LuSquareArrowOutUpRight } from "react-icons/lu";
import { BiLogoImdb } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";
import HorizontalCards from "../ui/HorizontalCards";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  console.log(pathname);

  const {
    details,
    external_ids,
    watchProviders,
    translations,
    recommendations,
    similar,
  } = useSelector((state) => state?.movie?.info);

  useEffect(() => {
    dispatch(loadMovieDetails(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  return details ? (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${details?.backdrop_path || details?.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative min-h-screen w-full overflow-hidden text-white"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col gap-8 px-4 py-6 sm:px-8 md:px-12 lg:px-20">
        {/* Navbar */}
        <nav className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/movie"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <TiArrowBack className="text-base" />
            Back
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {details?.homepage && (
              <a
                href={details?.homepage}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-red-600/90 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-red-600"
              >
                Website
              </a>
            )}
            {external_ids?.wikidata_id && (
              <a
                href={`https://www.wikidata.org/wiki/${external_ids?.wikidata_id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-green-600/90 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-green-600"
              >
                Wikidata
              </a>
            )}
            {details?.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${details?.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-yellow-300"
              >
                IMDb
              </a>
            )}
          </div>
        </nav>

        {/* Movie Info */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Poster */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
              alt={details?.title}
              className="w-44 rounded-xl shadow-2xl sm:w-52 md:w-60 lg:w-64"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                {details?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                {details?.release_date && (
                  <span className="font-medium text-zinc-300">
                    {details.release_date.split("-")[0]}
                  </span>
                )}
                {details?.runtime && (
                  <>
                    <span>•</span>
                    <span>{details.runtime} min</span>
                  </>
                )}
                {details?.vote_average && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 leading-0 text-yellow-400">
                      <PiStarFill /> {details.vote_average.toFixed(1)}
                    </span>
                  </>
                )}
              </div>

              {/* Genres */}
              {details?.genres?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {details.genres.map((g) => (
                    <span
                      key={g.id}
                      className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-zinc-200 backdrop-blur-sm"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {details?.tagline && (
              <p className="text-sm text-zinc-400 italic">
                “{details.tagline}”
              </p>
            )}

            {/* Overview */}
            {details?.overview && (
              <div className="">
                <h2 className="mb-1 text-lg font-semibold">Overview</h2>
                <p className="max-w-3xl text-justify text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {details.overview}
                </p>
              </div>
            )}

            <div className="flex justify-center pt-2 lg:justify-start">
              <Link
                to={`${pathname}/trailer`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium shadow-md transition-all duration-300 hover:from-purple-700 hover:to-indigo-700"
              >
                <LuPlay className="text-base" />
                Watch Trailer
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Watch Providers */}
          {watchProviders && (
            <div className="rounded-xl bg-white/5 p-5 shadow-lg backdrop-blur-md">
              <h2 className="mb-4 text-xl font-semibold">Where to Watch</h2>

              <div className="space-y-4">
                {["flatrate", "buy", "rent"].map((type) => {
                  const providers = watchProviders[type];
                  if (!providers?.length) return null;
                  return (
                    <div key={type}>
                      <p className="mb-2 text-sm font-medium text-zinc-400 capitalize">
                        {type === "flatrate" ? "Stream" : type}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {providers.map((p) => (
                          <img
                            key={p?.provider_id}
                            src={`https://image.tmdb.org/t/p/w200${p?.logo_path}`}
                            alt={p?.provider_name}
                            title={p?.provider_name}
                            className="h-12 w-12 rounded-lg shadow-md transition-transform hover:scale-110"
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Translations */}
          {translations && (
            <div className="rounded-xl bg-white/5 p-5 shadow-lg backdrop-blur-md">
              <h2 className="mb-4 text-xl font-semibold">
                Translated Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {translations.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommendations  or Similar */}
        {(recommendations.length > 0 || similar.length > 0) && (
          <HorizontalCards
            data={recommendations.length > 0 ? recommendations : similar}
            title={
              recommendations.length > 0
                ? "Recommended Movies"
                : "Similar Movies"
            }
          />
        )}

        {/* Trailer */}
        <Outlet />
      </div>
    </div>
  ) : (
    <p className="p-10 text-center text-lg">Getting movie details...</p>
  );
}
