import gql from "graphql-tag";


const SEARCH_BY_GENRE = gql`
    query show($genre: String!){
        show(name: $genre) {
            id
            name
            images{
                medium
            }
    }        
    }
`;


export default SEARCH_BY_GENRE;