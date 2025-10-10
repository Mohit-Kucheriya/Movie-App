import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import SelectDropdown from "../ui/SelectDropdown";
import { TiArrowBack } from "react-icons/ti";

export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");

  useEffect(() => {
    const handleTrending = async () => {
      try {
        const { data } = await axios.get(`trending/${category}/${duration}`);
        setTrending(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    handleTrending();
  }, [category, duration]);

  function handleCategory(value) {
    setCategory(value);
  }

  function handleDuration(value) {
    setDuration(value);
  }

  return trending.length > 0 ? (
    <div className="h-screen w-screen overflow-hidden overflow-y-auto">
      <Link
        to="/"
        className="flex cursor-pointer items-center gap-1.5 px-8 pt-4 text-purple-600 transition-colors duration-300 hover:text-purple-700"
      >
        <TiArrowBack /> Back to Home
      </Link>
      <div className="flex items-center justify-between px-8 py-4">
        <h2 className="text-xl font-semibold text-zinc-200">Trending</h2>

        <div className="flex gap-4">
          {/* CATEGORY */}
          <SelectDropdown
            value={category}
            onChangeSelect={handleCategory}
            options={["all", "movie", "tv"]}
          />

          {/* DURATION */}
          <SelectDropdown
            value={duration}
            onChangeSelect={handleDuration}
            options={["day", "week"]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        {trending.map((item) => (
          <Card item={item} key={item.id} type="trendingCard" />
        ))}
      </div>
    </div>
  ) : (
    <p className="mx-auto max-w-2xl rounded-xl p-20 text-center text-xl font-medium text-zinc-200">
      No trending movies available
    </p>
  );
}
