import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
import { UserService } from './../user/user.service';
import { SessionDocument } from './schemas/session.schema';
import { AuthCredentialsDto } from './dto/auth-creadentials.dto';
import { User } from '../user/schemas/user.schema';
export declare class AuthService {
    private userService;
    private jwtService;
    private sessionModel;
    constructor(userService: UserService, jwtService: JwtService, sessionModel: Model<SessionDocument>);
    getTokens(userId: string, email: string): Promise<Tokens>;
    updateRtHash(userId: string, refreshToken: string): Promise<void>;
    login(credentials: AuthCredentialsDto): Promise<Tokens>;
    validateUser(user: AuthCredentialsDto): Promise<User>;
    logout(userId: string): Promise<boolean>;
    refreshTokens(refreshToken: any): Promise<Tokens>;
}
