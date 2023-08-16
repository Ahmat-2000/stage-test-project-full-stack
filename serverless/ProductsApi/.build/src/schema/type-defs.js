"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var typeDefs = "#graphql\n  type Product{\n    id: ID!\n    name: String!\n    price: Float!\n    quantity: Int!\n  }\n\n  type Query {\n    getAllProduct: [Product!]\n    getProductById(productId: ID!): Product\n    getProductByName(productName: String!): Product\n    listTable: String\n  }\n  input productInput{\n    name: String\n    price: Float\n    quantity: Int\n  }\n  type Mutation{\n    addProduct(productInput: productInput!): String!\n    deleteProductById(productId: ID!): String!\n    updateProductById(productId: ID!,productInput: productInput!): String!\n  }";
exports.default = typeDefs;
//# sourceMappingURL=type-defs.js.map