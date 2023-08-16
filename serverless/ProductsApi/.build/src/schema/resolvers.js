"use strict";
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
//import DB from "../data";
var graphql_1 = require("graphql");
var DB = require("../dynamoDB/DB");
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
var resolvers = {
    Query: {
        getAllProduct: function () { return __awaiter(void 0, void 0, void 0, function () {
            var products, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB.getAllProductDB()];
                    case 1:
                        products = _a.sent();
                        if (!products) {
                            throw new graphql_1.GraphQLError("There is no products on the Database", { extensions: { code: 'NO_PRODUCTS' } });
                        }
                        return [2 /*return*/, products];
                    case 2:
                        error_1 = _a.sent();
                        throw new graphql_1.GraphQLError('An error occurred while fetching all products.', { extensions: { code: 'DATABASE_ERROR' } });
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        getProductById: function (parent, _a) {
            var productId = _a.productId;
            return __awaiter(void 0, void 0, void 0, function () {
                var product, error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, DB.getProductByIdDB(productId)];
                        case 1:
                            product = _b.sent();
                            if (!product) {
                                throw new graphql_1.GraphQLError("Product with ID ".concat(productId, " not found."), { extensions: { code: 'NOT_FOUND' } });
                            }
                            return [2 /*return*/, product];
                        case 2:
                            error_2 = _b.sent();
                            throw new graphql_1.GraphQLError('An error occurred while fetching the product by ID.', { extensions: { code: 'DATABASE_ERROR' } });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        getProductByName: function (parent, _a) {
            var productName = _a.productName;
            return __awaiter(void 0, void 0, void 0, function () {
                var products, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, DB.getProductByNameDB(productName)];
                        case 1:
                            products = _b.sent();
                            if (!products || (products === null || products === void 0 ? void 0 : products.length) === 0) {
                                throw new graphql_1.GraphQLError("No products found with name ".concat(productName, "."), { extensions: { code: 'NOT_FOUND' } });
                            }
                            return [2 /*return*/, products];
                        case 2:
                            error_3 = _b.sent();
                            throw new graphql_1.GraphQLError('An error occurred while fetching the products by name.', { extensions: { code: 'DATABASE_ERROR' } });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        listTable: function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, DB.list()];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, (_a = res === null || res === void 0 ? void 0 : res.Table) === null || _a === void 0 ? void 0 : _a.TableName];
                }
            });
        }); }
    },
    Mutation: {
        addProduct: function (parent, _a) {
            var productInput = _a.productInput;
            return __awaiter(void 0, void 0, void 0, function () {
                var newProduct, error_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, DB.addProductDB(productInput)];
                        case 1:
                            newProduct = _b.sent();
                            if (newProduct)
                                return [2 /*return*/, "The product was successfully added."];
                            throw new graphql_1.GraphQLError("The product was not added.", { extensions: { code: 'PRODUCT_NOT_ADDED' } });
                        case 2:
                            error_4 = _b.sent();
                            throw new graphql_1.GraphQLError('An error occurred while adding the product.', { extensions: { code: 'DATABASE_ERROR' } });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        deleteProductById: function (parent, _a) {
            var productId = _a.productId;
            return __awaiter(void 0, void 0, void 0, function () {
                var deleted, error_5;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, DB.deleteProductByIdDB(productId)];
                        case 1:
                            deleted = _b.sent();
                            if (deleted)
                                return [2 /*return*/, "The product was deleted succefully"];
                            throw new graphql_1.GraphQLError("The product was not deleted", { extensions: { code: 'NOT_DELETED' } });
                        case 2:
                            error_5 = _b.sent();
                            throw new graphql_1.GraphQLError('An error occurred while deleting the product.', { extensions: { code: 'DATABASE_ERROR' } });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        updateProductById: function (parent, _a) {
            var productId = _a.productId, productInput = _a.productInput;
            return __awaiter(void 0, void 0, void 0, function () {
                var updated, error_6;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, DB.updateProductByIdDB(productId, productInput)];
                        case 1:
                            updated = _b.sent();
                            if (updated)
                                return [2 /*return*/, "The product was updated successfully"];
                            throw new graphql_1.GraphQLError("Product with id ".concat(productId, " not found"), { extensions: { code: 'NOT_FOUND' } });
                        case 2:
                            error_6 = _b.sent();
                            throw new graphql_1.GraphQLError('An error occurred while updating the product.', { extensions: { code: 'DATABASE_ERROR' } });
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map