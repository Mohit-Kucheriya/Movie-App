import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import NotFoundPage from "./NotFoundPage";

export default function Trailer() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const category = pathname.includes("/movie/") ? "movie" : "tv";
  const youtubeKey = useSelector((state) => state[category].info.videos);

  if (!youtubeKey?.key) return <NotFoundPage />;

  function handleBackToDetails() {
    const detailsPath = pathname.replace("/trailer", "");
    navigate(detailsPath);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md"
    >
      {/* Close Button */}
      <button
        onClick={handleBackToDetails}
        className="absolute top-6 right-6 flex items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
      >
        <IoClose className="text-2xl" />
      </button>

      <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${youtubeKey?.key}`}
          width="100%"
          height="100%"
          controls
          className="rounded-2xl"
        />
      </div>
    </motion.div>
  );
}
