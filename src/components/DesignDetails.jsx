import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadMovieDetails, removeMovie } from "../store/actions/movieAction";
import { TiArrowBack } from "react-icons/ti";
import { SiImdb, SiWikidata } from "react-icons/si";

import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { BiLogoImdb } from "react-icons/bi";
import { PiStarFill } from "react-icons/pi";

export default function MovieDetails() {
  const { details, external_ids, watchProviders, translations } = useSelector(
    (state) => state.movie.info,
  );
  console.log(details);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMovieDetails(id));

    return () => {
      dispatch(removeMovie());
    };
  }, [id]);

  return (
    <div>
      {/*  1st Design*/}
      <div
        style={{
          backgroundImage: `url(https:image.tmdb.org/t/p/original${details?.backdrop_path || details?.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative min-h-screen w-full overflow-hidden px-6 py-8 text-white md:px-12 lg:px-16"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black/90"></div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col gap-8">
          {/* Navbar - Part1 */}
          <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Back Button */}
            <Link
              to="/movie"
              className="flex items-center gap-2 text-sm font-medium text-zinc-300 transition-all hover:text-white"
            >
              <TiArrowBack className="text-lg" />
              Back to Movies
            </Link>

            {/* External Links */}
            <div className="flex flex-wrap items-center gap-3">
              {details?.homepage && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={details?.homepage}
                  className="flex items-center gap-2 rounded-lg bg-red-700/90 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-red-600"
                >
                  <LuSquareArrowOutUpRight className="text-lg" />
                  HomePage
                </a>
              )}

              {external_ids?.wikidata_id && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https:www.wikidata.org/wiki/${external_ids?.wikidata_id}`}
                  className="flex items-center gap-2 rounded-lg bg-red-700/90 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-red-600"
                >
                  <SiWikidata className="text-lg" />
                  Wikidata
                </a>
              )}

              {details?.imdb_id && (
                <a
                  href={`https:www.imdb.com/title/${details?.imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-yellow-300"
                >
                  <SiImdb className="text-lg" />
                  IMDb
                </a>
              )}
            </div>
          </nav>

          {/* Movie Info  - Part2 */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <img
              src={`https:image.tmdb.org/t/p/w500${details?.poster_path}`}
              alt={details?.title}
              className="w-48 rounded-2xl shadow-lg sm:w-56 md:w-64"
            />

            <div className="w-full md:max-w-2xl">
              <div className="rounded-2xl bg-black/60 p-5 shadow-lg backdrop-blur-sm">
                <h1 className="mb-2 text-3xl font-bold">{details?.title}</h1>
                <p className="text-sm text-gray-300">
                  {details?.release_date?.split("-")[0]} • {details?.runtime}{" "}
                  min
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {details?.genres?.map((g) => g.name).join(", ")}
                </p>

                {details?.tagline && (
                  <p className="mt-3 text-gray-400 italic">
                    “{details?.tagline}”
                  </p>
                )}

                <p className="mt-4 text-sm leading-relaxed text-gray-200 sm:text-base">
                  {details?.overview}
                </p>
              </div>
            </div>
          </div>

          {/* Watch Providers - Part3 */}
          {watchProviders && (
            <div className="rounded-2xl bg-black/50 p-6 shadow-lg backdrop-blur-sm">
              <h2 className="mb-4 text-2xl font-semibold">Watch Providers</h2>

              <div className="flex flex-col gap-5">
                {/* Platform */}
                {watchProviders?.flatrate?.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-300">
                      Available on Platform
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {watchProviders.flatrate.map((p) => (
                        <img
                          key={p?.provider_name}
                          src={`https:image.tmdb.org/t/p/w500${p?.logo_path}`}
                          alt={p?.provider_name}
                          className="w-12 rounded-lg shadow-md transition-transform hover:scale-105"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Buy */}
                {watchProviders?.buy?.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-300">
                      Available to Buy
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {watchProviders.buy.map((p) => (
                        <img
                          key={p?.provider_name}
                          src={`https:image.tmdb.org/t/p/w500${p?.logo_path}`}
                          alt={p?.provider_name}
                          className="w-12 rounded-lg shadow-md transition-transform hover:scale-105"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Rent */}
                {watchProviders?.rent?.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-300">
                      Available on Rent
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      {watchProviders.rent.map((p) => (
                        <img
                          key={p?.provider_name}
                          src={`https:image.tmdb.org/t/p/w500${p?.logo_path}`}
                          alt={p?.provider_name}
                          className="w-12 rounded-lg shadow-md transition-transform hover:scale-105"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Translations - Part4 */}
          {translations && (
            <div className="rounded-2xl bg-black/50 p-6 shadow-lg backdrop-blur-sm">
              <h2 className="mb-4 text-2xl font-semibold">Translations</h2>

              <div className="flex flex-wrap items-center gap-3">
                {translations.map((t, i) => (
                  <p key={i} className="text-sm font-medium text-gray-300">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2nd Design */}
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${details?.backdrop_path || details?.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative min-h-screen w-full overflow-x-hidden text-white"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60"></div>

        {/* Content Layer */}
        <div className="relative z-10">
          {/* Navbar */}
          <nav className="flex flex-col gap-3 border-b border-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-16">
            {/* Back Button */}
            <Link
              to="/movie"
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <TiArrowBack className="text-base" />
              Back to Movies
            </Link>

            {/* External Links */}
            <div className="flex flex-wrap items-center gap-2">
              {details?.homepage && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={details?.homepage}
                  className="flex items-center gap-1.5 rounded-md bg-red-600/90 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-red-600"
                >
                  <LuSquareArrowOutUpRight className="text-sm" />
                  Website
                </a>
              )}

              {external_ids?.wikidata_id && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https:www.wikidata.org/wiki/${external_ids?.wikidata_id}`}
                  className="flex items-center gap-1.5 rounded-md bg-green-600/90 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-green-600"
                >
                  <SiWikidata className="text-sm" />
                  Wikidata
                </a>
              )}

              {details?.imdb_id && (
                <a
                  href={`https:www.imdb.com/title/${details?.imdb_id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-yellow-300"
                >
                  <SiImdb className="text-sm" />
                  IMDb
                </a>
              )}
            </div>
          </nav>

          {/* Movie Info Section */}
          <div className="px-4 py-6 sm:px-8 lg:px-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
              {/* Poster */}
              <div className="flex justify-center lg:justify-start">
                <img
                  src={`https:image.tmdb.org/t/p/w500${details?.poster_path}`}
                  alt={details?.title}
                  className="w-44 rounded-lg shadow-2xl sm:w-52 lg:w-60"
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h1 className="text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
                    {details?.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 sm:text-sm">
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
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          {details.vote_average.toFixed(1)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Genres */}
                  {details?.genres?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {details.genres.map((g) => (
                        <span
                          key={g.id}
                          className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium backdrop-blur-sm"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tagline */}
                {details?.tagline && (
                  <p className="text-sm text-zinc-400 italic">
                    {details.tagline}
                  </p>
                )}

                {/* Overview */}
                {details?.overview && (
                  <div className="space-y-1.5">
                    <h2 className="text-base font-semibold sm:text-lg">
                      Overview
                    </h2>
                    <p className="text-sm leading-relaxed text-zinc-300">
                      {details.overview}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Section - Two Column Grid */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Watch Providers */}
              {watchProviders && (
                <div className="rounded-lg bg-white/5 p-5 backdrop-blur-md">
                  <h2 className="mb-4 text-lg font-semibold">Where to Watch</h2>

                  <div className="space-y-4">
                    {/* Streaming */}
                    {watchProviders?.flatrate?.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-zinc-400">
                          Stream
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {watchProviders.flatrate.map((p) => (
                            <div
                              key={p?.provider_id}
                              className="group relative"
                              title={p?.provider_name}
                            >
                              <img
                                src={`https:image.tmdb.org/t/p/w200${p?.logo_path}`}
                                alt={p?.provider_name}
                                className="h-11 w-11 rounded-lg shadow-md transition-transform group-hover:scale-110"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Buy */}
                    {watchProviders?.buy?.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-zinc-400">Buy</p>
                        <div className="flex flex-wrap gap-3">
                          {watchProviders.buy.map((p) => (
                            <div
                              key={p?.provider_id}
                              className="group relative"
                              title={p?.provider_name}
                            >
                              <img
                                src={`https:image.tmdb.org/t/p/w200${p?.logo_path}`}
                                alt={p?.provider_name}
                                className="h-11 w-11 rounded-lg shadow-md transition-transform group-hover:scale-110"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rent */}
                    {watchProviders?.rent?.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-zinc-400">
                          Rent
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {watchProviders.rent.map((p) => (
                            <div
                              key={p?.provider_id}
                              className="group relative"
                              title={p?.provider_name}
                            >
                              <img
                                src={`https:image.tmdb.org/t/p/w200${p?.logo_path}`}
                                alt={p?.provider_name}
                                className="h-11 w-11 rounded-lg shadow-md transition-transform group-hover:scale-110"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Translations */}
              {translations && (
                <div className="rounded-lg bg-white/5 p-5 backdrop-blur-md">
                  <h2 className="mb-4 text-lg font-semibold">
                    Available Languages
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {translations.map((t, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
