import { useLocation, useParams } from "react-router-dom";
import DetailsComponent from "./DetailsComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadSeasonDetails, removeSeason } from "../store/actions/seasonAction";

export default function SeasonDetails() {
  const { id, seasonNumber } = useParams();
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
  } = useSelector((s) => s.season.info);

  useEffect(() => {
    dispatch(loadSeasonDetails(id, seasonNumber));
    return () => dispatch(removeSeason());
  }, [id, seasonNumber]);

  return details ? (
    <DetailsComponent
      type="season"
      details={details}
      external_ids={external_ids}
      watchProviders={watchProviders}
      translations={translations}
      recommendations={recommendations}
      similar={similar}
      credits={credits}
      videos={videos}
      extraSections={[
        {
          title: "Episodes",
          data: details?.episodes || [],
          detailsTitle: "episode",
          parentId: id,
        },
      ]}
      backPath={`/tv/details/${id}`}
      pathname={pathname}
    />
  ) : (
    <p className="p-10 text-center text-lg">Getting season details...</p>
  );
}
