import gql from "graphql-tag";

const GET_USER_SCHEDULED_SHOWS = gql`
    query {
        shows()
    }
`