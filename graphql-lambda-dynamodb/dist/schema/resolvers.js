import DB from "../data.js";
import _ from 'lodash';
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        getAllProduct: async () => {
            return DB;
        },
        getProductById: async (parent, { productId }) => {
            const id = Number(productId);
            const product = DB.find((value) => {
                return value.id === id;
            });
            return product;
        },
        getProductByName: async (parent, { productName }) => {
            const product = DB.find((value) => {
                return value.name === productName;
            });
            return product;
        }
    },
    Mutation: {
        addProduct: async (parent, { productInput }) => {
            const newId = DB.at(DB.length - 1).id + 1;
            const newProduct = {
                id: newId, quantity: Number(productInput.quantity),
                name: productInput.name, price: productInput.price
            };
            DB.push(newProduct);
            return "The product was succefully added";
        },
        deleteProductById: async (parent, { productId }) => {
            _.remove(DB, (item) => item.id === Number(productId));
            return "The product was deleted succefully";
        },
        deleteProductByName: async (parent, { productName }) => {
            _.remove(DB, (item) => item.name === productName);
            return "The product was deleted succefully";
        },
        updateProductByName: async (parent, { productName, productInput }) => {
            const indexToUpdate = _.findIndex(DB, item => item.name === productName);
            if (indexToUpdate !== -1) {
                DB[indexToUpdate] = _.assign(DB[indexToUpdate], productInput);
                return "The product was updated successfully";
            }
            return "Product not found";
        },
        updateProductById: async (parent, { productId, productInput }) => {
            const indexToUpdate = DB.findIndex(item => item.id === Number(productId));
            if (indexToUpdate !== -1) {
                DB[indexToUpdate] = {
                    ...DB[indexToUpdate],
                    ...productInput
                };
                return "The product was updated successfully";
            }
            return "Product not found";
        }
    }
};
export default resolvers;
