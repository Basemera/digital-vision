import gql from "graphql-tag";


const SEARCH_BY_NAME = gql`
    query show($name: String!){
        show(name: $name) {
            id
            name
            images{
                medium
            }
    }        
    }
`;


export default SEARCH_BY_NAME;