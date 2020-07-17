import gql from "graphql-tag";

const GET_ALL_SHOWS = gql`
    query {
        shows{
            id
            name
            images{
                medium
            }
            summary
        }
    }
`;
export default GET_ALL_SHOWS;