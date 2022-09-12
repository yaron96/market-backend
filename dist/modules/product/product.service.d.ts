import { Model } from 'mongoose';
import { PageDto } from 'shared/dto/page-dto';
import { PageOptionsDto } from 'shared/dto/page-options.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    getMany(options: PageOptionsDto): Promise<PageDto<Product>>;
    getById(id: string): Promise<Product>;
    create(productDto: CreateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
    update(id: string, productDto: UpdateProductDto): Promise<Product>;
}
