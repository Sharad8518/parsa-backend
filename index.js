const mongoose = require('mongoose')
const { typeDefs } = require('./schema/type-defs')
const { resolvers } = require('./schema/resolvers')

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const gql = require('graphql-tag');
const express = require('express');
const http = require('http');
const { PubSub } = require('graphql-subscriptions');

const connection = "mongodb+srv://Testsoft:soft123@cluster0.6ymbb.mongodb.net/rooti?authSource=admin&replicaSet=atlas-1x6vxn-shard-0&readPreference=primary&ssl=true";
mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Database Connected Successfully")).catch((err) => console.log(err));

(async function startApolloServer(typeDefs, resolvers) {
    // Required logic for integrating with Express
    const app = express();
    const httpServer = http.createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const pubsub = new PubSub();

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res, pubsub }),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                };
            }
        }],
    });

    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
        async onConnect(
            connectionParams,
            webSocket,
            context
        ) {
            console.log('Connected!');
            return {
                pubsub
            }
        },
        onDisconnect(webSocket, context) {
            console.log('Disconnected!')
        },
    }, {
        server: httpServer,
        path: server.graphqlPath,
    });


    await server.start();
    server.applyMiddleware({
        app,
    });
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

})(typeDefs, resolvers);