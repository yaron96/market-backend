import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import { UserRegisterDto } from './../auth/dto/user-register.dto';
import { JwtPayload, Tokens } from '../auth/types';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    registation(body: UserRegisterDto): Promise<Tokens>;
    me(user: JwtPayload): Promise<{
        nickname: string;
        email: string;
        _id: string;
    }>;
}
