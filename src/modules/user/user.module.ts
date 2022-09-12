import { AuthModule } from './../auth/auth.module';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from "@nestjs/common";
import { UserService } from './user.service';
import { UserController } from "./user.controller";

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        forwardRef(() => AuthModule),
    ],
    exports: [UserService],
})
export class UserModule {}