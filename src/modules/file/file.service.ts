import { Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import { ObjectId } from "mongoose";

export enum FileType {
  IMAGE = 'image',
  IMAGE_THUMB = 'image/thumb'
}

const STATIC_DIR_PATH = path.resolve(__dirname, '..', '..', '..', 'static')

@Injectable()
export class FileService {
  constructor() {}

  async createFile(
    type: FileType,
    fileName: string,
    fileBuffer: Buffer,
  ) {
    try {
      const filePath = path.resolve(STATIC_DIR_PATH, type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), fileBuffer);
    } catch (e) {
      console.log(e);
    }
  }

  async removeFile(
    type: FileType,
    id: ObjectId,
  ) {
    try {
      const filePath = await this.getPath(type, id)
      fs.rmSync(filePath);
    } catch (e) {
      console.log(e);
    }
  }

  async getPath(
    type: FileType,
    id: ObjectId,
  ) {
    const typeDirPath = path.join(STATIC_DIR_PATH, type);
    const fileName = await this.findFilenameInDir(typeDirPath, id);
    const pathToFile = path.join(typeDirPath,  fileName);
    return pathToFile;
  }

  async findFilenameInDir(dirPath: string, query: ObjectId) {
    const files = await fs.readdirSync(dirPath);
    const fileName = files.find((el) => el.includes(query.toString()));
    return fileName;
  }
}