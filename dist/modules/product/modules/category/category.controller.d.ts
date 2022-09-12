import { CategoryService } from "./category.service";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAll(): Promise<{
        _id: any;
        title: any;
        children: any;
    }>;
}
