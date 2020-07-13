module.exports = {
    Query: {
        shows: (_, __, { dataSources }) => dataSources.showAPI.getAllShows(),
        show: (_, { name }, { dataSources }) => dataSources.showAPI.getShowByName({ name }),
        showByGenre: (_, { genre }, { dataSources }) => dataSources.showAPI.getShowByGenre({ genre }),
        showByRating: (_, { rating }, { dataSources }) => dataSources.showAPI.getShowByRating( { rating }),
        showByPremiereDate: (_, { premiere }, { dataSources }) => dataSources.showAPI.getShowByPremiereDate( { premiere }),
        showByStatus: (_, { status }, { dataSources }) => dataSources.showAPI.getShowByStatus( { status }),

    }
}