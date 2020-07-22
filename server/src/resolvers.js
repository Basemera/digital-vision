module.exports = {
    Query: {
        shows: (_, { name, genre, status, premier, rating, id }, { dataSources }) => dataSources.showAPI.getShowByParameter({ name, genre, status, premier, rating, id }),
        show: (_, { id }, { dataSources }) => dataSources.showAPI.getShowById(id),
        myShows: (_, __, { dataSources }) => dataSources.userAPI.getUserScheduledShows(),
        myFavs: (_, __, { dataSources }) => dataSources.userAPI.getUserFavouriteShows(),

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
        register: async (_, { username, password }, { dataSources }) => dataSources.userAPI.registerUser({ username, password }),
        addShowToSchedule: async (_,  showIds, { dataSources }) => dataSources.userAPI.addShowToSchedule( showIds ),
        setShowToWatched: async (_,  showIds, { dataSources }) => dataSources.userAPI.setShowToWatched( showIds ),
        setFavouriteShow: async (_,  showIds, { dataSources }) => dataSources.userAPI.setFavouriteShow( showIds ),
        postCommentsOnShow: async (_,  { showId, commentText }, { dataSources }) => dataSources.userAPI.postCommentsOnShow( { showId, commentText, } ),


    }
}