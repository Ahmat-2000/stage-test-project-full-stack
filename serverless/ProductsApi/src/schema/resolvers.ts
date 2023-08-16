//import DB from "../data";
import { GraphQLError } from "graphql";
import * as DB from "../dynamoDB/DB";
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getAllProduct: async () => {
            try {
              const products = await DB.getAllProductDB();
              if (!products) {
                throw new GraphQLError(`There is no products on the Database`,
                {extensions: { code: 'NO_PRODUCTS'}});
              }
              return products;
            } catch (error) {
              throw new GraphQLError('An error occurred while fetching all products.',
              {extensions: { code: 'DATABASE_ERROR'}});
            }
          },
        getProductById: async (parent, { productId }) => {
            try {
              const product = await DB.getProductByIdDB(productId);
              if (!product) {
                throw new GraphQLError(`Product with ID ${productId} not found.`,
                {extensions: { code: 'NOT_FOUND'}});
              }
              return product;
            } catch (error) {
              throw new GraphQLError('An error occurred while fetching the product by ID.',
              {extensions: { code: 'DATABASE_ERROR'}});
            }
          },
        getProductByName: async (parent, { productName }) => {
            try {
              const products = await DB.getProductByNameDB(productName);
              if (!products || products?.length === 0) {
                throw new GraphQLError(`No products found with name ${productName}.`,
                {extensions: { code: 'NOT_FOUND'}});
              }
              return products;
            } catch (error) {
              throw new GraphQLError('An error occurred while fetching the products by name.',
              {extensions: { code: 'DATABASE_ERROR'}});
            }
          },
        listTable: async () => {
            const res = await DB.list();
            return res?.Table?.TableName;
        }
    },
    Mutation: {
        addProduct: async (parent, { productInput }) => {
            try {
              const newProduct = await DB.addProductDB(productInput);
              if(newProduct) return "The product was successfully added.";
              throw new GraphQLError("The product was not added.",
                {extensions: { code: 'PRODUCT_NOT_ADDED'}});
            } catch (error) {
              throw new GraphQLError('An error occurred while adding the product.',
                {extensions: { code: 'DATABASE_ERROR'}});
            }
          },
        deleteProductById:async (parent,{productId}) => {
            try{
                const deleted = await DB.deleteProductByIdDB(productId);
                if(deleted) return "The product was deleted succefully";
                throw new GraphQLError(`The product was not deleted`,
                {extensions: { code: 'NOT_DELETED'}});
            }
            catch (error) {
                throw new GraphQLError('An error occurred while deleting the product.',
                {extensions: { code: 'DATABASE_ERROR'}});
            }
        },
        updateProductById: async (parent, { productId, productInput }) => {
            try{
                const updated = await DB.updateProductByIdDB(productId, productInput);
                if (updated) return "The product was updated successfully";
                throw new GraphQLError(`Product with id ${productId} not found`,
                {extensions: { code: 'NOT_FOUND'}});
            }
            catch (error) {
                throw new GraphQLError('An error occurred while updating the product.',
                {extensions: { code: 'DATABASE_ERROR'}});
            }
        },
        
    }
};
export default resolvers;
