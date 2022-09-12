import { ObjectId } from 'mongoose';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { FileService, FileType } from '../file/file.service';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  upload(@UploadedFiles() images: Express.Multer.File[]): Promise<string[]> {
    return this.imageService.createMany(images);
  }

  @Get(':id')
  async getOriginal(@Res() res: Response, @Param('id') id: ObjectId) {
    const filepath = await this.fileService.getPath(FileType.IMAGE, id);
    const file = createReadStream(filepath);
    file.pipe(res);
  }

  @Get('thumb/:id')
  async getThumb(@Res() res: Response, @Param('id') id: ObjectId) {
    const filepath = await this.fileService.getPath(FileType.IMAGE_THUMB, id);
    const file = createReadStream(filepath);
    file.pipe(res);
  }
}
