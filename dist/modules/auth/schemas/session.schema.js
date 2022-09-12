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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionSchema = exports.Session = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../../user/schemas/user.schema");
let Session = class Session {
};
__decorate([
    (0, mongoose_2.Prop)({
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", user_schema_1.User)
], Session.prototype, "user", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        required: true
    }),
    __metadata("design:type", String)
], Session.prototype, "refreshToken", void 0);
Session = __decorate([
    (0, mongoose_2.Schema)({
        timestamps: true
    })
], Session);
exports.Session = Session;
exports.SessionSchema = mongoose_2.SchemaFactory.createForClass(Session);
//# sourceMappingURL=session.schema.js.map