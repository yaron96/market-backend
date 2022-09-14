import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductCategory, ProductCategoryDocument } from "./schemas/category.schema";

const ROOT_ID = "62eba509e002bdab77dd026c";

@Injectable()
export class CategoryService {
  constructor (
    @InjectModel(ProductCategory.name) private categoryModel: Model<ProductCategoryDocument>,
  ) {}

  async getTree() {
    const asArray = await this.categoryModel.find();
    const result = arrToTree(asArray);
    return result.children;
  }
}

function arrToTree(arr) {
  const rootNode = arr.find((item) => item._id == ROOT_ID);
  const result = initNode(rootNode)
  return result;

  function initNode(node) {
      const resultNode = {
        _id: node._id,
        title: node.title,
        children: node.children.map((id) => {
          const child = arr.find((item) => item._id == id.toString());
          return initNode(child);
      })};
      
      return resultNode;
  }
}