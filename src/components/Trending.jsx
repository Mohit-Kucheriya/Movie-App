import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import SelectDropdown from "../ui/SelectDropdown";
import { TiArrowBack } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleTrending = async () => {
    try {
      const { data } = await axios.get(
        `trending/${category}/${duration}?page=${page}`,
      );
      if (data.results.length > 0) {
        setTrending((prevTrending) => [...prevTrending, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const refreshTrending = () => {
    if (trending.length === 0) {
      handleTrending();
    } else {
      setTrending([]);
      setPage(1);
      handleTrending();
    }
  };

  useEffect(() => {
    refreshTrending();
  }, [category, duration]);

  function handleCategory(value) {
    setCategory(value);
  }

  function handleDuration(value) {
    setDuration(value);
  }

  return trending.length > 0 ? (
    <InfiniteScroll
      dataLength={trending.length}
      next={handleTrending}
      hasMore={hasMore}
      loader={
        <div className="">
          <h4 className="text-center text-zinc-400">Loading...</h4>
        </div>
      }
      scrollThreshold={0.8}
      style={{ overflow: "visible" }}
    >
      <div className="min-h-screen w-full overflow-x-hidden">
        <Link
          to="/"
          className="flex items-center gap-2 px-8 pt-4 text-sm text-zinc-400 transition-all hover:text-white"
        >
          <TiArrowBack className="text-lg" />
          Back to Home
        </Link>

        <div className="sticky top-0 z-10 flex items-center justify-between bg-zinc-900/80 px-8 py-4 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-zinc-100">Trending</h2>
          <div className="flex gap-4">
            <SelectDropdown
              value={category}
              onChangeSelect={handleCategory}
              options={["all", "movie", "tv"]}
            />
            <SelectDropdown
              value={duration}
              onChangeSelect={handleDuration}
              options={["day", "week"]}
            />
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {trending.map((item) => (
            <Card
              item={item}
              key={item.id + Math.random()}
              type="trendingCard"
            />
          ))}
        </div>
      </div>
    </InfiniteScroll>
  ) : (
    <p className="mx-auto max-w-2xl rounded-xl p-20 text-center text-xl font-medium text-zinc-200">
      No trending movies available
    </p>
  );
}
