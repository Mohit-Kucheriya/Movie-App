import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tv from "./components/Tv";
import People from "./components/People";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";
import PeopleDetails from "./components/PeopleDetails";
import Trailer from "./components/Trailer";
import NotFoundPage from "./components/NotFoundPage";
import SeasonDetails from "./components/SeasonDetails";
import AboutPage from "./components/AboutPage";
import EpisodeDetails from "./components/EpisodeDetails";

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />

        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>

        <Route
          path="/tv/:id/season/:seasonNumber"
          element={<SeasonDetails />}
        />

        <Route
          path="/tv/:id/season/:seasonNumber/episode/:episodeNumber"
          element={<EpisodeDetails />}
        />

        <Route path="/people" element={<People />} />
        <Route path="/person/details/:id" element={<PeopleDetails />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
