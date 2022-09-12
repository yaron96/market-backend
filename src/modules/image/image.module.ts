import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from "@nestjs/common";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { Image, ImageSchema } from './schemas/image.schema';
import { FileModule } from '../file/file.module';

@Module({
  providers: [ImageService],
  controllers: [ImageController],
  imports: [
    MongooseModule.forFeature([
      {name: Image.name, schema: ImageSchema},
    ]),
    forwardRef(() => FileModule),
  ],
  exports: [ImageService],
})
export class ImageModule {}