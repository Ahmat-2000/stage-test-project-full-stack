"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlHandler = void 0;
var server_1 = require("@apollo/server");
var aws_lambda_1 = require("@as-integrations/aws-lambda");
var type_defs_js_1 = require("./schema/type-defs.js");
var resolvers_js_1 = require("./schema/resolvers.js");
var server = new server_1.ApolloServer({
    typeDefs: type_defs_js_1.default,
    resolvers: resolvers_js_1.default,
});
// Configure the base path for your GraphQL API
//const GetAway = '/graphql';
// This final export is important!
exports.graphqlHandler = (0, aws_lambda_1.startServerAndCreateLambdaHandler)(server, 
// We will be using the Proxy V2 handler
aws_lambda_1.handlers.createAPIGatewayProxyEventV2RequestHandler());
//# sourceMappingURL=server.js.map