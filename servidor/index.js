import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';

import typeDefs from './data/schema';
import resolvers from './data/db/resolvers/index';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const server = new ApolloServer({ schema });


server.applyMiddleware({app});

console.log(resolvers);
console.log(typeDefs);
app.listen({port: 8080}, () => console.log(`Server online http://localhost:8080${server.graphqlPath}`));

