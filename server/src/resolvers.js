module.exports = {
    Query: {
        shows: (_, __, { dataSources }) => dataSources.showAPI.getAllShows(),
        show: (_, { name }, { dataSources }) => dataSources.showAPI.getShowByName({ name }),
        showByGenre: (_, { genre }, { dataSources }) => dataSources.showAPI.getShowByGenre( { genre }),
        showByRating: (_, { rating }, { dataSources }) => dataSources.showAPI.getShowByRating( { rating }),
        showByPremiereDate: (_, { premiere }, { dataSources }) => dataSources.showAPI.getShowByPremiereDate( { premiere }),
        showByStatus: (_, { status }, { dataSources }) => dataSources.showAPI.getShowByStatus( { status }),

    },

    Mutation: {
        login: async (_, { username, password }, { dataSources }) => {
            const user = await dataSources.userAPI.login({ username: username, password: password });
            if (user) {
                const res = {
                    username: user.username,
                    token: Buffer.from(user.username).toString('base64')
                };
                return res;
            }
            return [];
        },
        register: async (_, { username, password }, { dataSources }) => dataSources.userAPI.registerUser({ username, password })
    }
}