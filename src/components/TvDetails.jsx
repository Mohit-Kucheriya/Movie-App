import { useLocation, useParams } from "react-router-dom";
import DetailsComponent from "./DetailsComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadTvDetails, removeTv } from "../store/actions/tvAction";

TvDetails.jsx;
export default function TvDetails() {
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
  } = useSelector((s) => s.tv.info);

  useEffect(() => {
    dispatch(loadTvDetails(id));
    return () => dispatch(removeTv());
  }, [id]);

  return details ? (
    <DetailsComponent
      type="tv"
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
          title: "Seasons",
          data: details?.seasons || [],
          detailsTitle: "season",
          parentId: details?.id,
        },
      ]}
      backPath="/tv"
      pathname={pathname}
    />
  ) : (
    <p className="p-10 text-center text-lg">Getting tv details...</p>
  );
}
