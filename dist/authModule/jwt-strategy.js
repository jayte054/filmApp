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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("config"));
const typeorm_1 = require("@nestjs/typeorm");
const authRepository_1 = require("./authRepository");
const jwtConfig = config_1.default.get('jwt');
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
        });
        this.authRepository = authRepository;
    }
    async validate(payload) {
        const { authId, email, fullName, isAdmin } = payload;
        const userQueryBuilder = this.authRepository.createQueryBuilder('user');
        userQueryBuilder
            .select([
            'user.authId',
            'user.email',
            'user.fullName',
            'user.password',
            'user.salt',
            'user.isAdmin',
        ])
            .where('user.email = :email', {
            email,
            authId,
            fullName,
            isAdmin,
        });
        const [user] = await Promise.all([
            userQueryBuilder.getOne(),
        ]);
        if (!user) {
            throw new common_1.UnauthorizedException(`unauthourized`);
        }
        else {
            return user;
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(authRepository_1.AuthModuleRepository)),
    __metadata("design:paramtypes", [authRepository_1.AuthModuleRepository])
], JwtStrategy);
//# sourceMappingURL=jwt-strategy.js.map