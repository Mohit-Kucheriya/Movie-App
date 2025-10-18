import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadEpisodeDetails,
  removeEpisode,
} from "../store/actions/episodeAction";
import { Link, useParams } from "react-router-dom";
import No_Image_Available from "/No_Image_Available.jpg";
import { TiArrowBack } from "react-icons/ti";
import { PiStarFill } from "react-icons/pi";

export default function EpisodeDetails() {
  const { id, seasonNumber, episodeNumber } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state?.episode?.info);

  const {
    name,
    air_date,
    runtime,
    vote_average,
    overview,
    still_path,
    season_number,
    episode_number,
    crew,
  } = details || {};

  const bgImage = still_path
    ? `https://image.tmdb.org/t/p/original${still_path}`
    : No_Image_Available;

  const directors = crew?.filter((member) => member.job === "Director") || [];
  const writers = crew?.filter((member) => member.job === "Writer") || [];

  useEffect(() => {
    dispatch(loadEpisodeDetails(id, seasonNumber, episodeNumber));

    return () => {
      dispatch(removeEpisode());
    };
  }, [id, seasonNumber, episodeNumber]);

  if (!details)
    return (
      <p className="p-10 text-center text-lg">Getting episode details...</p>
    );

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-10 px-4 py-8 sm:px-8 md:px-16 lg:px-24">
        {/* Navbar */}
        <nav className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to={-1}
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            <TiArrowBack className="text-lg opacity-80" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </nav>

        {/* Main Episode Info */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Poster */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={
                still_path
                  ? `https://image.tmdb.org/t/p/w500${still_path}`
                  : No_Image_Available
              }
              alt={name}
              className="w-44 rounded-xl shadow-2xl sm:w-52 md:w-60 lg:w-64"
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                {name}
              </h1>
              <p className="text-sm font-medium text-zinc-400">
                {season_number === 0
                  ? `Special • Episode ${episode_number}`
                  : `Season ${season_number} • Episode ${episode_number}`}
              </p>

              {/* Sub Info */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
                {air_date && (
                  <span>
                    <span className="font-medium text-white">Air Date:</span>{" "}
                    {air_date}
                  </span>
                )}
                {runtime && (
                  <>
                    <span>•</span>
                    <span>
                      <span className="font-medium text-white">Runtime:</span>{" "}
                      {runtime} min
                    </span>
                  </>
                )}
                {vote_average.toFixed(1) > 0 && (
                  <p>
                    <span className="flex items-center gap-1 leading-0 text-yellow-400">
                      <PiStarFill /> {details.vote_average.toFixed(1)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Overview */}
            {overview && (
              <div>
                <h2 className="mb-1 text-lg font-semibold text-white">
                  Overview
                </h2>
                <p className="max-w-3xl text-justify text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {overview}
                </p>
              </div>
            )}

            {/* Crew */}
            <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-300">
              {directors?.length > 0 && (
                <p>
                  <span className="font-semibold text-white">Director:</span>{" "}
                  {directors.map((d) => d.name).join(", ")}
                </p>
              )}
              {writers?.length > 0 && (
                <p>
                  <span className="font-semibold text-white">Writer:</span>{" "}
                  {writers.map((w) => w.name).join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
