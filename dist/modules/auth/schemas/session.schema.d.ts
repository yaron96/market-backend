import mongoose, { Document } from 'mongoose';
import { User } from 'modules/user/schemas/user.schema';
export declare type SessionDocument = Session & Document;
export declare class Session {
    user: User;
    refreshToken: string;
}
export declare const SessionSchema: mongoose.Schema<Session, mongoose.Model<Session, any, any, any, any>, {}, {}, any, {}, "type", Session>;
