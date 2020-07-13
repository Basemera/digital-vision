const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const ShowAPI = require('./datasources/show');
const resolvers = require('./resolvers');
const { createStore } = require('../utils');
// const { createStore } = require('./utils');
const UserAPI = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({ 
    context: async ({ req }) => {
        const auth = req.headers && req.headers.authorization || '';
        const password = req.body.password || '';
        const username = Buffer.from(auth, 'base64').toString('ascii');
        const user = await store.users.findOrCreate({ where: { username: username, password: password } })
        // const user = UserAPI.validateUser({ username, password })
        return user;
    },
    typeDefs,
    resolvers,
    dataSources: () => ({
        showAPI: new ShowAPI(),
        userAPI: new UserAPI({ store })
    }) 
});

server.listen().then(({ url }) => {
    console.log(`🔥 server is running baby at ${url}`);
})