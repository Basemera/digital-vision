import gql from "graphql-tag";

const GET_USER_SCHEDULED_SHOWS = gql`
    query {
        myShows {
            name
            images{
                medium
            }
            showId
            url
            id
        }
    }
`

export default GET_USER_SCHEDULED_SHOWS;