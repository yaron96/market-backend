"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./../user/user.service");
const session_schema_1 = require("./schemas/session.schema");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService, sessionModel) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.sessionModel = sessionModel;
    }
    async getTokens(userId, email) {
        const payload = { id: userId, email };
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
    async updateRtHash(userId, refreshToken) {
        const session = await this.sessionModel.findOne({
            user: { _id: userId },
        });
        if (session) {
            await this.sessionModel.findByIdAndUpdate(session.id, { refreshToken });
        }
        else {
            const user = await this.userService.findUserById(userId);
            this.sessionModel.create({
                user,
                refreshToken,
            });
        }
    }
    async login(credentials) {
        const user = await this.validateUser(credentials);
        const tokens = await this.getTokens(user._id, user.email);
        return tokens;
    }
    async validateUser(user) {
        const storedUser = await this.userService.findUserByEmail(user.email);
        if (!storedUser) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const isPasswordCorrect = await bcrypt.compare(user.password, storedUser.password);
        if (!isPasswordCorrect) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return storedUser;
    }
    async logout(userId) {
        await this.sessionModel.findByIdAndDelete(userId);
        return true;
    }
    async refreshTokens(refreshToken) {
        const { id: userId, email } = this.jwtService.decode(refreshToken);
        const session = await this.sessionModel.findOne({ refreshToken });
        if (!session) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const isMatch = session.refreshToken === refreshToken;
        if (!isMatch) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const tokens = await this.getTokens(userId, email);
        return tokens;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_2.InjectModel)(session_schema_1.Session.name)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mongoose_1.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map