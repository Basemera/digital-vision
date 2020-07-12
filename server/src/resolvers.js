module.exports = {
    Query: {
        shows: (_, __, { dataSources }) => dataSources.showAPI.getAllShows(),
        show: (_, { name }, { dataSources }) => dataSources.showAPI.getShowByName({ name }),
        showByGenre: (_, { genre }, { dataSources }) => dataSources.showAPI.getShowByGenre( { genre })
    }
}