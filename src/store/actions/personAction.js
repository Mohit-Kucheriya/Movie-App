export { removePerson } from "../reducers/personSlice";
import { loadPerson } from "../reducers/personSlice";
import axios from "../../utils/axios";

export const loadPersonDetails = (id) => async (dispatch, getState) => {
  try {
    const res = await Promise.all([
      axios.get(`/person/${id}`),
      axios.get(`/person/${id}/external_ids`),
      axios.get(`/person/${id}/combined_credits`),
    ]);

    const [details, external_ids, combined_credits] = res.map((r) => r);

    const ultimateData = {
      details: details?.data,
      external_ids: external_ids?.data,
      combined_credits: combined_credits?.data,
    };
    console.log(ultimateData);

    dispatch(loadPerson(ultimateData));
  } catch (error) {
    console.log(error.message);
  }
};
