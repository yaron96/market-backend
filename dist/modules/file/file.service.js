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
exports.FileService = exports.FileType = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
var FileType;
(function (FileType) {
    FileType["IMAGE"] = "image";
    FileType["IMAGE_THUMB"] = "image/thumb";
})(FileType = exports.FileType || (exports.FileType = {}));
const STATIC_DIR_PATH = path.resolve(__dirname, '..', '..', '..', 'static');
let FileService = class FileService {
    constructor() { }
    async createFile(type, fileName, fileBuffer) {
        try {
            const filePath = path.resolve(STATIC_DIR_PATH, type);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            fs.writeFileSync(path.resolve(filePath, fileName), fileBuffer);
        }
        catch (e) {
            console.log(e);
        }
    }
    async removeFile(type, id) {
        try {
            const filePath = await this.getPath(type, id);
            fs.rmSync(filePath);
        }
        catch (e) {
            console.log(e);
        }
    }
    async getPath(type, id) {
        const typeDirPath = path.join(STATIC_DIR_PATH, type);
        const fileName = await this.findFilenameInDir(typeDirPath, id);
        const pathToFile = path.join(typeDirPath, fileName);
        return pathToFile;
    }
    async findFilenameInDir(dirPath, query) {
        const files = await fs.readdirSync(dirPath);
        const fileName = files.find((el) => el.includes(query.toString()));
        return fileName;
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map