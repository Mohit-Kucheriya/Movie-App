import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { loadPersonDetails, removePerson } from "../store/actions/personAction";
import { TiArrowBack } from "react-icons/ti";
import HorizontalCards from "../ui/HorizontalCards";

export default function PeopleDetails() {
  const [creditsType, setCreditsType] = useState("combined_credits");

  const { details, external_ids, combined_credits } = useSelector(
    (state) => state?.person?.info,
  );
  console.log(details);

  const movieCredits = combined_credits?.cast?.filter((item) =>
    item?.media_type?.includes("movie"),
  );

  const tvCredits = combined_credits?.cast?.filter((item) =>
    item?.media_type?.includes("tv"),
  );

  const { id } = useParams();
  const disptach = useDispatch();

  useEffect(() => {
    disptach(loadPersonDetails(id));

    return () => {
      disptach(removePerson());
    };
  }, [id]);

  return (
    <div className="relative min-h-screen w-full text-white">
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col gap-8 px-4 py-6 sm:px-8 md:px-12 lg:px-20">
        {/* Navbar */}
        <nav className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/people"
            className="flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <TiArrowBack className="text-base" />
            Back
          </Link>

          <div className="flex flex-wrap items-center gap-2">
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
                href={`https://www.imdb.com/name/${details?.imdb_id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-yellow-300"
              >
                IMDb
              </a>
            )}
          </div>
        </nav>

        {/* Person Info */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Poster */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${details?.profile_path}`}
              alt={details?.title}
              className="w-44 rounded-xl shadow-2xl sm:w-52 md:w-60 lg:w-64"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
                {details?.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                {details?.birthday && (
                  <span className="font-medium text-zinc-300">
                    {details.birthday}
                  </span>
                )}
                {details?.place_of_birth && (
                  <>
                    <span>•</span>
                    <span>{details.place_of_birth}</span>
                  </>
                )}
              </div>
            </div>

            {details?.known_for_department && (
              <p className="text-sm text-zinc-400 italic">
                {details.known_for_department}
              </p>
            )}

            {/* Overview */}
            {details?.biography && (
              <div className="">
                <h2 className="mb-1 text-lg font-semibold">Biography</h2>
                <p className="text-justify text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {details.biography}
                </p>
              </div>
            )}
          </div>
        </div>

        {/*Combined Credits */}
        {combined_credits?.cast?.length > 0 && (
          <HorizontalCards
            data={
              creditsType === "combined_credits"
                ? combined_credits.cast
                : creditsType === "movie_credits"
                  ? movieCredits
                  : tvCredits
            }
            title="Combined Credits"
            value={creditsType}
            onChangeSelect={setCreditsType}
            options={["combined_credits", "movie_credits", "tv_credits"]}
          />
        )}
      </div>
    </div>
  );
}
