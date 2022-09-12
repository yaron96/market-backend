import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './../auth/guards/auth.guard';
import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import { UserRegisterDto } from './../auth/dto/user-register.dto';
import { JwtPayload, Tokens } from '../auth/types';
import { User } from '../auth/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async registation(@Body() body: UserRegisterDto): Promise<Tokens> {
    const newUser = await this.userService.createUser(body);
    const tokens = await this.authService.getTokens(newUser.id, newUser.email);
    return tokens;
  }

  @Get('me')
  @UseGuards(LocalAuthGuard)
  async me(@User() user: JwtPayload) {
    const me = await this.userService.findUserById(user.id);
    return {
      nickname: me.nickname,
      email: me.email,
      _id: me._id
    };
  }

}
