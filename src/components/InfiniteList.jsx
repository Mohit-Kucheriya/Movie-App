import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import SelectDropdown from "../ui/SelectDropdown";
import { TiArrowBack } from "react-icons/ti";

export default function InfiniteList({
  title,
  fetchData,
  filtersConfig,
  cardType,
  detailsTitle,
}) {
  const [items, setItems] = useState([]);

  const [query, setQuery] = useState("");

  const q = query.toLowerCase();
  const filteredItems = items.filter((item) => {
    return (
      (item?.title ?? "").toLowerCase().includes(q) ||
      (item?.original_title ?? "").toLowerCase().includes(q) ||
      (item?.name ?? "").toLowerCase().includes(q)
    );
  });

  const [filters, setFilters] = useState(
    filtersConfig.reduce(
      (acc, curr) => ({ ...acc, [curr.name]: curr.value }),
      {},
    ),
  );
  const { category } = filters;

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    try {
      const results = await fetchData(filters, page);
      if (results.length > 0) {
        setItems((prev) => [...prev, ...results]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err.message);
      setHasMore(false);
    }
  };

  const refresh = () => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    loadMore();
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, [JSON.stringify(filters)]);

  // ✅ Main Render
  return (
    <div className="w-full overflow-x-hidden">
      <Link
        to="/"
        className="flex items-center gap-2 px-8 pt-4 text-sm font-medium text-zinc-400 transition-all hover:text-white"
      >
        <TiArrowBack className="text-lg" />
        Back to Home
      </Link>

      <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 bg-zinc-900/80 px-8 py-4 backdrop-blur-md transition-all duration-300">
        <h2 className="text-xl font-semibold text-zinc-100">
          {title}{" "}
          {category && (
            <span className="text-sm text-zinc-400">({category})</span>
          )}
        </h2>

        <div className="min-w-0 basis-full sm:basis-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-zinc-100 placeholder-zinc-400 transition-shadow outline-none focus:shadow-[0_4px_18px_rgba(2,6,23,0.6)] sm:w-[clamp(16rem,40vw,32rem)]"
            placeholder="Search"
          />
        </div>

        {filtersConfig.length > 0 && (
          <div className="flex gap-4">
            {filtersConfig.map(({ name, options }) => (
              <SelectDropdown
                key={name}
                value={filters[name]}
                onChangeSelect={(val) =>
                  setFilters((f) => ({ ...f, [name]: val }))
                }
                options={options}
              />
            ))}
          </div>
        )}
      </div>

      {/* ♾️ Infinite Scroll Section */}
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="py-6 text-center text-zinc-400">Loading...</div>
        }
        scrollThreshold={0.8}
        style={{ overflow: "visible" }}
      >
        <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <Card
              item={item}
              key={item.id + index}
              type={cardType}
              detailsTitle={detailsTitle || item.media_type || category}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
