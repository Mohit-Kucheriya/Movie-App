import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import tvReducer from "./reducers/tvSlice";
import personReducer from "./reducers/personSlice";
import seasonReducer from "./reducers/seasonSlice";
import episodeReducer from "./reducers/episodeSlice";

export default configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: personReducer,
    season: seasonReducer,
    episode: episodeReducer,
  },
});
