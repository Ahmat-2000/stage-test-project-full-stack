"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductByNameDB = exports.getProductByIdDB = exports.getAllProductDB = exports.updateProductByIdDB = exports.deleteProductByIdDB = exports.addProductDB = exports.list = void 0;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var uuid_1 = require("uuid");
var client = new client_dynamodb_1.DynamoDBClient({
    endpoint: "http://localhost:8000"
});
var docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
var TABLE_NAME = "Products";
var list = function () { return __awaiter(void 0, void 0, void 0, function () {
    var command, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                command = new client_dynamodb_1.DescribeTableCommand({
                    TableName: TABLE_NAME,
                });
                return [4 /*yield*/, client.send(command)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
exports.list = list;
// Mutatons
var addProductDB = function (newProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var id, command, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = (0, uuid_1.v4)();
                command = new lib_dynamodb_1.PutCommand({
                    TableName: TABLE_NAME,
                    Item: __assign(__assign({}, newProduct), { id: id }), // Merge newProduct with the generated id
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, docClient.send(command)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response];
            case 3:
                error_1 = _a.sent();
                throw new Error('An error occurred while adding the item to the database.');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addProductDB = addProductDB;
/**
 * Delete a movie from the table.
 */
var deleteProductByIdDB = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteCommand, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deleteCommand = new lib_dynamodb_1.DeleteCommand({
                    TableName: TABLE_NAME,
                    Key: { id: id },
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.send(deleteCommand)];
            case 2:
                _a.sent();
                return [2 /*return*/, "Product deleted."];
            case 3:
                error_2 = _a.sent();
                throw new Error('An error occurred while deleting the item from the database.');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProductByIdDB = deleteProductByIdDB;
// Updating a single movie in the table.
var updateProductByIdDB = function (id, newProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var updateCommand, updateResponse, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateCommand = new lib_dynamodb_1.UpdateCommand({
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
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, docClient.send(updateCommand)];
            case 2:
                updateResponse = _a.sent();
                return [2 /*return*/, updateResponse.Attributes]; // Use .Attributes to get the updated item
            case 3:
                error_3 = _a.sent();
                throw new Error('An error occurred while updating the item in the database.');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProductByIdDB = updateProductByIdDB;
// Queries
var getProductByIdDB = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var params, command, response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    TableName: TABLE_NAME,
                    KeyConditionExpression: "id = :idValue",
                    ExpressionAttributeValues: { ":idValue": id, },
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                command = new lib_dynamodb_1.QueryCommand(params);
                return [4 /*yield*/, docClient.send(command)];
            case 2:
                response = _a.sent();
                // Assuming that the response.Items array contains only one item
                if (response.Items && response.Items.length > 0) {
                    return [2 /*return*/, response.Items[0]];
                }
                else {
                    return [2 /*return*/, null]; // Item not found
                }
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                throw new Error('An error occurred while querying the database.');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProductByIdDB = getProductByIdDB;
var getAllProductDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var command, response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                command = new lib_dynamodb_1.ScanCommand({
                    ProjectionExpression: '#id, #n, #price, #quantity',
                    ExpressionAttributeNames: {
                        '#id': 'id',
                        '#n': 'name',
                        '#price': 'price',
                        '#quantity': 'quantity',
                    },
                    TableName: TABLE_NAME,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, docClient.send(command)];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.Items];
            case 3:
                error_5 = _a.sent();
                throw new Error('An error occurred while querying the database.');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllProductDB = getAllProductDB;
var getProductByNameDB = function (productName) { return __awaiter(void 0, void 0, void 0, function () {
    var queryByNameParams, command, response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryByNameParams = {
                    TableName: 'Products',
                    IndexName: 'NameIndex',
                    KeyConditionExpression: '#prod_name = :nameValue',
                    ExpressionAttributeNames: { "#prod_name": "name" },
                    ExpressionAttributeValues: {
                        ':nameValue': "Riz"
                    }
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                command = new lib_dynamodb_1.QueryCommand(queryByNameParams);
                return [4 /*yield*/, docClient.send(command)];
            case 2:
                response = _a.sent();
                if (response.Items && response.Items.length > 0) {
                    return [2 /*return*/, response.Items[0]];
                }
                else {
                    return [2 /*return*/, null]; // Item not found
                }
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                throw new Error('An error occurred while scanning the database.');
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProductByNameDB = getProductByNameDB;
//# sourceMappingURL=DB.js.map