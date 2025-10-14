export { removeMovie } from "../reducers/movieSlice";
import { loadMovie } from "../reducers/movieSlice";
import axios from "../../utils/axios";

export const loadMovieDetails = (id) => async (dispatch, getState) => {
  try {
    const res = await Promise.all([
      axios.get(`/movie/${id}`),
      axios.get(`/movie/${id}/external_ids`),
      axios.get(`/movie/${id}/recommendations`),
      axios.get(`/movie/${id}/similar`),
      axios.get(`/movie/${id}/videos`),
      axios.get(`/movie/${id}/watch/providers`),
      axios.get(`movie/${id}/translations`),
    ]);

    const [
      details,
      external_ids,
      recommendations,
      similar,
      videos,
      watchProviders,
      translations,
    ] = res.map((r) => r);

    const ultimateData = {
      details: details.data,
      external_ids: external_ids.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos:
        videos.data.results.find((item) => item.type === "Trailer") || null,
      watchProviders: watchProviders.data.results?.IN ?? null,
      translations:
        translations.data.translations.map(t=> t.name)|| null,
    };
    console.log(ultimateData);

    dispatch(loadMovie(ultimateData));
  } catch (error) {
    console.log(error.message);
  }
};
