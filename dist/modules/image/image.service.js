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
exports.ImageService = void 0;
const file_service_1 = require("./../file/file.service");
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const sharp = require("sharp");
const image_schema_1 = require("./schemas/image.schema");
let ImageService = class ImageService {
    constructor(imageModel, fileService) {
        this.imageModel = imageModel;
        this.fileService = fileService;
    }
    async create(imageFile) {
        const extension = imageFile.originalname.split('.').pop();
        const image = await this.imageModel.create({});
        const fileName = image._id + '.' + extension;
        await this.fileService.createFile(file_service_1.FileType.IMAGE, fileName, imageFile.buffer);
        const thumbBuffer = await sharp(imageFile.buffer)
            .resize({
            width: 250,
            height: 250,
            fit: sharp.fit.inside,
        })
            .toBuffer();
        await this.fileService.createFile(file_service_1.FileType.IMAGE_THUMB, fileName, thumbBuffer);
        return image._id;
    }
    async createMany(imageFiles) {
        const result = await Promise.all(imageFiles.map((file) => this.create(file)));
        return result;
    }
    async delete(id) {
        await this.fileService.removeFile(file_service_1.FileType.IMAGE, id);
        await this.fileService.removeFile(file_service_1.FileType.IMAGE_THUMB, id);
        await this.imageModel.findByIdAndDelete(id);
        return id;
    }
    async addOwner(imageId, ownerId) {
        await this.imageModel.findByIdAndUpdate(imageId, {
            $push: { owners: ownerId },
        });
    }
    async removeOwner(imageId, ownerId) {
        const image = await this.imageModel.findById(imageId);
        image.owners = image.owners.filter((id) => id != ownerId);
        if (image.owners.length) {
            await image.save();
        }
        else {
            await this.delete(imageId);
        }
    }
};
ImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(image_schema_1.Image.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        file_service_1.FileService])
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map