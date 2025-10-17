import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { loadSeasonDetails, removeSeason } from "../store/actions/seasonAction";
import { PiStarFill } from "react-icons/pi";
import { TiArrowBack } from "react-icons/ti";
import { SiWikidata } from "react-icons/si";
import { FaImdb } from "react-icons/fa";
import HorizontalCards from "../ui/HorizontalCards";

export default function SeasonDetails() {
  const { id, seasonNumber } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { details, external_ids, credits } = useSelector(
    (state) => state?.season?.info || {},
  );
  console.log(details);

  useEffect(() => {
    dispatch(loadSeasonDetails(id, seasonNumber));
    return () => dispatch(removeSeason());
  }, [id, seasonNumber]);

  if (!details)
    return (
      <p className="p-10 text-center text-lg">Getting season details...</p>
    );

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Content */}

      <div className="relative z-10 flex flex-col gap-8 px-4 py-8 sm:px-8 md:px-12 lg:px-20">
        {/* Navbar */}
        <nav className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to={`/tv/details/${id}`}
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            <TiArrowBack className="text-lg opacity-80" />
            <span className="hidden sm:inline">Back</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {external_ids?.wikidata_id && (
              <a
                href={`https://www.wikidata.org/wiki/${external_ids?.wikidata_id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-green-600/90 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-green-600"
              >
                <SiWikidata className="text-sm opacity-90" />
                Wikidata
              </a>
            )}
            {details?.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${details?.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-xs font-semibold text-yellow-300 transition-all hover:scale-[1.02] hover:bg-yellow-500/20"
              >
                <FaImdb className="text-base" />
                IMDb
              </a>
            )}
          </div>
        </nav>

        {/* Season Info */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="flex justify-center lg:justify-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
              alt={details?.name}
              className="w-44 rounded-xl shadow-2xl sm:w-52 md:w-60 lg:w-64"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                {details?.name}{" "}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                {details?.air_date && (
                  <span className="font-medium text-zinc-300">
                    {details.air_date.split("-")[0]}
                  </span>
                )}
                {details?.episodes.length > 0 && (
                  <>
                    <span>•</span>
                    <span className="font-medium text-zinc-300">
                      {details.episodes.length} Episodes
                    </span>
                  </>
                )}
                {details?.vote_average?.toFixed(1) > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 leading-0 text-yellow-400">
                      <PiStarFill /> {details.vote_average.toFixed(1)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {details?.overview && (
              <div>
                <h2 className="mb-1 text-lg font-semibold">Overview</h2>
                <p className="max-w-3xl text-justify text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {details.overview}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Cast */}
        {credits?.cast?.length > 0 && (
          <HorizontalCards
            data={credits.cast}
            title="Cast"
            detailsTitle="person"
          />
        )}

        {/* Episodes */}
        {details?.episodes?.length > 0 && (
          <HorizontalCards
            data={details.episodes}
            title="Episodes"
            detailsTitle="episode"
            parentId={id}
          />
        )}
      </div>
    </div>
  );
}
