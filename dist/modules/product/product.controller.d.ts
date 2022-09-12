import { PageDto } from './../../shared/dto/page-dto';
import { PageOptionsDto } from './../../shared/dto/page-options.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
export declare class ProductController {
    private readonly productsService;
    constructor(productsService: ProductService);
    getAll(options: PageOptionsDto): Promise<PageDto<Product>>;
    getOne(id: string): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
}
