import gql from "graphql-tag";

const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password) {
            username,
            token
        }        
    }
`;
export default LOGIN;