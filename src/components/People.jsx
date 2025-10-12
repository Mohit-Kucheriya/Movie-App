import InfiniteList from "./InfiniteList";
import { fetchPeople } from "../utils/api";

export default function Trending() {
  return (
    <InfiniteList
      title="People"
      fetchData={fetchPeople}
      filtersConfig={[]}
      cardType="peopleCard"
    />
  );
}
