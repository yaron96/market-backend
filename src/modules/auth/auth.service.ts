import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens, JwtPayload } from './types';
import { UserService } from './../user/user.service';
import { Session, SessionDocument } from './schemas/session.schema';
import { AuthCredentialsDto } from './dto/auth-creadentials.dto';
import { User } from '../user/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>
  ) {}

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload: JwtPayload = { id: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.ACCESS_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.REFRESH_EXPIRES_IN,
      }),
    ]);

    await this.updateRtHash(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  async updateRtHash(userId: string, refreshToken: string) {
    const session = await this.sessionModel.findOne({
      user: { _id: userId },
    });

    if (session) {
      await this.sessionModel.findByIdAndUpdate(
        session.id,
        { refreshToken },
      );
    } else {
      const user = await this.userService.findUserById(userId);
      this.sessionModel.create({
        user,
        refreshToken,
      });
    }
  }

  async login(credentials: AuthCredentialsDto): Promise<Tokens> {
    const user = await this.validateUser(credentials);
    const tokens = await this.getTokens(user._id, user.email);
    return tokens;
  }

  async validateUser(user: AuthCredentialsDto): Promise<User> {
    const storedUser = await this.userService.findUserByEmail(user.email);

    if (!storedUser) {
      throw new ForbiddenException('Access denied');
    }

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      storedUser.password,
    );

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Access denied');
    }

    return storedUser;
  }

  async logout(userId: string) {
    await this.sessionModel.findByIdAndDelete(userId);
    return true;
  }

  async refreshTokens(refreshToken) : Promise<Tokens> {
    const { id: userId, email } = this.jwtService.decode(
      refreshToken,
    ) as JwtPayload;

    const session = await this.sessionModel.findOne({ refreshToken });

    if (!session) {
      throw new ForbiddenException('Access denied');
    }

    const isMatch = session.refreshToken === refreshToken;

    if (!isMatch) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.getTokens(userId, email);

    return tokens;
  }

}
