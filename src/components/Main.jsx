import { useEffect, useState } from "react";
import axios from "../utils/axios";
import TopNav from "./TopNav";
import Header from "../ui/Header";
import HorizontalCards from "../ui/HorizontalCards";

export default function Main() {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);

  const handleWallpaper = async () => {
    try {
      const { data } = await axios.get(`trending/all/day`);
      let randomWallpaperData =
        data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomWallpaperData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleTrending = async () => {
    try {
      const { data } = await axios.get(`trending/all/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    !wallpaper && handleWallpaper();
  }, [wallpaper]);

  useEffect(() => {
    handleTrending();
  }, []);

  return (
    <main className="row-span-2 overflow-y-auto">
      <TopNav />
      <Header data={wallpaper} />
      <HorizontalCards data={trending} />
    </main>
  );
}
