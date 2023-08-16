import { DescribeTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand ,QueryCommand, ScanCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import {v4 as uuidV4} from 'uuid';
import {Item} from '../types/type';

const client = new DynamoDBClient({
  endpoint:"http://localhost:8000"
});

const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "Products";

export const list = async () => {
  const command = new DescribeTableCommand({
    TableName: TABLE_NAME,
  });
  const response = await client.send(command);
  return response;
};
// Mutatons
const addProductDB = async (newProduct: Item) => {
  const id = uuidV4(); // Generate a new UUID
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: { ...newProduct, id: id }, // Merge newProduct with the generated id
  });
  try {
    const response = await docClient.send(command);
    return response;
  } catch (error) {
    throw new Error('An error occurred while adding the item to the database.');
  }
};

/**
 * Delete a movie from the table.
 */
 const deleteProductByIdDB = async (id: String) => {
  const deleteCommand = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id: id },
  });

  try {
    await client.send(deleteCommand);
    return "Product deleted.";
  } catch (error) {
    throw new Error('An error occurred while deleting the item from the database.');
  }
};

// Updating a single movie in the table.
const updateProductByIdDB = async (id: String, newProduct:Item) => {
  const updateCommand = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      id: id,
    },
    UpdateExpression: "SET #n = :newName, price = :price, quantity = :quantity",
    ExpressionAttributeNames: {
      '#n': 'name', // Using an expression attribute name for 'name'
    },
    ExpressionAttributeValues: {
      ":newName": newProduct.name,
      ":price": newProduct.price,
      ":quantity": newProduct.quantity
    },
    ReturnValues: "ALL_NEW",
  });
  try {
    const updateResponse = await docClient.send(updateCommand);
    return updateResponse.Attributes; // Use .Attributes to get the updated item
  } catch (error) {
    throw new Error('An error occurred while updating the item in the database.');
  }
};

// Queries
const getProductByIdDB = async (id: String) => {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "id = :idValue",
    ExpressionAttributeValues: {":idValue": id,},};
  try {
    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    // Assuming that the response.Items array contains only one item
    if (response.Items && response.Items.length > 0) {
      return response.Items[0];
    } else {
      return null; // Item not found
    }
  } catch (error) {
    throw new Error('An error occurred while querying the database.');
  }
};

const getAllProductDB = async () => {
  const command = new ScanCommand({
    ProjectionExpression: '#id, #n, #price, #quantity', // Use expression attribute names
    ExpressionAttributeNames: {
      '#id': 'id',
      '#n': 'name',
      '#price': 'price',
      '#quantity': 'quantity',
    },
    TableName: TABLE_NAME,
  });
  try {
    const response = await docClient.send(command);
    return response.Items;
  } catch (error) {
    throw new Error('An error occurred while querying the database.');
  }
};
const getProductByNameDB = async (productName: String) => {
  const queryByNameParams = {
    TableName: 'Products',
    IndexName: 'NameIndex', // GSI name
    KeyConditionExpression: '#prod_name = :nameValue',
    ExpressionAttributeNames: {"#prod_name": "name"},
    ExpressionAttributeValues: {
      ':nameValue': "Riz"
    }
  };
  try {
    const command = new QueryCommand(queryByNameParams);
    const response = await docClient.send(command);
    if (response.Items && response.Items.length > 0) {
      return response.Items[0];
    } else {
      return null; // Item not found
    }
  } catch (error) {
    throw new Error('An error occurred while scanning the database.');
  }
};

export { 
  addProductDB, 
  deleteProductByIdDB, 
  updateProductByIdDB,
  getAllProductDB,
  getProductByIdDB,
  getProductByNameDB
};