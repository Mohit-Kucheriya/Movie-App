import { useEffect, useState } from "react";
import { RiSearchLine, RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import No_Image_Available from "/No_Image_Available.jpg";

export default function TopNav() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const handleSearch = async () => {
      if (!query.trim()) return setResults([]);
      try {
        const { data } = await axios.get(`/search/movie?query=${query}`);
        setResults(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [query]);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header className="h-16 bg-transparent">
      <form className="mx-auto mt-2 w-full max-w-2xl px-2">
        <div className="relative">
          {/* search icon */}
          <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            <RiSearchLine className="text-xl text-zinc-400" />
          </div>

          {/* input */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search movies, actors, genres..."
            className="w-full rounded-md py-2 pr-12 pl-12 text-zinc-100 placeholder-zinc-400 transition-shadow outline-none focus:shadow-[0_4px_18px_rgba(2,6,23,0.6)]"
          />

          {/* clear button */}
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 focus:outline-none"
            >
              <RiCloseLargeFill className="text-xl text-zinc-300" />
            </button>
          )}

          {/* dropdown */}
          {query.length > 0 && (
            <div className="absolute inset-x-0 top-full z-50 mt-2 max-h-96 overflow-auto rounded-lg bg-zinc-800/95 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col divide-y divide-zinc-700">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    className="group flex items-start gap-4 px-4 py-3 transition-all hover:bg-zinc-700/50"
                  >
                    {/* Movie Image */}
                    <div className="relative flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={
                          result.backdrop_path || result.poster_path
                            ? `https://image.tmdb.org/t/p/original${
                                result.backdrop_path || result.poster_path
                              }`
                            : No_Image_Available
                        }
                        className="h-28 w-28 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                        alt={result.original_title || result.title}
                      />
                    </div>

                    {/* Movie Info */}
                    <div className="flex flex-col">
                      <h3 className="mb-1 text-base font-semibold text-zinc-100">
                        {result.original_title || result.title}
                      </h3>

                      <p
                        className={`text-sm leading-snug text-zinc-300 ${
                          expanded[result.id]
                            ? ""
                            : "line-clamp-2 overflow-hidden"
                        }`}
                      >
                        {result.overview || "No overview available"}
                      </p>

                      {result.overview && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleReadMore(result.id);
                          }}
                          className="mt-1 text-xs text-zinc-400 transition-colors hover:text-zinc-200"
                        >
                          {expanded[result.id] ? "Read less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </Link>
                ))}

                {results.length === 0 && (
                  <div className="px-4 py-6 text-center text-zinc-400">
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </form>
    </header>
  );
}
