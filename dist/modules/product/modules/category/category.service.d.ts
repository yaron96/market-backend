import { Model } from "mongoose";
import { ProductCategoryDocument } from "./schemas/category.schema";
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<ProductCategoryDocument>);
    getTree(): Promise<{
        _id: any;
        title: any;
        children: any;
    }>;
}
