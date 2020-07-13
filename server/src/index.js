const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const ShowAPI = require('./datasources/show');
const resolvers = require('./resolvers');
const { createStore } = require('../utils');
// const { createStore } = require('./utils');
const UserAPI = require('./datasources/user');

const store = createStore();

const dataSources = () => ({
    showAPI: new ShowAPI(),
    userAPI: new UserAPI({ store })
  });

const context =  async ({ req }) => {
    const auth = req.headers && req.headers.authorization || '';
    // const password = req.body.password || '';
    const username = Buffer.from(auth, 'base64').toString('ascii');
    const user = await store.users.findOne({ where: { username: username } })
    return { user };
}

const server = new ApolloServer({ 
    typeDefs,
    context,
    resolvers,
    dataSources,
});

server.listen().then(({ url }) => {
    console.log(`🔥 server is running baby at ${url}`);
})