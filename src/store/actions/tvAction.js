export { removeTv } from "../reducers/tvSlice";
import { loadTv } from "../reducers/tvSlice";
import axios from "../../utils/axios";

export const loadTvDetails = (id) => async (dispatch, getState) => {
  try {
    const res = await Promise.all([
      axios.get(`/tv/${id}`),
      axios.get(`/tv/${id}/external_ids`),
      axios.get(`/tv/${id}/recommendations`),
      axios.get(`/tv/${id}/similar`),
      axios.get(`/tv/${id}/videos`),
      axios.get(`/tv/${id}/watch/providers`),
      axios.get(`/tv/${id}/translations`),
      axios.get(`/tv/${id}/credits`),
    ]);

    const [
      details,
      external_ids,
      recommendations,
      similar,
      videos,
      watchProviders,
      translations,
      credits,
    ] = res.map((r) => r);

    const ultimateData = {
      details: details.data,
      external_ids: external_ids.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(
        (item) =>
          item.type === "Teaser" ||
          item.type === "Trailer" ||
          item.type === "Clip",
      ),
      watchProviders: watchProviders.data.results?.IN ?? null,
      translations: translations.data.translations.map((t) => t.name),
      credits: credits?.data,
    };

    dispatch(loadTv(ultimateData));
  } catch (error) {
    console.log(error.message);
  }
};
