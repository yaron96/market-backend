/// <reference types="multer" />
import { ObjectId } from 'mongoose';
import { Response } from 'express';
import { FileService } from '../file/file.service';
import { ImageService } from './image.service';
export declare class ImageController {
    private readonly imageService;
    private readonly fileService;
    constructor(imageService: ImageService, fileService: FileService);
    upload(images: Express.Multer.File[]): Promise<string[]>;
    getOriginal(res: Response, id: ObjectId): Promise<void>;
    getThumb(res: Response, id: ObjectId): Promise<void>;
}
