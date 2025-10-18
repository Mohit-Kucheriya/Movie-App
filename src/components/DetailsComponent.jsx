import { Link, Outlet } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { PiStarFill } from "react-icons/pi";
import { LuPlay } from "react-icons/lu";
import HorizontalCards from "../ui/HorizontalCards";
import No_Image_Available from "/No_Image_Available.jpg";

export default function DetailsPage({
  type, // "movie" | "tv" | "person" | "season" | "episode"
  details = {},
  external_ids = {},
  credits = {},
  watchProviders = null,
  translations = [],
  recommendations = [],
  similar = [],
  videos = null,
  extraSections = [],
  backPath = -1,
  pathname = "",
  parentId,
}) {
  if (!details || Object.keys(details).length === 0)
    return (
      <p className="p-10 text-center text-lg text-zinc-400">
        Loading details...
      </p>
    );

  const background =
    details?.backdrop_path ||
    details?.poster_path ||
    details?.still_path ||
    null;

  const title =
    details?.title ||
    details?.name ||
    details?.original_name ||
    details?.original_title ||
    "Untitled";

  const year =
    details?.release_date?.split("-")[0] ||
    details?.first_air_date?.split("-")[0] ||
    details?.air_date?.split("-")[0] ||
    null;

  const rating =
    details?.vote_average && details.vote_average > 0
      ? details.vote_average.toFixed(1)
      : null;

  const overview =
    details?.overview?.trim() || details?.biography?.trim() || null;

  const poster =
    details?.poster_path ||
    details?.profile_path ||
    details?.still_path ||
    null;

  const trailerAvailable = !!videos?.key;

  const hasProviders =
    watchProviders &&
    (watchProviders.flatrate?.length ||
      watchProviders.buy?.length ||
      watchProviders.rent?.length);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundImage: background
          ? `url(https://image.tmdb.org/t/p/original${background})`
          : "linear-gradient(to bottom, #000, #111)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/40"></div>

      <div className="relative z-10 flex flex-col gap-8 px-4 py-8 sm:px-8 md:px-12 lg:px-20">
        {/* 🔙 Navbar */}
        <nav className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to={backPath}
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white"
          >
            <TiArrowBack className="text-base" />
            Back
          </Link>

          {/* 🔗 External Links */}
          <div className="flex flex-wrap items-center gap-2">
            {details?.homepage && (
              <a
                href={details.homepage}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-red-600/90 px-3 py-1.5 text-sm font-medium hover:bg-red-600"
              >
                Website
              </a>
            )}

            {external_ids?.wikidata_id && (
              <a
                href={`https://www.wikidata.org/wiki/${external_ids.wikidata_id}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-green-600/90 px-3 py-1.5 text-sm font-medium hover:bg-green-600"
              >
                Wikidata
              </a>
            )}

            {details?.imdb_id && (
              <a
                href={`https://www.imdb.com/${type === "person" ? "name" : "title"}/${details.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-black hover:bg-yellow-300"
              >
                IMDb
              </a>
            )}
          </div>
        </nav>

        {/* 🖼️ Poster + Info */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="flex justify-center lg:justify-start">
            <img
              src={
                poster
                  ? `https://image.tmdb.org/t/p/original${poster}`
                  : No_Image_Available
              }
              alt={title}
              className="w-44 rounded-xl object-cover shadow-2xl sm:w-52 md:w-60 lg:w-64"
            />
          </div>

          <div className="flex-1 space-y-4">
            {/* 🏷️ Title */}
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-bold sm:text-4xl">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                {year && (
                  <span className="font-medium text-zinc-300">{year}</span>
                )}
                {details?.runtime && (
                  <>
                    <span>•</span>
                    <span>{details.runtime} min</span>
                  </>
                )}
                {rating && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <PiStarFill /> {rating}
                    </span>
                  </>
                )}
              </div>

              {/* 🎭 Genres */}
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

            {/* 💬 Overview / Bio */}
            {overview && (
              <div>
                <h2 className="mb-1 text-lg font-semibold">
                  {type === "person" ? "Biography" : "Overview"}
                </h2>
                <p className="max-w-3xl text-justify text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {overview}
                </p>
              </div>
            )}

            {/* ▶️ Trailer Button */}
            {trailerAvailable && (
              <div className="flex justify-center pt-2 lg:justify-start">
                <Link
                  to={`${pathname}/trailer`}
                  className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium shadow-md hover:from-purple-700 hover:to-indigo-700"
                >
                  <LuPlay className="text-base" /> Watch Trailer
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 🍿 Watch Providers */}
        {hasProviders && (
          <div className="rounded-xl bg-white/5 p-5 shadow-lg backdrop-blur-md">
            <h2 className="mb-4 text-xl font-semibold">Where to Watch</h2>
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
                        key={p.provider_id}
                        src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}
                        alt={p.provider_name}
                        title={p.provider_name}
                        className="h-12 w-12 rounded-lg shadow-md transition-transform hover:scale-110"
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 🌐 Translations */}
        {translations?.length > 0 && (
          <div className="rounded-xl bg-white/5 p-5 shadow-lg backdrop-blur-md">
            <h2 className="mb-4 text-xl font-semibold">Translated Languages</h2>
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

        {/* 👥 Cast */}
        {credits?.cast?.length > 0 && (
          <HorizontalCards
            data={credits.cast}
            title="Cast"
            detailsTitle="person"
          />
        )}

        {/* 🧩 Extra Sections (Seasons, Episodes, etc.) */}
        {extraSections
          .filter((s) => s.data && s.data.length > 0)
          .map(({ title, data, detailsTitle, parentId }) => (
            <HorizontalCards
              key={title}
              data={data}
              title={title}
              detailsTitle={detailsTitle}
              parentId={parentId}
            />
          ))}

        {/* 🎬 Recommendations */}
        {(recommendations?.length > 0 || similar?.length > 0) && (
          <HorizontalCards
            data={recommendations.length ? recommendations : similar}
            title={
              recommendations.length
                ? `Recommended ${type === "tv" ? "TV Shows" : "Movies"}`
                : `Similar ${type === "tv" ? "TV Shows" : "Movies"}`
            }
          />
        )}

        <Outlet />
      </div>
    </div>
  );
}
