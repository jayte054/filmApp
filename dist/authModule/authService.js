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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const authRepository_1 = require("./authRepository");
let AuthService = class AuthService {
    constructor(authModuleRepository, jwtService) {
        this.authModuleRepository = authModuleRepository;
        this.jwtService = jwtService;
    }
    async registerUser(authDto) {
        return await this.authModuleRepository.registerUser(authDto);
    }
    async registerAdminUser(authDto) {
        return await this.authModuleRepository.registerAdminUser(authDto);
    }
    async userSignIn(signInDto) {
        const userDetails = await this.authModuleRepository.userSignIn(signInDto);
        const { authId, email, isAdmin, fullName } = userDetails;
        if (!userDetails) {
            throw new common_1.UnauthorizedException('invalid credentials');
        }
        const payload = {
            email,
            authId,
            fullName,
            isAdmin,
        };
        try {
            const accessToken = await this.jwtService.sign(payload);
            const response = {
                accessToken: accessToken,
                user: userDetails,
            };
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException("failed to sign in");
        }
    }
    async fetchUsers(user) {
        return await this.authModuleRepository.fetchUsers(user);
    }
    async updateUser(user, updateUserDto, authId) {
        return await this.authModuleRepository.updateUser(user, updateUserDto, authId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(authRepository_1.AuthModuleRepository)),
    __metadata("design:paramtypes", [authRepository_1.AuthModuleRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=authService.js.map