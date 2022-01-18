import { ApolloServer } from "apollo-server-express";
import express from 'express';
import mongoose from 'mongoose';
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./resolvers/resolvers";
import { graphqlUploadExpress } from 'graphql-upload';

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
    uploads: false,
    subscriptions: { path: '/' }
  });

  app.use(graphqlUploadExpress());

  // app is from an existing express app
  server.applyMiddleware({
    app
  });

  await mongoose.connect('mongodb+srv://fadoni:s2B0ggwGp7pPJwBP@cluster0.jtttq.mongodb.net/EmailList?retryWrites=true&w=majority', {
    useNewUrlParser: true
  });

  app.listen(
    { port: 3000 }, 
    () => console.log(`Test Graphql at http://localhost:3000${server.graphqlPath}`)
  )
}

startServer();
