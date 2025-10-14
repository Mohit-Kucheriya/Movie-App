import InfiniteList from "./InfiniteList";
import { fetchTv } from "../utils/api";

export default function Trending() {
  return (
    <InfiniteList
      title="Tv Shows"
      fetchData={fetchTv}
      filtersConfig={[
        {
          name: "category",
          value: "airing_today",
          options: ["airing_today", "on_the_air", "popular", "top_rated"],
        },
      ]}
      cardType="trendingCard"
      detailsTitle="tv"
    />
  );
}
