import { useLocation, useParams } from "react-router-dom";
import DetailsComponent from "./DetailsComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadMovieDetails, removeMovie } from "../store/actions/movieAction";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const {
    details,
    external_ids,
    watchProviders,
    translations,
    recommendations,
    similar,
    videos,
    credits,
  } = useSelector((s) => s.movie.info);

  useEffect(() => {
    dispatch(loadMovieDetails(id));
    return () => dispatch(removeMovie());
  }, [id]);

  return details ? (
    <DetailsComponent
      type="movie"
      details={details}
      external_ids={external_ids}
      watchProviders={watchProviders}
      translations={translations}
      recommendations={recommendations}
      similar={similar}
      credits={credits}
      videos={videos}
      backPath="/movie"
      pathname={pathname}
    />
  ) : (
    <p className="p-10 text-center text-lg">Getting movie details...</p>
  );
}
