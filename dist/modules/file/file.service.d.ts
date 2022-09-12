/// <reference types="node" />
import { ObjectId } from "mongoose";
export declare enum FileType {
    IMAGE = "image",
    IMAGE_THUMB = "image/thumb"
}
export declare class FileService {
    constructor();
    createFile(type: FileType, fileName: string, fileBuffer: Buffer): Promise<void>;
    removeFile(type: FileType, id: ObjectId): Promise<void>;
    getPath(type: FileType, id: ObjectId): Promise<string>;
    findFilenameInDir(dirPath: string, query: ObjectId): Promise<string>;
}
