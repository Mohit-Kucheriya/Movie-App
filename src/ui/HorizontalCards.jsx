export default function HorizontalCards({ data, title = "Trending" }) {
  return (
    <section className="w-full px-4 py-4">
      {/* Section Heading */}
      <h2 className="mb-4 text-xl font-semibold text-zinc-200">{title}</h2>

      {/* Scrollable Row */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="group relative min-w-[200px] max-w-[200px] flex-shrink-0 overflow-hidden rounded-xl bg-zinc-800 shadow-md transition-transform duration-300"
          >
            <div className="h-52 w-full overflow-hidden rounded-xl">
              {/* Image */}
              <img
                src={`https://image.tmdb.org/t/p/original${
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
              <h3 className="line-clamp-1 text-sm font-medium">
                {item.title || item.original_title || item.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-zinc-300">
                {item.overview || "No overview available"}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
