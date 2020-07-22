const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        password: String!
        shows: [Show]
    }

    type Show {
        id:ID!
        name: String
        url: String
        genre: [String]
        rating: Rating
        dateOfPremier: String
        status: String
        images:Image
        site: String
        summary: String
    }

    type ScheduledShow {
        id:ID!
        name: String
        url: String
        user: Int
        # dateOfPremier: String
        # schedule: Schedule
    }

    type Schedule {
        time: String
        days: [String]
    }
    type Rating {
        average: Average
    }

    type Average {
        average: Float
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
        shows (name: String, genre: String, rating: Float, premiere: String, status: String): [Show]
        show (id:Int): Show
        myShows: [MyShows]
        myFavs: [MyShows]

    }


    type MyShows {
        name: String
        url: String
        genre: [String]
        rating: Rating
        dateOfPremier: String
        status: String
        images:Image
        site: String
        summary: String
        showId: Int
    }

    type LoginObject {
        username: String
        token: String
    }

    input ShowInputIds {
        name: String
        showId: Int
        url: String
    }

    input ShowUpdateInputIds {
        showId: Int
    }

    type commentType {
        text: String,
        show: Int,
        user: Int,
        message: String
    }

    input commentInputType {
        showId: Int,
        comment: String
    }

    type Mutation{
        register (username: String, password: String): User,
        login (username: String, password: String): LoginObject,
        addShowToSchedule (showIds : [ShowInputIds] ): [ScheduledShow]
        setShowToWatched (showIds : [ShowUpdateInputIds] ): [ScheduledShow]
        setFavouriteShow (showIds : [ShowUpdateInputIds] ): [ScheduledShow]
        postCommentsOnShow (showId: Int, commentText: String): commentType
    }
`;

module.exports = typeDefs;