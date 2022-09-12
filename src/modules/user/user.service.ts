import { UserRegisterDto } from './../auth/dto/user-register.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: UserRegisterDto) {
    const isExist = await this.userModel.findOne({
      email: user.email,
    });

    if (isExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const created = await this.userModel.create({
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
    });

    return created;
  }

  async findUserById(id: string): Promise<User> {
    const found = await this.userModel.findById(id);
    return found;
  }

  async findUserByEmail(email: string): Promise<User> {
    const found = await this.userModel.findOne({email});
    return found;
  }
}
