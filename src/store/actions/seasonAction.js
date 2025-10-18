export { removeSeason } from "../reducers/seasonSlice";
import { loadSeason } from "../reducers/seasonSlice";
import axios from "../../utils/axios";

export const loadSeasonDetails =
  (id, seasonNumber) => async (dispatchEvent, getState) => {
    try {
      const res = await Promise.all([
        axios.get(`/tv/${id}/season/${seasonNumber}`),
        axios.get(`/tv/${id}/season/${seasonNumber}/credits`),
        axios.get(`/tv/${id}/season/${seasonNumber}/external_ids`),
        axios.get(`/tv/${id}/season/${seasonNumber}/videos`),
        axios.get(`/tv/${id}/season/${seasonNumber}/watch/providers`),
      ]);

      const [details, credits, external_ids] = res.map((r) => r);

      const ultimateData = {
        details: details.data,
        credits: credits?.data,
        external_ids: external_ids?.data,
      };

      dispatchEvent(loadSeason(ultimateData));
    } catch (error) {
      console.log("Error while loading season details", error);
    }
  };
