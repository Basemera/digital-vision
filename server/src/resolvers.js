module.exports = {
    Query: {
        shows: (_, __, { dataSources }) => dataSources.showAPI.getAllShows()
    }
}