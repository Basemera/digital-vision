import gql from "graphql-tag";

const GET_ALL_SHOWS = gql`
    query {
        shows{
            name
            dateOfPremier
            summary
        }
    }
`;
export default GET_ALL_SHOWS;