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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const product_schema_1 = require("./schemas/product.schema");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async getMany(options) {
        const filter = {};
        options.category && (filter['category'] = options.category);
        options.minPrice && setMinRange('price', options.minPrice);
        options.maxPrice && setMaxRange('price', options.maxPrice);
        options.location && (filter['location'] = options.location);
        options.minBuilt && setMinRange('built', options.minBuilt);
        options.maxBuilt && setMaxRange('built', options.maxBuilt);
        options.minLength && setMinRange('length', options.minLength);
        options.maxLength && setMaxRange('length', options.maxLength);
        options.minBeam && setMinRange('beam', options.minBeam);
        options.maxBeam && setMaxRange('beam', options.maxBeam);
        function setMinRange(name, value) {
            filter[name] = Object.assign(Object.assign({}, filter[name]), { $gte: value });
        }
        function setMaxRange(name, value) {
            filter[name] = Object.assign(Object.assign({}, filter[name]), { $lte: value });
        }
        const data = await this.productModel
            .find(filter)
            .sort(options.sort)
            .skip(options.take * (options.page - 1))
            .limit(options.take)
            .populate('author', 'nickname')
            .populate('category', 'title')
            .populate({
            path: 'location',
            select: 'title',
            populate: {
                path: 'country',
                select: 'title',
            },
        });
        const itemCount = await this.productModel.count();
        const meta = {
            page: +options.page,
            take: +options.take,
            itemCount: itemCount,
        };
        return {
            data,
            meta,
        };
    }
    async getById(id) {
        return await this.productModel
            .findById(id)
            .populate('author', 'nickname')
            .populate('category', 'title')
            .populate({
            path: 'location',
            select: 'title',
            populate: {
                path: 'country',
                select: 'title',
            },
        });
    }
    async create(productDto) {
        console.log(productDto);
        return this.productModel.create(Object.assign({}, productDto));
    }
    async remove(id) {
        return this.productModel.findByIdAndDelete(id);
    }
    async update(id, productDto) {
        return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map