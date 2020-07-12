const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        password: String!
        shows: [Show]
    }

    type Show {
        id:ID!
        name: String
        url: String
        genre: Genre
        rating: Rating
        dateOfPremier: String
        status: String
        images:[Image]
    }

    type Rating {
        average: Average
    }

    type Average {
        average: Int
    }

    type Season {
        id: ID!
        episodeOrder:Int
        url: String
        airDate: String
        image: Image
    }

    type Image {
        medium: String
        original: String
    }

    type Episode {
        id:ID!
        season: Season
        url: String
        airDate: String
        image: Image
    }

    type Person{
        id:ID!
        name: String
        url: String
        dateOfBirth: String
        gender: String
    }

    type Character {
        id: ID!
        name: String
        url: String
        image: Image
        type: String
    }

    type Cast {
        id: ID!
        person: Person
        character: Character
    }

    type Genre {
        id: ID!
        name: [String]
    }

    type Query{
        shows: [Show]!
        show (name: String): [Show]
        showByGenre (genre: String): [Show]
    }
`;

module.exports = typeDefs;