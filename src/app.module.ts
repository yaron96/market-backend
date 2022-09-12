import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { ImageModule } from './modules/image/image.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    ProductModule,
    AuthModule,
    UserModule,
    ImageModule,
  ],
})
export class AppModule {}
