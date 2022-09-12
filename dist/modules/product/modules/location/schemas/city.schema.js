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
exports.CitySchema = exports.City = void 0;
const country_schema_1 = require("./country.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let City = class City {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], City.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    }),
    __metadata("design:type", country_schema_1.Country)
], City.prototype, "country", void 0);
City = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], City);
exports.City = City;
exports.CitySchema = mongoose_1.SchemaFactory.createForClass(City);
//# sourceMappingURL=city.schema.js.map