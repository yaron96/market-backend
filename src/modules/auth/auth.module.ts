import { AtStrategy } from './strategies/at.strategy';
import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Session, SessionSchema } from "./schemas/session.schema";

@Module({
    controllers: [AuthController],
    providers: [AuthService, AtStrategy],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({}),
        MongooseModule.forFeature([
            {name: Session.name, schema: SessionSchema}
        ])
    ],
    exports: [AuthService],
})
export class AuthModule {}