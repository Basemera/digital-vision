import gql from "graphql-tag";


const GET_SHOW_DETAILS = gql`
    query shows($id: Int!){
        show(id: $id) {
            id
            name
            images{
                medium
                original
            }
            summary
            genre
            rating{
                average{
                    average
                }
            }
            dateOfPremier
            status
        }        
    }
`;


export default GET_SHOW_DETAILS;