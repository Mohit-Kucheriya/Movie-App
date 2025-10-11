import InfiniteList from "./InfiniteList";
import { fetchMovie } from "../utils/api";

export default function Trending() {
  return (
    <InfiniteList
      title="Movie"
      fetchData={fetchMovie}
      filtersConfig={[
        {
          name: "category",
          value: "now_playing",
          options: ["now_playing", "popular", "top_rated", "upcoming"],
        },
      ]}
      cardType="trendingCard"
    />
  );
}
