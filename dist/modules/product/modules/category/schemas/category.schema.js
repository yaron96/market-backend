"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategorySchema = exports.ProductCategory = void 0;
const product_schema_1 = require("./../../../schemas/product.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let ProductCategory = class ProductCategory {
};
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], ProductCategory.prototype, "title", void 0);
__decorate([
    (0, mongoose_2.Prop)([{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "ProductCategory"
        }]),
    __metadata("design:type", Array)
], ProductCategory.prototype, "children", void 0);
__decorate([
    (0, mongoose_2.Prop)([{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: product_schema_1.Product.name
        }]),
    __metadata("design:type", Array)
], ProductCategory.prototype, "products", void 0);
ProductCategory = __decorate([
    (0, mongoose_2.Schema)()
], ProductCategory);
exports.ProductCategory = ProductCategory;
exports.ProductCategorySchema = mongoose_2.SchemaFactory.createForClass(ProductCategory);
//# sourceMappingURL=category.schema.js.map