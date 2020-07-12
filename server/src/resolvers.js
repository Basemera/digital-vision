module.exports = {
    Query: {
        shows: (_, __, { dataSources }) => dataSources.showAPI.getAllShows(),
        show: (_, { name }, { dataSources }) => dataSources.showAPI.getShowByName({ name })
    }
}