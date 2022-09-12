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
exports.ImageSchema = exports.Image = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let Image = class Image {
};
__decorate([
    (0, mongoose_2.Prop)([{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }]),
    __metadata("design:type", Array)
], Image.prototype, "owners", void 0);
Image = __decorate([
    (0, mongoose_2.Schema)()
], Image);
exports.Image = Image;
exports.ImageSchema = mongoose_2.SchemaFactory.createForClass(Image);
//# sourceMappingURL=image.schema.js.map