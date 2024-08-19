"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = __importDefault(require("config"));
const typeorm_1 = require("@nestjs/typeorm");
const authController_1 = require("./authController");
const authEntity_1 = require("./authEntity");
const authRepository_1 = require("./authRepository");
const authService_1 = require("./authService");
const jwt_strategy_1 = require("./jwt-strategy");
const jwtConfig = config_1.default.get('jwt');
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || jwtConfig.secret,
                signOptions: {
                    expiresIn: jwtConfig.expiresIn,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([
                authEntity_1.AuthEntity,
                authRepository_1.AuthModuleRepository,
            ]),
        ],
        providers: [jwt_strategy_1.JwtStrategy, authRepository_1.AuthModuleRepository, authService_1.AuthService],
        controllers: [authController_1.AuthController],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], AuthModule);
//# sourceMappingURL=authModule.js.map