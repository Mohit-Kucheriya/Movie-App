import { useEffect, useState } from "react";
import TopNav from "./TopNav";
import Header from "../ui/Header";
import HorizontalCards from "../ui/HorizontalCards";
import { fetchTrendingAll } from "../utils/api";

export default function Main() {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const handleWallpaper = async () => {
      try {
        const data = await fetchTrendingAll();

        let randomWallpaperData =
          data.results[Math.floor(Math.random() * data.results.length)];
        setWallpaper(randomWallpaperData);
      } catch (error) {
        console.log(error.message);
      }
    };

    !wallpaper && handleWallpaper();
  }, [wallpaper]);

  useEffect(() => {
    const handleTrending = async () => {
      try {
        const data = await fetchTrendingAll();
        setTrending(data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    handleTrending();
  }, []);

  return (
    <main
      id="mainScroll"
      className="row-span-2 min-h-0 w-full overflow-x-hidden overflow-y-auto"
    >
      <TopNav />
      <Header data={wallpaper} />
      <HorizontalCards data={trending} />
    </main>
  );
}
