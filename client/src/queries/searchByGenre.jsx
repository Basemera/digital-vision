import gql from "graphql-tag";


const SEARCH_BY_GENRE = gql`
    query shows($genre: String!){
        shows(genre: $genre) {
            id
            name
            images{
                medium
            }
        }        
    }
`;


export default SEARCH_BY_GENRE;