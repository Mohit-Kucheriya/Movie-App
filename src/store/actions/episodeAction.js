export { removeEpisode } from "../reducers/episodeSlice";
import { loadEpisode } from "../reducers/episodeSlice";
import axios from "../../utils/axios";

export const loadEpisodeDetails =
  (tvId, seasonNumber, episodeNumber) => async (dispatch, getState) => {
    try {
      const res = await Promise.all([
        axios.get(
          `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`,
        ),
      ]);

      const [details] = res.map((r) => r);
      const ultimateData = {
        details: details?.data,
      };

      dispatch(loadEpisode(ultimateData));
    } catch (error) {
      console.log(error.message);
    }
  };
