import { LocationModule } from './modules/location/location.module';
import { ProductCategoryModule } from './modules/category/category.module';
import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { ImageModule } from '../image/image.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([
      {name: Product.name, schema: ProductSchema}
    ]),
    forwardRef(() => ImageModule),
    ProductCategoryModule,
    LocationModule,
  ]
})
export class ProductModule {}