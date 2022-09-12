import { ProductCategory, ProductCategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ProductCategory.name, schema: ProductCategorySchema}
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class ProductCategoryModule {}