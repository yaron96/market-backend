import { JwtPayload } from './types/jwt-payload.type';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-creadentials.dto';
import { Tokens } from './types';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(credentials: AuthCredentialsDto): Promise<Tokens>;
    logout(user: JwtPayload): Promise<boolean>;
    refreshTokens(refreshToken: string): Promise<any>;
}
