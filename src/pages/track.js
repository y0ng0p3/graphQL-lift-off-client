import React from "react";
import { gql, useQuery } from "@apollo/client";
import { QueryResult } from "../components";
import TrackDetail from "../components/track-detail";

const GET_TRACK = gql`
  query getTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
      description
      numberOfViews
      modules {
        id
        title
        length
      }
    }
  }
`;

const Track = ({ trackId }) => {
  const { loading, error, data } = useQuery(GET_TRACK, {
    variables: { trackId },
  });
  return (
    <QueryResult loading={loading} error={error} data={data}>
      <TrackDetail track={data?.track} />
    </QueryResult>
  );
};

export default Track;
