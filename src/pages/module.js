import React from "react";
const { useQuery, gql } = require("@apollo/client")
const { Layout, QueryResult, ModuleDetail } = require("../components")

/**
 * GET_MODULE_AND_PARENT_TRACK gql query to retrieve a specific module and its parent track,
 * both needed for the ModuleDetail component
 */
export const GET_MODULE_AND_PARENT_TRACK = gql`
    query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
        module(id: $moduleId) {
            id
            title
            content
            videoUrl
        }
        track(id: $trackId) {
            id
            title
            modules {
                id
                title
                durationInSeconds
            }
        }
    }
`

/**
 * Module page fetches both parent track and module's data from the gql query GET_MODULE_AND_PARENT_TRACK
 * and feeds them to the Module detail component
 */
const Module = ({ moduleId, trackId }) => {
    const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
        variables: { moduleId, trackId },
    });
    return <Layout fullWidth={true}>
        <QueryResult error={error} loading={loading} data={data}>
            <ModuleDetail track={data?.track} module={data?.module}/>
        </QueryResult>
    </Layout>
}

export default Module;