import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';
import typeDefs from './schema/type-defs.js';
import resolvers from './schema/resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// Configure the base path for your GraphQL API
//const GetAway = '/graphql';
// This final export is important!
export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);
