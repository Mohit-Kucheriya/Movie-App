import InfiniteList from "./InfiniteList";
import { fetchTrending } from "../utils/api";

export default function Trending() {
  return (
    <InfiniteList
      title="Trending"
      fetchData={fetchTrending}
      filtersConfig={[
        { name: "category", value: "all", options: ["all", "movie", "tv"] },
        { name: "duration", value: "day", options: ["day", "week"] },
      ]}
      cardType="trendingCard"
    />
  );
}
