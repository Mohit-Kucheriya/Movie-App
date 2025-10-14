import InfiniteList from "./InfiniteList";
import { fetchPopular } from "../utils/api";

export default function Trending() {
  return (
    <InfiniteList
      title="Popular"
      fetchData={fetchPopular}
      filtersConfig={[
        { name: "category", value: "movie", options: ["movie", "tv"] },
      ]}
      cardType="trendingCard"
      
    />
  );
}
