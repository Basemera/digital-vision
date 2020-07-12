const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const ShowAPI = require('./datasources/show');
const resolvers = require('./resolvers');

const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    dataSources: () => ({
        showAPI: new ShowAPI()
    }) 
});

server.listen().then(({ url }) => {
    console.log(`🔥 server is running baby at ${url}`);
})