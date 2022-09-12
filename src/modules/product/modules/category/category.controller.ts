import { Controller, Get } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('/product-category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getTree();
  }
}