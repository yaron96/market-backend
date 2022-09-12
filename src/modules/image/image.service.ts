import { FileService, FileType } from './../file/file.service';
import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as sharp from 'sharp';
import { Image, ImageDocument } from './schemas/image.schema';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name)
    private imageModel: Model<ImageDocument>,
    private fileService: FileService,
  ) {}

  async create(imageFile: Express.Multer.File): Promise<string> {
    const extension = imageFile.originalname.split('.').pop();
    const image = await this.imageModel.create({});
    const fileName = image._id + '.' + extension;

    await this.fileService.createFile(
      FileType.IMAGE,
      fileName,
      imageFile.buffer,
    );

    const thumbBuffer = await sharp(imageFile.buffer)
      .resize({
        width: 250,
        height: 250,
        fit: sharp.fit.inside,
      })
      .toBuffer();
    await this.fileService.createFile(
      FileType.IMAGE_THUMB,
      fileName,
      thumbBuffer,
    );

    return image._id;
  }

  async createMany(imageFiles: Express.Multer.File[]): Promise<string[]> {
    const result = await Promise.all(
      imageFiles.map((file) => this.create(file)),
    );
    return result;
  }

  async delete(id: ObjectId) {
    await this.fileService.removeFile(FileType.IMAGE, id);
    await this.fileService.removeFile(FileType.IMAGE_THUMB, id);
    await this.imageModel.findByIdAndDelete(id);
    return id;
  }

  async addOwner(imageId: ObjectId, ownerId: ObjectId) {
    await this.imageModel.findByIdAndUpdate(imageId, {
      $push: { owners: ownerId },
    });
  }

  async removeOwner(imageId, ownerId) {
    const image = await this.imageModel.findById(imageId);
    image.owners = image.owners.filter((id) => id != ownerId);
    if (image.owners.length) {
      await image.save();
    } else {
      await this.delete(imageId);
    }
  }
}
