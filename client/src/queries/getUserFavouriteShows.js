import gql from "graphql-tag";

const GET_USER_FAVOURITE_SHOWS = gql`
    query {
        myFavs {
            name
            images{
                medium
            }
            showId
            url
        }
    }
`

export default GET_USER_FAVOURITE_SHOWS;