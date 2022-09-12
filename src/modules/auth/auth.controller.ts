import { JwtPayload } from './types/jwt-payload.type';
import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { User } from './decorators/user.decorator';
import { AuthCredentialsDto } from './dto/auth-creadentials.dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() credentials: AuthCredentialsDto): Promise<Tokens> {
    return this.authService.login(credentials);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@User() user: JwtPayload): Promise<boolean> {
    return this.authService.logout(user.id);
  }


  @Post('refresh')
  async refreshTokens(@Query('token') refreshToken: string): Promise<any> {
    return this.authService.refreshTokens(refreshToken);
  }
  
}
