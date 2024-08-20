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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const authDto_1 = require("./authDto");
const authEntity_1 = require("./authEntity");
const authService_1 = require("./authService");
const getUserDecorator_1 = require("./getUserDecorator/getUserDecorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerUser(authDto) {
        return await this.authService.registerUser(authDto);
    }
    async registerAdminUser(authDto) {
        return await this.authService.registerAdminUser(authDto);
    }
    async userSignIn(signInDto) {
        return await this.authService.userSignIn(signInDto);
    }
    async fetchUsers(user) {
        return await this.authService.fetchUsers(user);
    }
    async updateUser(user, updateUserDto, authId) {
        return await this.authService.updateUser(user, updateUserDto, authId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/registerUser'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authDto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('/registerAdminUser'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authDto_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAdminUser", null);
__decorate([
    (0, common_1.Post)('/signIn'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authDto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userSignIn", null);
__decorate([
    (0, common_1.Get)('/fetchUsers'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "fetchUsers", null);
__decorate([
    (0, common_1.Patch)('/updateUser/:authId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, getUserDecorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('authId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authEntity_1.AuthEntity, authDto_1.UpdateUserDto, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [authService_1.AuthService])
], AuthController);
//# sourceMappingURL=authController.js.map