// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Product{
    id: ID!
    name: String!
    price: Float!
    quantity: Int!
  }

  type Query {
    getAllProduct: [Product!]
    getProductById(productId: ID!): Product
    getProductByName(productName: String!): Product
    listTable: String
  }
  input productInput{
    name: String
    price: Float
    quantity: Int
  }
  type Mutation{
    addProduct(productInput: productInput!): String!
    deleteProductById(productId: ID!): String!
    updateProductById(productId: ID!,productInput: productInput!): String!
  }`; 
export default typeDefs;
  