// InfiniteList.js
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
}) {
  const [items, setItems] = useState([]);

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
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setHasMore(false);
      console.log(err.message);
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

  return items.length > 0 ? (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<div>Loading...</div>}
      scrollThreshold={0.8}
      style={{ overflow: "visible" }}
    >
      <div className="min-h-screen w-full overflow-x-hidden">
        <Link
          to="/"
          className="flex items-center gap-2 px-8 pt-4 text-sm text-zinc-400 transition-all hover:text-white"
        >
          <TiArrowBack className="text-lg" /> Back to Home
        </Link>

        <div className="sticky top-0 z-10 flex items-center justify-between bg-zinc-900/80 px-8 py-4 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-zinc-100">
            {title}{" "}
            {category && (
              <span className="text-sm text-zinc-400">({category})</span>
            )}
          </h2>

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

        <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card item={item} key={item.id + Math.random()} type={cardType} />
          ))}
        </div>
      </div>
    </InfiniteScroll>
  ) : (
    <p className="mx-auto max-w-2xl rounded-xl p-20 text-center text-xl font-medium text-zinc-200">
      Loading...
    </p>
  );
}
