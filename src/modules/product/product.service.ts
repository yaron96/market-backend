import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { PageDto } from 'shared/dto/page-dto';
import { PageOptionsDto } from 'shared/dto/page-options.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async getMany(options: PageOptionsDto): Promise<PageDto<Product>> {
    const filter = {};

    options.search && (filter['title'] = { $regex: options.search, $options: 'i' });

    options.category && (filter['category'] = options.category);

    options.minPrice && setMinRange('price', options.minPrice);
    options.maxPrice && setMaxRange('price', options.maxPrice);

    options.location && (filter['location'] = options.location);

    options.minBuilt && setMinRange('built', options.minBuilt);
    options.maxBuilt && setMaxRange('built', options.maxBuilt);

    options.minLength && setMinRange('length', options.minLength);
    options.maxLength && setMaxRange('length', options.maxLength);

    options.minBeam && setMinRange('beam', options.minBeam);
    options.maxBeam && setMaxRange('beam', options.maxBeam);

    function setMinRange(name: string, value: number) {
      filter[name] = {
        ...filter[name],
        $gte: value,
      };
    }

    function setMaxRange(name: string, value: number) {
      filter[name] = {
        ...filter[name],
        $lte: value,
      };
    }

    const data = await this.productModel
      .find(filter)
      .sort(options.sort)
      .skip(options.take * (options.page - 1))
      .limit(options.take)
      .populate('author', 'nickname')
      .populate('category', 'title')
      .populate({
        path: 'location',
        select: 'title',
        populate: {
          path: 'country',
          select: 'title',
        },
      });

    const itemCount = await this.productModel.count();

    const meta = {
      page: +options.page,
      take: +options.take,
      itemCount: itemCount,
    };

    return {
      data,
      meta,
    };
  }

  async getById(id: string): Promise<Product> {
    return await this.productModel
      .findById(id)
      .populate('author', 'nickname')
      .populate('category', 'title')
      .populate({
        path: 'location',
        select: 'title',
        populate: {
          path: 'country',
          select: 'title',
        },
      });
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    console.log(productDto);
    return this.productModel.create({
      ...productDto,
    });
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
